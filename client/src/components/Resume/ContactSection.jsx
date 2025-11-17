import React from "react";

const ContactSection = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name *"
          value={formData.fullname}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits) *"
          value={formData.phone}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile (optional)"
          value={formData.linkedin}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <input
          type="url"
          name="github"
          placeholder="GitHub Profile (optional)"
          value={formData.github}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio (optional)"
          value={formData.portfolio}
          onChange={handleInputChange}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
      </div>
    </div>
  );
};

export default ContactSection;
