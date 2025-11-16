import React from "react";
import { Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-slate-950 to-slate-900/50 border-t border-white/5 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          {/* <div>
            <h3 className="text-xl font-bold text-white mb-4">AI Resume Builder</h3>
            <p className="text-sm text-slate-400 mb-6">
              Build professional resumes powered by AI. Land your dream job with an ATS-optimized resume.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                <Github size={20} />
              </a>
            </div> */}
          </div>

          {/* Product Links */}
          {/* <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div> */}

          {/* Company Links */}
          {/* <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Press
                </a>
              </li>
            </ul>
          </div> */}

          {/* Legal Links */}
          {/* <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div> */}

        {/* Divider */}
        {/* <div className="border-t border-white/5 py-8"> */}
          {/* Contact Info */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Email</p>
                <a href="mailto:support@airesume.com" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  support@airesume.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-400" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Phone</p>
                <a href="tel:+1234567890" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div> */}

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
            <p className="text-xs text-slate-500 text-center md:text-left mb-4 md:mb-0">
              © 2025 NexFolio. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Made with <span className="text-emerald-400">♥</span> for job seekers worldwide
            </p>
          </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
