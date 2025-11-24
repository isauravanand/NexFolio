const axios = require("axios");

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
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 20000
                }
            );

            const text =
                response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error("Empty response from Gemini");
            return text;

        } catch (err) {
            if (attempt === retries) {
                console.error(`Gemini failed after ${retries} attempts.`);
                throw err;
            }
            await new Promise((r) => setTimeout(r, 500 * attempt));
        }
    }
}

/**
 * Safely extracts and parses JSON block from a string response.
 */
function safeExtractJSON(text) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Gemini did not return parsable JSON");

    const clean = jsonMatch[0]
        .replace(/[\u0000-\u001F]+/g, "")
        .trim();

    return JSON.parse(clean);
}

module.exports = { generateWithGemini, safeExtractJSON };