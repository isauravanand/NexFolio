import React from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const ProjectsSection = ({ formData, handleArrayInputChange, addArrayItem, removeArrayItem, expandedSections, toggleSection }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <button
        onClick={() => toggleSection("projects")}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="text-xl font-semibold text-white">Projects</h3>
        {expandedSections.projects ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections.projects && (
        <div className="space-y-4">
          {formData.projects.map((project, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => handleArrayInputChange("projects", index, "title", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
                rows="3"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={project.technologies.join(", ")}
                  onChange={(e) =>
                    handleArrayInputChange("projects", index, "technologies", e.target.value.split(",").map((t) => t.trim()))
                  }
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="url"
                  placeholder="Project Link (optional)"
                  value={project.link}
                  onChange={(e) => handleArrayInputChange("projects", index, "link", e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <input
                type="url"
                placeholder="GitHub Link (optional)"
                value={project.githubLink}
                onChange={(e) => handleArrayInputChange("projects", index, "githubLink", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {formData.projects.length > 1 && (
                <button
                  onClick={() => removeArrayItem("projects", index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem("projects")}
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} /> Add Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
