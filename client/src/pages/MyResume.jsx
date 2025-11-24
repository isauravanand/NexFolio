import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FileText, Rocket, RefreshCw, Loader2, Calendar, Edit } from "lucide-react";
import { getMyResumes } from "../api/resumeApi"; // Assuming this is now correctly pointing to /resume/my_resume or /resume
import Navbar from "../components/UserInterface/Navbar";


const MyResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // --- Data Fetching ---
    const fetchResumes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMyResumes();
            if (res.data.success) {
                // Should correctly handle an empty array [] if backend sends 200 OK
                setResumes(res.data.resumes || []);
            } else {
                setError("Failed to load resumes. Server response not successful.");
                toast.error("Failed to fetch resumes list.");
            }
        } catch (err) {
            console.error("Fetch Resumes Error:", err);
            // This is the error handler that triggers on 404, 401, or Network error.
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Authentication failed. Please log in.");
                toast.error("Session expired or unauthorized access.");
            } else if (err.response && err.response.status === 404) {
                setError("API endpoint not found. Please verify the resume retrieval route.");
                toast.error("Routing error (404) encountered.");
            }
            else {
                setError("Network or server connection failed.");
                toast.error("Connection failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);


    const handleGenerateAi = (resumeId) => {
        navigate(`/resume-preview/${resumeId}`);
    };

    const handleCreateNew = () => {
        navigate("/create-resume");
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center pt-24">
                <div className="flex items-center text-lg text-slate-400">
                    <Loader2 className="animate-spin mr-3 text-emerald-400" size={24} />
                    Loading your saved resumes...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center pt-24">
                <div className="p-8 rounded-xl bg-red-900/20 border border-red-700/50 text-red-300">
                    <p className="font-semibold text-lg mb-2">Error Loading Data</p>
                    <p>{error}</p>
                    <button
                        onClick={fetchResumes}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-700/50 hover:bg-red-700 rounded-md transition"
                    >
                        <RefreshCw size={16} /> Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                        My Resumes
                    </h1>
                    <button
                        onClick={handleCreateNew}
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md font-semibold shadow-lg shadow-purple-600/50 hover:brightness-95 transition"
                    >
                        <Edit size={20} className="mr-2" /> Create New Resume
                    </button>
                </div>

                <p className="text-xl font-medium text-slate-400 mb-10">
                    You have {resumes.length} saved resume{resumes.length !== 1 ? 's' : ''}.
                </p>

                {resumes.length === 0 ? (
                    <div className="p-10 text-center rounded-xl bg-slate-800 border border-slate-700 shadow-xl shadow-slate-900/50">
                        <FileText size={48} className="text-purple-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-white mb-2">No Resumes Found</p>
                        <p className="text-slate-400 mb-6">It looks like you haven't created any resumes yet.</p>
                        <button
                            onClick={handleCreateNew}
                            className="inline-flex cursor-pointer items-center px-6 py-3 bg-emerald-500 text-white rounded-md font-semibold shadow hover:brightness-95 transition"
                        >
                            <Rocket size={20} className="mr-2 rotate-45" /> Start Creating Resume
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resumes.map((resume) => (
                            <div
                                key={resume._id}
                                className="p-6 rounded-xl bg-slate-800 border border-slate-700 shadow-xl shadow-slate-900/50 transition duration-300 hover:border-emerald-500/50"
                            >
                                <h3 className="text-xl font-bold text-white truncate mb-1">
                                    {resume.fullname || "Unnamed Resume"}
                                </h3>
                                <p className="text-sm text-purple-400 mb-3 truncate">
                                    {resume.profileSummary || "No summary provided"}
                                </p>

                                <div className="flex items-center text-xs text-slate-500 mb-4">
                                    <Calendar size={14} className="mr-1" />
                                    Last Updated: {formatDate(resume.updatedAt)}
                                </div>

                                <div className="space-y-3">
                                    {/* Generate AI Resume Button (Now the only option) */}
                                    <button
                                        onClick={() => handleGenerateAi(resume._id)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/40 transition"
                                    >
                                        <Rocket size={18} className="rotate-45" /> Generate AI Resume
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyResumes;