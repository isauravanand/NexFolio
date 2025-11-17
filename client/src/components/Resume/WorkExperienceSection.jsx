import React from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const WorkExperienceSection = ({ formData, handleArrayInputChange, addArrayItem, removeArrayItem, expandedSections, toggleSection }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <button
        onClick={() => toggleSection("workExperience")}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="text-xl font-semibold text-white">Work Experience</h3>
        {expandedSections.workExperience ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections.workExperience && (
        <div className="space-y-4">
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="date"
                  placeholder="End Date (optional)"
                  value={exp.endDate}
                  onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <textarea
                placeholder="Job Description (max 500 characters)"
                value={exp.description}
                onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
                maxLength="500"
                rows="3"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {formData.workExperience.length > 1 && (
                <button
                  onClick={() => removeArrayItem("workExperience", index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem("workExperience")}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} /> Add Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceSection;
