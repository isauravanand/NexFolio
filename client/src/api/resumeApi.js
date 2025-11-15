import api from "./axios";

export const createResume = (formData) => {
    return api.post("/resume/create", formData);
};

export const getMyResumes = () => {
    return api.get("/resume/my_resume");
};

export const getResumeByUser = (userId) => {
    return api.get(`/resume/${userId}`);
};

export const updateResume = (id, formData) => {
    return api.put(`/resume/${id}`, formData);
};

export const deleteResume = (id) => {
    return api.delete(`/resume/${id}`);
};
