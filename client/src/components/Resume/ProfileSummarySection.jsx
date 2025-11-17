import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProfileSummarySection = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Professional Summary</h2>
      <textarea
        name="profileSummary"
        placeholder="Write a brief professional summary (max 800 characters) *"
        value={formData.profileSummary}
        onChange={handleInputChange}
        maxLength="800"
        rows="6"
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
      />
      <p className="text-sm text-gray-400 mt-2">{formData.profileSummary.length}/800</p>
    </div>
  );
};

export default ProfileSummarySection;
