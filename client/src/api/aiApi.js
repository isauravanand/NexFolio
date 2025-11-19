import axios from "./axios";

export const generateAiResume = (template) => {
    return axios.post(
        `/ai/generate-resume`,
        { template },       // only send template
        { responseType: "blob" } // <-- important for PDF
    );
};
