import React from "react";

const TemplateSelectionSection = ({ formData, templates, handleTemplateSelect }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Select Your Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
              formData.selectedTemplate === template.id
                ? "border-purple-500 bg-gradient-to-br from-slate-800 to-slate-700"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <div className={`h-40 rounded-lg bg-gradient-to-br ${template.color} mb-4`} />
            <h3 className="text-lg font-semibold text-white">{template.name}</h3>
            <p className="text-sm text-gray-400 mt-2">Professional {template.name.toLowerCase()} design</p>
            <div
              className={`mt-4 w-4 h-4 rounded-full border-2 ${
                formData.selectedTemplate === template.id
                  ? "border-purple-500 bg-purple-500"
                  : "border-white/30"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Preview Section */}
      {formData.selectedTemplate && (
        <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
          <div className="bg-white/10 rounded-lg p-6 max-h-96 overflow-y-auto">
            <h4 className="text-xl font-bold text-white mb-2">{formData.fullname || "Your Name"}</h4>
            <p className="text-sm text-gray-300 mb-4">{formData.email || "email@example.com"}</p>
            <p className="text-gray-300">{formData.profileSummary || "Your professional summary will appear here..."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelectionSection;
