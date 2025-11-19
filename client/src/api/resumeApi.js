import api from "./axios";

export const createResume = (formData) => {
    return api.post("/resume/create", formData,{
        withCredentials:true,
    });
};

export const getMyResumes = () => {
    return api.get("/resume/my_resume", {
        withCredentials: true,
    });
};

export const getResumeById = (resumeId) => {
    return api.get(`/resume/${resumeId}`,{
        withCredentials:true
    }
    );
};                                                                                                                              


export const updateResume = (id, formData) => {
    return api.put(`/resume/${id}`, formData, {
        withCredentials: true,
    });
};

export const deleteResume = (id) => {
    return api.delete(`/resume/${id}`, {
        withCredentials: true,
    });
};
