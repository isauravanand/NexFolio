import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getResumeByUser } from "../api/resumeApi";
import { generateAiResume } from "../api/aiApi";

const ResumePreview = () => {
    const { resumeId } = useParams();
    const [resume, setResume] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("modern");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const res = await getResumeByUser(resumeId);
            setResume(res.data.resume);
        } catch (err) {
            toast.error("Unable to load resume.");
        }
    };

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const res = await generateAiResume(selectedTemplate);

            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `AI_Resume_${selectedTemplate}.pdf`;
            a.click();

            toast.success("AI Resume Generated!");
        } catch (err) {
            toast.error("Failed to generate AI resume");
        } finally {
            setLoading(false);
        }
    };

    if (!resume) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Preview Your Resume</h1>

            {/* Resume Data Preview */}
            <div className="p-4 border rounded-lg bg-gray-50 mb-6">
                <p><strong>Name:</strong> {resume.fullname}</p>
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Phone:</strong> {resume.phone}</p>
                <p><strong>Skills:</strong> {resume.technicalSkills.join(", ")}</p>
                {/* Add more fields as needed */}
            </div>

            {/* Template Selection */}
            <h2 className="text-xl font-semibold mb-3">Choose a Template</h2>
            <div className="flex gap-4 mb-6">
                {["modern", "creative", "executive"].map((tpl) => (
                    <div
                        key={tpl}
                        className={`p-4 border rounded-lg cursor-pointer 
            ${selectedTemplate === tpl ? "border-blue-600" : ""}`}
                        onClick={() => setSelectedTemplate(tpl)}
                    >
                        <p className="font-medium capitalize">{tpl} Template</p>
                    </div>
                ))}
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                {loading ? "Generating..." : "Generate AI Resume"}
            </button>
        </div>
    );
};

export default ResumePreview;
