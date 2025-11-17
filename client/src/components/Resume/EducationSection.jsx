import React from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const EducationSection = ({ formData, handleArrayInputChange, addArrayItem, removeArrayItem, expandedSections, toggleSection }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <button
        onClick={() => toggleSection("education")}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="text-xl font-semibold text-white">Education</h3>
        {expandedSections.education ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections.education && (
        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree (e.g., B.Tech, M.S)"
                  value={edu.degree}
                  onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="number"
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleArrayInputChange("education", index, "startYear", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="number"
                  placeholder="End Year (optional)"
                  value={edu.endYear}
                  onChange={(e) => handleArrayInputChange("education", index, "endYear", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <input
                type="text"
                placeholder="Percentage/CGPA (optional)"
                value={edu.percentage}
                onChange={(e) => handleArrayInputChange("education", index, "percentage", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {formData.education.length > 1 && (
                <button
                  onClick={() => removeArrayItem("education", index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem("education")}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} /> Add Education
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
