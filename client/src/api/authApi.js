import api from "./axios";

export const registerUser=(formData)=>{
    return api.post("/auth/user/register",formData)
};

export const loginUser=(formData)=>{
    return api.post("/auth/user/login",formData);
};

export const verifyOtp = (formData)=>{
    return api.post("/auth/user/verify",formData);
};

export const logoutUser = ()=>{
    return api.get("/auth/user/logout");
};

export const getCurrentUser = () => {
    return api.get("/auth/user/me");
};