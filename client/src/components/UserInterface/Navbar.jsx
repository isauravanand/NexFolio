import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, Rocket, FileText } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    // --- LOGIC STARTS HERE (No changes made) ---
    const isLoggedIn = () => {
        try {
            if (typeof document !== "undefined") {
                const cookies = document.cookie.split(";").map((c) => c.trim());
                for (const c of cookies) if (c.startsWith("token=")) return true;
            }
            if (typeof localStorage !== "undefined") {
                const t = localStorage.getItem("token");
                if (t) return true;
            }
        } catch (e) { }
        return false;
    };

    useEffect(() => {
        setAuthenticated(isLoggedIn());

        function onStorage(e) {
            if (e.key === "token") setAuthenticated(isLoggedIn());
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleLogout = () => {
        try {
            if (typeof document !== "undefined") {
                document.cookie = "token=; Max-Age=0; path=/;";
            }
            if (typeof localStorage !== "undefined") localStorage.removeItem("token");
            setAuthenticated(false);
            toast.success("Logged out successfully");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Logout failed");
        }
    };

    const handleGetStarted = () => {
        if (authenticated) {
            navigate("/create-resume");
        } else {
            toast.info("Please sign up to create your resume");
            navigate("/user/register");
        }
    };

    const handleMyResumes = () => {
        navigate("/my_resume");
        if (open) setOpen(false);
    };
    // --- LOGIC ENDS HERE ---

    return (
        <>
            <div className="fixed top-6 left-0 w-full z-50 flex flex-col items-center">
                {/* Main Navbar Pill 
                    - w-[95%] for mobile safety
                    - lg:w-[60%] achieves the ~20% margin on left and right (100% - 60% = 40% / 2 = 20%)
                */}
                <div className={`
                    relative 
                    w-[95%] md:w-[80%] lg:w-[60%] 
                    h-16 rounded-full
                    backdrop-blur-xl bg-black/60 border border-white/10
                    shadow-[0_0_30px_rgba(109,40,217,0.2)]
                    flex justify-between items-center px-6 md:px-8
                    transition-all duration-300
                `}>

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center group">
                        <span className="
                            font-extrabold text-xl md:text-2xl text-white tracking-wider
                            transition-colors duration-300
                            group-hover:text-purple-400
                        ">NexFolio
                        </span>
                    </Link>

                    {/* Desktop Menu Items */}
                    <div className="hidden md:flex items-center space-x-4">

                        {authenticated && (
                            <button
                                onClick={handleMyResumes}
                                className="
                                    flex items-center gap-2 text-gray-300 relative group
                                    hover:text-white transition-all duration-300 text-sm font-medium
                                    py-1.5 px-4 border border-transparent hover:border-purple-600/50 rounded-full
                                    bg-white/5 hover:bg-white/10 cursor-pointer
                                "
                            >
                                <FileText size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                                <span>My Resumes</span>
                            </button>
                        )}

                        {authenticated ? (
                            <button
                                onClick={handleLogout}
                                className="
                                    flex items-center gap-2 text-gray-300 relative group
                                    hover:text-white transition-all duration-300 text-sm font-medium
                                    py-1.5 px-4 border border-transparent hover:border-purple-600/50 rounded-full
                                    bg-white/5 hover:bg-white/10 cursor-pointer
                                "
                            >
                                <LogIn size={16} className="text-purple-400 group-hover:text-white transition-colors" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link
                                to="/user/login"
                                className="
                                    flex items-center gap-2 text-gray-300 relative group
                                    hover:text-white transition-all duration-300 text-sm font-medium
                                    py-1.5 px-4 border border-transparent hover:border-purple-600/50 rounded-full
                                    bg-white/5 hover:bg-white/10 cursor-pointer
                                "
                            >
                                <LogIn size={16} className="text-purple-400 group-hover:text-white transition-colors" />
                                <span>Sign In</span>
                            </Link>
                        )}

                        <button
                            onClick={handleGetStarted}
                            className="
                                relative overflow-hidden
                                flex items-center gap-2 
                                bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                                font-semibold
                                px-5 py-2 rounded-full transition-all duration-300 shadow-lg text-sm
                                hover:scale-[1.03]
                                shadow-purple-700/30 hover:shadow-indigo-500/50
                                border border-white/10
                            "
                        >
                            <Rocket size={16} className="rotate-45" />
                            <span className="relative z-10">Get Started</span>
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <div
                        className="md:hidden text-white cursor-pointer hover:text-purple-400 transition"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </div>

                {/* Mobile Dropdown 
                    Detached floating card that sits below the navbar
                */}
                <div
                    className={`
                        mt-2 
                        w-[95%] md:w-[80%]
                        rounded-2xl
                        backdrop-blur-xl bg-black/80 border border-white/10
                        transform transition-all duration-300 overflow-hidden shadow-2xl
                        ${open ? "max-h-[300px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}
                        md:hidden
                    `}
                >
                    <div className="flex flex-col py-4 px-6 space-y-3 text-white">
                        {authenticated && (
                            <button
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition text-base py-2 px-2 hover:bg-white/5 rounded-lg w-full text-left"
                                onClick={handleMyResumes}
                            >
                                <FileText size={18} className="text-blue-400" />
                                My Resumes
                            </button>
                        )}

                        {authenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpen(false);
                                }}
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition text-base py-2 px-2 hover:bg-white/5 rounded-lg w-full text-left"
                            >
                                <LogIn size={18} className="text-purple-400" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/user/login"
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition text-base py-2 px-2 hover:bg-white/5 rounded-lg"
                                onClick={() => setOpen(false)}
                            >
                                <LogIn size={18} className="text-purple-400" />
                                Sign In
                            </Link>
                        )}

                        <div className="h-[1px] bg-white/10 my-2"></div>

                        <button
                            onClick={() => {
                                handleGetStarted();
                                setOpen(false);
                            }}
                            className="
                                flex items-center justify-center gap-2 
                                bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                                font-semibold
                                px-4 py-2.5 rounded-xl transition hover:opacity-90 w-full
                            "
                        >
                            <Rocket size={18} className="rotate-45" />
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;