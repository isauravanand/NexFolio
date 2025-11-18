const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Resume = require("../models/resume");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// register handlebars helpers for loops etc.
Handlebars.registerHelper("join", arr => arr?.join(", ") || "");
Handlebars.registerHelper("ifEmpty", (v, opts) => v && v.length ? opts.fn(this) : opts.inverse(this));


exports.GenerateAiResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const { template } = req.body; // modern | creative | executive

        const resumeData = await Resume.findOne({ user: userId }).lean();

        if (!resumeData) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // clean fields
        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.user;

        // --------------------------
        // 1) AI REWRITE
        // --------------------------
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const aiPrompt = `
Rewrite this resume professionally.
Improve clarity, impact, and ATS optimization.
Return JSON ONLY (no explanations, no markdown):

${JSON.stringify(resumeData, null, 2)}
`;

        let aiResponse = await model.generateContent(aiPrompt);
        let aiText = aiResponse.response.text();

        // remove markdown ```json wrapper
        aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

        let improvedData;

        try {
            improvedData = JSON.parse(aiText);
        } catch (e) {
            console.error("AI JSON PARSE ERROR:", aiText);
            return res.status(500).json({ message: "AI returned invalid JSON" });
        }

        // --------------------------
        // 2) LOAD HTML TEMPLATE
        // --------------------------
        const templatePath = path.join(__dirname, "../templates", `${template}.html`);

        if (!fs.existsSync(templatePath)) {
            return res.status(400).json({ message: "Template not found" });
        }

        const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
        const compiledHTML = Handlebars.compile(htmlTemplate)(improvedData);

        // --------------------------
        // 3) GENERATE PDF (PRODUCTION SAFE)
        // --------------------------
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--no-zygote",
                "--single-process"
            ]
        });

        const page = await browser.newPage();
        await page.setContent(compiledHTML, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true
        });

        await browser.close();

        // --------------------------
        // 4) SEND PDF TO FRONTEND
        // --------------------------
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf"
        });

        return res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF ERROR:", error);
        return res.status(500).json({ message: "Error generating resume", error: error.message });
    }
};
