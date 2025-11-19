import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getResumeById } from "../api/resumeApi";

import { generateAiResume } from "../api/aiApi";
import Navbar from "../components/UserInterface/Navbar";

// Assume Navbar is imported here
// import Navbar from "../components/UserInterface/Navbar";

const ResumePreview = () => {
    const { resumeId } = useParams();
    const [resume, setResume] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");
    const [loading, setLoading] = useState(false);

    // --- Data Fetching Logic (Unchanged) ---
    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const res = await getResumeById(resumeId);
            setResume(res.data.resume);
        } catch (err) {
            toast.error("Unable to load resume.");
        }
    };

    // --- Generation Logic (Unchanged) ---
    const handleGenerate = async () => {
        try {
            setLoading(true);
            const res = await generateAiResume(selectedTemplate);

            // Convert response to Blob (PDF)
            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement("a");
            a.href = url;
            a.download = `AI_Resume_${selectedTemplate}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            toast.success("AI Resume Generated!");
        } catch (err) {
            console.error("AI Resume Error:", err);
            toast.error("Failed to generate AI resume");
        } finally {
            setLoading(false);
        }
    };

    if (!resume) return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <p className="text-lg text-slate-400">Loading resume data...</p>
        </div>
    );

    return (
        // Use the professional, dark background theme
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
            {/* <Navbar /> -- Render your Navbar component here */}
            <Navbar/>

            <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-20">

                {/* Header Section */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Review & Generate Resume
                </h1>
                <h2 className="text-xl font-medium text-slate-300 mb-10">
                    Finalize your details and select a template for PDF export.
                </h2>


                {/* Resume Data Preview Card */}
                <div
                    className="p-6 md:p-8 rounded-xl bg-slate-800 border border-slate-700 shadow-xl shadow-slate-900/50 mb-12 transition duration-300 hover:border-emerald-500/50"
                >
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400 border-b border-slate-700 pb-2">
                        Data Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                        <p className="border-l-2 border-emerald-500 pl-3"><strong>Name:</strong> {resume.fullname}</p>
                        <p className="border-l-2 border-blue-500 pl-3"><strong>Email:</strong> {resume.email}</p>
                        <p className="border-l-2 border-purple-500 pl-3"><strong>Phone:</strong> {resume.phone}</p>
                        <p className="col-span-full pt-2">
                            <strong>Skills:</strong> <span className="text-sm text-slate-400">{resume.technicalSkills.join(" | ")}</span>
                        </p>
                    </div>
                </div>

                {/* Template Selection Section */}
                <h2 className="text-2xl font-semibold mb-5 text-white">
                    Choose Design Template
                </h2>
                <div className="flex flex-wrap gap-5 mb-10">
                    {[ "creative", "executive"].map((tpl) => (
                        <div
                            key={tpl}
                            className={`
                                p-5 rounded-lg border-2 cursor-pointer w-full sm:w-32 text-center 
                                transition duration-200 
                                ${selectedTemplate === tpl
                                    ? "border-emerald-500 bg-emerald-500/10 shadow-lg"
                                    : "border-slate-700 bg-slate-800 hover:border-slate-500"
                                }
                            `}
                            onClick={() => setSelectedTemplate(tpl)}
                        >
                            <p className="font-bold text-lg capitalize tracking-wide text-white">{tpl}</p>
                            <p className="text-sm text-slate-400 mt-1">Style</p>
                        </div>
                    ))}
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className={`
                        w-full md:w-100 px-10 py-4 rounded-md font-bold text-lg tracking-wide
                        bg-emerald-500 text-white shadow-lg shadow-emerald-500/50
                        transition duration-200 hover:bg-emerald-600
                        disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed
                    `}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating PDF...
                        </span>
                    ) : (
                        "Generate AI Resume (Download)"
                    )}
                </button>
            </main>
            {/* <Footer /> -- Render your Footer component here */}
        </div>
    );
};

export default ResumePreview;