const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const axios = require("axios");
const Resume = require("../models/resume");

// -------------------------------
// Handlebars helpers
// -------------------------------
Handlebars.registerHelper("join", (arr) => arr?.join(", ") || "");
Handlebars.registerHelper("ifEmpty", function (v, opts) {
    return v && v.length ? opts.fn(this) : opts.inverse(this);
});

// -------------------------------
// Gemini 2.0 Flash API URL
// -------------------------------
const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// -------------------------------
// Helper: Gemini API with retries
// -------------------------------
async function generateWithGemini(prompt, retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const payload = {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            };

            const response = await axios.post(
                `${GEMINI_URL}?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            const text =
                response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error("Empty response from Gemini");

            return text;
        } catch (err) {
            const status = err?.response?.status || err.code || "Unknown";
            console.log(`⚠ Gemini Retry ${attempt} failed:`, status);

            if (attempt === retries) {
                console.error("💥 Full Gemini error:", err.response?.data || err);
                throw new Error("Gemini API failed after retries");
            }

            if ([429, 500, 502, 503].includes(err?.response?.status)) {
                const wait = 500 * Math.pow(2, attempt - 1);
                console.log(`⏳ Waiting ${wait}ms before retry...`);
                await new Promise((r) => setTimeout(r, wait));
                continue;
            }

            throw err;
        }
    }
}

// -------------------------------
// Main Controller: Generate AI Resume
// -------------------------------
module.exports.GenerateAiResume = async (req, res) => {
    let browser;
    try {
        const userId = req.user.id;
        const { template } = req.body;

        console.log("➡ Generating AI Resume for user:", userId);
        console.log("➡ Using template:", template);

        // Fetch resume data
        const resumeData = await Resume.findOne({ user: userId }).lean();
        if (!resumeData) return res.status(404).json({ message: "Resume not found" });

        // Clean DB metadata
        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.user;

        // --------------------------
        // 1) AI Rewrite
        // --------------------------
        const aiPrompt = `
Rewrite this resume professionally.
Optimize for clarity, ATS score, grammar, and impact.
Return **VALID JSON ONLY**.
No markdown, no explanation, no comments.

JSON Input:
${JSON.stringify(resumeData, null, 2)}
`;

        let improvedData = resumeData;
        try {
            const aiResponse = await generateWithGemini(aiPrompt);

            // Clean and parse JSON safely
            const cleanJson = aiResponse.trim().replace(/^\uFEFF/, "");
            improvedData = JSON.parse(cleanJson);

            console.log("✅ Gemini AI rewrite successful");
        } catch (e) {
            console.warn("⚠ Gemini failed, using original resume data.", e.message);
            improvedData = resumeData; // fallback
        }

        // --------------------------
        // 2) Load HTML Template
        // --------------------------
        const templatePath = path.join(__dirname, "../templates", `${template}.html`);
        if (!fs.existsSync(templatePath))
            return res.status(400).json({ message: "Template not found" });

        const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
        const compiledHTML = Handlebars.compile(htmlTemplate)(improvedData);

        // --------------------------
        // 3) Generate PDF via Puppeteer
        // --------------------------
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Timeout safe content set
        await page.setContent(compiledHTML, { waitUntil: "networkidle0", timeout: 60000 });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            timeout: 60000,
        });

        console.log("✅ PDF generation successful");

        // --------------------------
        // 4) Send PDF to frontend
        // --------------------------
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=AI_Resume_${template}.pdf`,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error("🔥 Resume Generation Error:", error);
        return res.status(500).json({
            message: "Error generating resume",
            error: error.message,
        });
    } finally {
        if (browser) await browser.close();
    }
};
