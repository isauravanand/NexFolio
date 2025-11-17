import React from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const CertificationsSection = ({ formData, handleArrayInputChange, addArrayItem, removeArrayItem, expandedSections, toggleSection }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <button
        onClick={() => toggleSection("certifications")}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="text-xl font-semibold text-white">Certifications</h3>
        {expandedSections.certifications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections.certifications && (
        <div className="space-y-4">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Certification Title"
                  value={cert.title}
                  onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Organization (optional)"
                  value={cert.organization}
                  onChange={(e) => handleArrayInputChange("certifications", index, "organization", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="date"
                  placeholder="Issue Date (optional)"
                  value={cert.issueDate}
                  onChange={(e) => handleArrayInputChange("certifications", index, "issueDate", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="url"
                  placeholder="Credential URL (optional)"
                  value={cert.credentialUrl}
                  onChange={(e) => handleArrayInputChange("certifications", index, "credentialUrl", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              {formData.certifications.length > 1 && (
                <button
                  onClick={() => removeArrayItem("certifications", index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem("certifications")}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} /> Add Certification
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;
