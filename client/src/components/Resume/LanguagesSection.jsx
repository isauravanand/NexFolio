import React from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const LanguagesSection = ({ formData, handleArrayInputChange, addArrayItem, removeArrayItem, expandedSections, toggleSection }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <button
        onClick={() => toggleSection("languages")}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="text-xl font-semibold text-white">Languages</h3>
        {expandedSections.languages ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections.languages && (
        <div className="space-y-3">
          {formData.languages.map((lang, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Language"
                value={lang}
                onChange={(e) => handleArrayInputChange("languages", index, null, e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {formData.languages.length > 1 && (
                <button
                  onClick={() => removeArrayItem("languages", index)}
                  className="text-red-400 hover:text-red-300 px-4 py-2 border border-white/20 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem("languages")}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} /> Add Language
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguagesSection;
