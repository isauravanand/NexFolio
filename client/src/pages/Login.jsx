import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email.trim()) {
            toast.error("Email is required.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Password is required.");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);
            const res = await loginUser({
                email: formData.email.toLowerCase(),
                password: formData.password,
            });

            if (res.data.success) {
                toast.success("Login successful!");
                navigate("/");
            }
        } catch (error) {
            const msg =
                error.response?.data?.message || "Login failed. Try again.";
            toast.error(msg);
            console.log("Login Error:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black"></div>

            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse delay-1500"></div>

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 animate__animated animate__fadeIn">
                <h2 className="text-3xl font-bold text-white text-center mb-2">
                    Welcome Back
                </h2>
                <p className="text-gray-300 text-center mb-8 text-sm">
                    Sign in to your account to continue building your professional resume.
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-gray-200 text-sm mb-1 block">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Mail className="absolute right-3 top-3 text-gray-300" size={20} />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-200 text-sm mb-1 block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Lock className="absolute right-3 top-3 text-gray-300" size={20} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 mt-6"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <Link to="/user/register" className="text-purple-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
