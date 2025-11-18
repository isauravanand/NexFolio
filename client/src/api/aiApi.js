// import axios from "axios";

// export const generateAiResume = async (template) => {
//     return axios.post(
//         "/ai/generate-resume",
//         { template },
//         {
//             withCredentials: true,
//             responseType: "blob",  // IMPORTANT
//         }
//     );
// };

import api from "./axios";

export const generateAiResume = (template) =>
    api.post(
        "/ai/generate-resume",
        { template },
        { responseType: "arraybuffer" } // PDF binary response
    );
