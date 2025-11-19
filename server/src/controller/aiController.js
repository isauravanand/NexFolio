const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const axios = require("axios");
const Resume = require("../models/resume");


Handlebars.registerHelper("join", (arr) => arr?.join(", ") || "");
Handlebars.registerHelper("ifEmpty", function (v, opts) {
    return v && v.length ? opts.fn(this) : opts.inverse(this);
});

Handlebars.registerHelper("formatDate", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return date;
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
});

// "Oct 2023 - Present"
Handlebars.registerHelper("formatRange", function (start, end) {
    const s = Handlebars.helpers.formatDate(start);
    const e = end ? Handlebars.helpers.formatDate(end) : "Present";
    return `${s} - ${e}`;
});

const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function generateWithGemini(prompt, retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
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
            if (attempt === retries) throw err;
            await new Promise((r) => setTimeout(r, 500 * attempt));
        }
    }
}


function safeExtractJSON(text) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Gemini did not return JSON");
    const clean = jsonMatch[0]
        .replace(/[\u0000-\u001F]+/g, "") // control chars
        .trim();
    return JSON.parse(clean);
}

module.exports.GenerateAiResume = async (req, res) => {
    let browser;

    try {
        const userId = req.user.id;
        const { template } = req.body;

        const resumeData = await Resume.findOne({ user: userId }).lean();
        if (!resumeData)
            return res.status(404).json({ message: "Resume not found" });

        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.user;

     
        const aiPrompt = `
You are a professional ATS resume rewriting AI. Rewrite and enhance the entire resume using the user-provided JSON.

### RULES:
- Fill the entire A4 page with strong, professional content.
- Keep the SAME JSON structure and keys.
- Improve and expand ALL sections — not only summary.
- Rewrite bullet points with action verbs and measurable achievements.
- Expand empty or weak sections with realistic, meaningful descriptions based on context.
- Do NOT invent fake companies, fake internships, fake projects or fake degrees.
- You may expand skills, responsibilities, tech stack, achievements, and project descriptions.
- Keep formatting clean (no markdown).
- Do NOT add extra keys or remove existing ones.
- Return ONLY valid JSON.

### Input JSON:
${JSON.stringify(resumeData, null, 2)}
`;

        let improvedData = resumeData;

        try {
            const aiResponse = await generateWithGemini(aiPrompt);
            improvedData = safeExtractJSON(aiResponse); // <---- REAL FIX
            console.log("✅ Gemini AI rewrite successful");
        } catch (err) {
            console.warn("⚠ AI rewrite failed → using original data", err.message);
        }

        
        const templatePath = path.join(
            __dirname,
            "../templates",
            `${template}.html`
        );

        if (!fs.existsSync(templatePath))
            return res.status(400).json({ message: "Template not found" });

        const htmlTemplate = fs.readFileSync(templatePath, "utf8");
        const compiledHTML = Handlebars.compile(htmlTemplate)(improvedData);

        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        await page.setContent(compiledHTML, {
            waitUntil: "networkidle0",
            timeout: 60000,
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=AI_Resume_${template}.pdf`,
        });

        return res.send(pdfBuffer);

    } catch (error) {
        console.error("🔥 Resume Generation Error:", error);
        return res.status(500).json({ message: "Error generating resume" });
    } finally {
        if (browser) await browser.close();
    }
};
