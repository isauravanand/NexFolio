import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createResume } from "../api/resumeApi";
import Navbar from "../components/UserInterface/Navbar";
import Background from "../components/UserInterface/Background";
import Footer from "../components/UserInterface/Footer";
import { Plus, X } from "lucide-react";

const CreateResume = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    profileSummary: "",
    education: [{ degree: "", institution: "", startYear: "", endYear: "", percentage: "" }],
    technicalSkills: [""],
    workExperience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    projects: [{ title: "", description: "", technologies: [], link: "", githubLink: "" }],
    certifications: [{ title: "", organization: "", issueDate: "", credentialUrl: "" }],
    languages: ["English"],
    interests: [""],
    selectedTemplate: null,
  });

  // Validation rules based on backend Zod schemas
  const validationRules = {
    fullname: {
      validate: (val) => val.trim().length >= 3,
      error: "Full name must be at least 3 characters",
    },
    email: {
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      error: "Enter a valid email",
    },
    phone: {
      validate: (val) => /^[0-9]{10}$/.test(val),
      error: "Phone number must be exactly 10 digits",
    },
    linkedin: {
      validate: (val) => !val || /^https?:\/\/.+/.test(val),
      error: "Enter valid LinkedIn URL",
    },
    github: {
      validate: (val) => !val || /^https?:\/\/.+/.test(val),
      error: "Enter valid GitHub URL",
    },
    portfolio: {
      validate: (val) => !val || /^https?:\/\/.+/.test(val),
      error: "Enter valid portfolio URL",
    },
    profileSummary: {
      validate: (val) => val.trim().length >= 20 && val.trim().length <= 800,
      error: "Profile summary must be 20-800 characters",
    },
    degree: {
      validate: (val) => val.trim().length >= 2,
      error: "Degree must be at least 2 characters",
    },
    institution: {
      validate: (val) => val.trim().length >= 3,
      error: "Institution must be at least 3 characters",
    },
    startYear: {
      validate: (val) => {
        const year = parseInt(val);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      error: "Enter a valid start year (1900-current)",
    },
    skill: {
      validate: (val) => val.trim().length >= 2,
      error: "Skill must be at least 2 characters",
    },
    company: {
      validate: (val) => val.trim().length >= 2,
      error: "Company name must be at least 2 characters",
    },
    position: {
      validate: (val) => val.trim().length >= 2,
      error: "Position must be at least 2 characters",
    },
    startDate: {
      validate: (val) => val && !isNaN(Date.parse(val)),
      error: "Enter a valid start date",
    },
    endDate: {
      validate: (val) => !val || !isNaN(Date.parse(val)),
      error: "Enter a valid end date",
    },
    projectTitle: {
      validate: (val) => val.trim().length >= 2,
      error: "Project title must be at least 2 characters",
    },
    projectDescription: {
      validate: (val) => val.trim().length >= 10,
      error: "Project description must be at least 10 characters",
    },
    certTitle: {
      validate: (val) => val.trim().length >= 3,
      error: "Certificate title must be at least 3 characters",
    },
    language: {
      validate: (val) => val.trim().length >= 2,
      error: "Language name must be at least 2 characters",
    },
    interest: {
      validate: (val) => val.trim().length >= 2,
      error: "Interest must be at least 2 characters",
    },
  };

  // Input handlers
  const handleBasicInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (arrayName, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[arrayName]];
      if (typeof updated[index] === "string") {
        updated[index] = value;
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, [arrayName]: updated };
    });
  };

  const addArrayItem = (arrayName) => {
    setFormData((prev) => {
      const newItem =
        arrayName === "education"
          ? { degree: "", institution: "", startYear: "", endYear: "", percentage: "" }
          : arrayName === "workExperience"
          ? { company: "", position: "", startDate: "", endDate: "", description: "" }
          : arrayName === "projects"
          ? { title: "", description: "", technologies: [], link: "", githubLink: "" }
          : arrayName === "certifications"
          ? { title: "", organization: "", issueDate: "", credentialUrl: "" }
          : "";

      return {
        ...prev,
        [arrayName]: [...prev[arrayName], newItem],
      };
    });
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  // Validation functions
  const validateStep = (step) => {
    switch (step) {
      case 1: {
        if (!validationRules.fullname.validate(formData.fullname)) {
          toast.error(validationRules.fullname.error);
          return false;
        }
        if (!validationRules.email.validate(formData.email)) {
          toast.error(validationRules.email.error);
          return false;
        }
        if (!validationRules.phone.validate(formData.phone)) {
          toast.error(validationRules.phone.error);
          return false;
        }
        if (formData.linkedin && !validationRules.linkedin.validate(formData.linkedin)) {
          toast.error(validationRules.linkedin.error);
          return false;
        }
        if (formData.github && !validationRules.github.validate(formData.github)) {
          toast.error(validationRules.github.error);
          return false;
        }
        if (formData.portfolio && !validationRules.portfolio.validate(formData.portfolio)) {
          toast.error(validationRules.portfolio.error);
          return false;
        }
        return true;
      }

      case 2: {
        if (!validationRules.profileSummary.validate(formData.profileSummary)) {
          toast.error(validationRules.profileSummary.error);
          return false;
        }
        if (formData.education.length === 0) {
          toast.error("Add at least one education entry");
          return false;
        }
        for (let edu of formData.education) {
          if (!validationRules.degree.validate(edu.degree)) {
            toast.error(validationRules.degree.error);
            return false;
          }
          if (!validationRules.institution.validate(edu.institution)) {
            toast.error(validationRules.institution.error);
            return false;
          }
          if (!validationRules.startYear.validate(edu.startYear)) {
            toast.error(validationRules.startYear.error);
            return false;
          }
        }
        return true;
      }

      case 3: {
        const validSkills = formData.technicalSkills.filter((s) => s.trim().length > 0);
        if (validSkills.length === 0) {
          toast.error("Add at least one technical skill");
          return false;
        }
        for (let skill of validSkills) {
          if (!validationRules.skill.validate(skill)) {
            toast.error(validationRules.skill.error);
            return false;
          }
        }

        for (let work of formData.workExperience) {
          const hasAnyField = work.company?.trim() || work.position?.trim() || work.startDate;
          if (hasAnyField) {
            if (!validationRules.company.validate(work.company)) {
              toast.error("All work experience entries must have a company name");
              return false;
            }
            if (!validationRules.position.validate(work.position)) {
              toast.error("All work experience entries must have a position");
              return false;
            }
            if (!validationRules.startDate.validate(work.startDate)) {
              toast.error("All work experience entries must have a start date");
              return false;
            }
          }
        }

        for (let proj of formData.projects) {
          const hasAnyField = proj.title?.trim() || proj.description?.trim();
          if (hasAnyField) {
            if (!validationRules.projectTitle.validate(proj.title)) {
              toast.error("All project entries must have a title");
              return false;
            }
            if (!validationRules.projectDescription.validate(proj.description)) {
              toast.error(validationRules.projectDescription.error);
              return false;
            }
          }
        }
        return true;
      }

      case 4: {
        for (let lang of formData.languages) {
          if (lang && !validationRules.language.validate(lang)) {
            toast.error(validationRules.language.error);
            return false;
          }
        }
        for (let interest of formData.interests) {
          if (interest && !validationRules.interest.validate(interest)) {
            toast.error(validationRules.interest.error);
            return false;
          }
        }
        return true;
      }

      case 5: {
        if (!formData.selectedTemplate) {
          toast.error("Please select a template");
          return false;
        }
        return true;
      }

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleSubmit = async () => {
  //   for (let i = 1; i <= 5; i++) {
  //     if (!validateStep(i)) {
  //       setCurrentStep(i);
  //       return;
  //     }
  //   }

  //   try {
  //     
  //     navigate(`/generate-ai-resume/${resumeId}/${formData.selectedTemplate}`);
  //   } catch (error) {
  //     console.error("Error creating resume:", error);
  //     toast.error(error.response?.data?.message || "Error creating resume");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
          toast.info("Saving your resume...");
      const response = await createResume(formData);
      const resumeId = response.data.resume._id;

      toast.success("Resume saved!");

      navigate(`/resume-preview/${resumeId}`);
    } catch (error) {
      toast.error("Validation error!");
    }
  };


  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: "Contact" },
      { num: 2, label: "Professional" },
      { num: 3, label: "Experience" },
      { num: 4, label: "Languages" },
      { num: 5, label: "Template" },
    ];
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step.num <= currentStep
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {step.num}
              </div>
              <span
                className={`ml-2 text-sm transition-all ${
                  step.num <= currentStep ? "text-white" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-all ${
                    step.num < currentStep
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                      : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 1: Contact
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullname}
            onChange={(e) => handleBasicInputChange("fullname", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleBasicInputChange("email", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleBasicInputChange("phone", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="1234567890"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleBasicInputChange("linkedin", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleBasicInputChange("github", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL</label>
          <input
            type="url"
            value={formData.portfolio}
            onChange={(e) => handleBasicInputChange("portfolio", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition"
            placeholder="https://portfolio.com"
          />
        </div>
      </div>
    </div>
  );

  // Step 2: Professional
  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Professional Information</h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Summary *</label>
          <textarea
            value={formData.profileSummary}
            onChange={(e) => handleBasicInputChange("profileSummary", e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition h-32"
            placeholder="Write a brief professional summary (20-800 characters)"
          />
          <p className="text-xs text-gray-400 mt-1">{formData.profileSummary.length}/800 characters</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Education *</h3>
          <button
            onClick={() => addArrayItem("education")}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {formData.education.map((edu, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Education #{idx + 1}</h4>
                {formData.education.length > 1 && (
                  <button
                    onClick={() => removeArrayItem("education", idx)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayInputChange("education", idx, "degree", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="B.Tech"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Institution *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleArrayInputChange("education", idx, "institution", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Start Year *</label>
                  <input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => handleArrayInputChange("education", idx, "startYear", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">End Year</label>
                  <input
                    type="number"
                    value={edu.endYear}
                    onChange={(e) => handleArrayInputChange("education", idx, "endYear", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="2024"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">Percentage/Grade</label>
                  <input
                    type="text"
                    value={edu.percentage}
                    onChange={(e) => handleArrayInputChange("education", idx, "percentage", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="8.5 / 85%"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 3: Experience
  const renderStep3 = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-8">Skills & Experience</h2>

      {/* Technical Skills */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Technical Skills *</h3>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, technicalSkills: [...prev.technicalSkills, ""] }))}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {formData.technicalSkills.map((skill, idx) => (
            <div key={idx} className="relative">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayInputChange("technicalSkills", idx, "", e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="e.g., React"
              />
              {formData.technicalSkills.length > 1 && (
                <button
                  onClick={() => removeArrayItem("technicalSkills", idx)}
                  className="absolute right-3 top-2 text-red-500 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Work Experience</h3>
          <button
            onClick={() => addArrayItem("workExperience")}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {formData.workExperience.map((work, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Work Experience #{idx + 1}</h4>
                {formData.workExperience.length > 1 && (
                  <button
                    onClick={() => removeArrayItem("workExperience", idx)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Company *</label>
                  <input
                    type="text"
                    value={work.company}
                    onChange={(e) => handleArrayInputChange("workExperience", idx, "company", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Position *</label>
                  <input
                    type="text"
                    value={work.position}
                    onChange={(e) => handleArrayInputChange("workExperience", idx, "position", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={work.startDate}
                    onChange={(e) => handleArrayInputChange("workExperience", idx, "startDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={work.endDate}
                    onChange={(e) => handleArrayInputChange("workExperience", idx, "endDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">Description</label>
                  <textarea
                    value={work.description}
                    onChange={(e) => handleArrayInputChange("workExperience", idx, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition h-20"
                    placeholder="Describe your responsibilities..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Projects</h3>
          <button
            onClick={() => addArrayItem("projects")}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {formData.projects.map((proj, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Project #{idx + 1}</h4>
                {formData.projects.length > 1 && (
                  <button
                    onClick={() => removeArrayItem("projects", idx)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleArrayInputChange("projects", idx, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Link</label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => handleArrayInputChange("projects", idx, "link", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">Description *</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleArrayInputChange("projects", idx, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition h-20"
                    placeholder="Describe the project (at least 10 characters)..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Certifications</h3>
          <button
            onClick={() => addArrayItem("certifications")}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-6">
          {formData.certifications.map((cert, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Certification #{idx + 1}</h4>
                {formData.certifications.length > 1 && (
                  <button
                    onClick={() => removeArrayItem("certifications", idx)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => handleArrayInputChange("certifications", idx, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="Certification Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Organization</label>
                  <input
                    type="text"
                    value={cert.organization}
                    onChange={(e) => handleArrayInputChange("certifications", idx, "organization", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="Issuing Organization"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={cert.issueDate}
                    onChange={(e) => handleArrayInputChange("certifications", idx, "issueDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Credential URL</label>
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) => handleArrayInputChange("certifications", idx, "credentialUrl", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Languages & Interests
  const renderStep4 = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-8">Languages & Interests</h2>

      {/* Languages */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Languages</h3>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, languages: [...prev.languages, ""] }))}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add Language
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {formData.languages.map((lang, idx) => (
            <div key={idx} className="relative">
              <input
                type="text"
                value={lang}
                onChange={(e) => handleArrayInputChange("languages", idx, "", e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="e.g., English"
              />
              {formData.languages.length > 1 && (
                <button
                  onClick={() => removeArrayItem("languages", idx)}
                  className="absolute right-3 top-2 text-red-500 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Interests</h3>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, interests: [...prev.interests, ""] }))}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
          >
            <Plus size={16} /> Add Interest
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {formData.interests.map((interest, idx) => (
            <div key={idx} className="relative">
              <input
                type="text"
                value={interest}
                onChange={(e) => handleArrayInputChange("interests", idx, "", e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="e.g., Reading"
              />
              {formData.interests.length > 1 && (
                <button
                  onClick={() => removeArrayItem("interests", idx)}
                  className="absolute right-3 top-2 text-red-500 hover:text-red-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 5: Template Selection
  const renderStep5 = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Choose Template</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: "modern", name: "Modern", color: "from-blue-600 to-purple-600" },
          { id: "creative", name: "Creative", color: "from-pink-600 to-red-600" },
          { id: "executive", name: "Executive", color: "from-slate-600 to-gray-700" },
        ].map((template) => (
          <div
            key={template.id}
            onClick={() => setFormData((prev) => ({ ...prev, selectedTemplate: template.id }))}
            className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
              formData.selectedTemplate === template.id
                ? "border-purple-500 bg-white/10"
                : "border-white/20 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className={`h-32 bg-gradient-to-r ${template.color} rounded-lg mb-4`} />
            <h3 className="text-lg font-bold text-white">{template.name} Template</h3>
            <p className="text-sm text-gray-400">
              {template.id === "modern" && "Clean and minimal design"}
              {template.id === "creative" && "Creative and modern style"}
              {template.id === "executive" && "Professional executive look"}
            </p>
            {formData.selectedTemplate === template.id && (
              <div className="mt-4 text-purple-400 text-sm font-semibold">✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Background>
        <Navbar />
        <div className="pt-20 pb-12 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            {renderStepIndicator()}

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  currentStep === 1
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-400">
                Step {currentStep} of 5
              </span>

              {currentStep === 5 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-8 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create Resume"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </Background>
      <Footer />
    </>
  );
};

export default CreateResume;
