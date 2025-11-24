const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { generateWithGemini, safeExtractJSON } = require("../utils/geminiHelpers");
const { registerHandlebarsHelpers, Handlebars } = require("../utils/templateHelpers");

registerHandlebarsHelpers();


module.exports.GenerateAiResume = async (req, res) => {
    let browser;

    try {
        const { template, resumeData } = req.body;

        if (!resumeData)
            return res.status(400).json({ message: "No resume data received" });

        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        delete resumeData.user;

        const aiPrompt = `
You are a professional ATS resume rewriting AI. Rewrite and enhance the entire resume using the user-provided JSON.

### RULES:
- Fill the entire A4 page with strong, professional, concise content.
- Keep the SAME JSON structure and keys.
- Improve ALL sections (summary, experience, projects, education, skills).
- Expand weak descriptions with context-based, realistic achievements.
- Do NOT invent fake companies, fake internships, fake degrees.
- Do NOT add extra JSON keys.
- Keep formatting clean (no markdown).
- Return ONLY valid JSON.

### Input JSON:
${JSON.stringify(resumeData, null, 2)}
`;

        let improvedData = resumeData;

        try {
            const aiResponse = await generateWithGemini(aiPrompt);
            improvedData = safeExtractJSON(aiResponse);
            console.log("Gemini AI rewrite successful");
        } catch (err) {
            console.warn("AI rewrite failed , using original data", err.message);
        }

        const templatePath = path.join(
            __dirname,
            "..", 
            "templates", 
            `${template}.html`
        );

        if (!fs.existsSync(templatePath))
            return res.status(400).json({ message: `Template file not found at: ${templatePath}` });

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
            margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' }
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=AI_Resume_${template}.pdf`,
        });

        return res.send(pdfBuffer);

    } catch (error) {
        console.error(" Resume Generation Error:", error);
        return res.status(500).json({ message: "Error generating resume" });
    } finally {
        if (browser) await browser.close();
    }
};