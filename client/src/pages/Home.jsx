import React from "react";
import Navbar from "../components/UserInterface/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Zap, Award, Clock, FileText, CheckCircle, Edit, Download } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-y-auto">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .button-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Land Your Dream Job
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                with an AI-Powered Resume
              </h2>
            </div>
            <div className="mt-8 space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 text-lg text-slate-200">
                <span className="text-2xl"></span>
                <span>Get noticed by recruiters</span>
              </div>
              <div className="flex items-center gap-3 text-lg text-slate-200">
                <span className="text-2xl"></span>
                <span>Beat the ATS in one click</span>
              </div>
              <div className="flex items-center gap-3 text-lg text-slate-200">
                <span className="text-2xl"></span>
                <span>Land more interviews faster</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => {
                  const isLoggedIn = () => {
                    try {
                      if (typeof document !== "undefined") {
                        const cookies = document.cookie.split(";").map((c) => c.trim());
                        for (const c of cookies) if (c.startsWith("token=")) return true;
                      }
                      if (typeof localStorage !== "undefined") {
                        const t = localStorage.getItem("token");
                        if (t) return true;
                      }
                    } catch (e) {}
                    return false;
                  };
                  
                  if (!isLoggedIn()) {
                    toast.info("Please sign up to create your resume");
                    navigate("/user/register");
                  } else {
                    navigate("/create-resume");
                  }
                }}
                className="cursor-pointer inline-flex  items-center px-6 py-3 bg-emerald-500 text-white rounded-md font-semibold shadow hover:brightness-95 transition"
              >
                Create your own resume
              </button>

              <button
                onClick={() => navigate("/user/register")}
                className="inline-flex items-center px-5 py-3 bg-white/5 text-white rounded-md font-medium shadow hover:bg-white/10 transition cursor-pointer"
              cursor-pointer>
                Browse templates
              </button>
            </div>

            <div className="mt-10 text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm"> </p>
            </div>

            <div className="mt-16 space-y-6 max-w-2xl">
              <p className="text-sm font-semibold text-slate-300">Frequently asked questions:</p>
              
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-sm font-medium text-white">How long does it take to create a resume?</span>
                  <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-slate-400 px-4 py-3">Most users create a complete resume in 5-15 minutes using our templates and AI-assisted suggestions.</p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-sm font-medium text-white">Can I export my resume as PDF?</span>
                  <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-slate-400 px-4 py-3">Yes! You can export your resume in multiple formats including PDF, Word, and directly share a link.</p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-sm font-medium text-white">Is my data secure?</span>
                  <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-slate-400 px-4 py-3">Your data is encrypted and stored securely. We never share your information with third parties.</p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-sm font-medium text-white">Can I use AI to improve my resume content?</span>
                  <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-slate-400 px-4 py-3">Absolutely! Our AI assistant provides intelligent suggestions to enhance your descriptions and highlight your achievements.</p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <span className="text-sm font-medium text-white">Can I edit my resume after creating it?</span>
                  <span className="text-slate-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-sm text-slate-400 px-4 py-3">Yes, you can edit and update your resume anytime. All changes are automatically saved.</p>
              </details>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* How It Works Section */}
            <div className="space-y-8 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-3xl font-bold text-white mb-8"> How it works</h2>
              
              <div className="flex gap-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border-2 border-emerald-500/50 group-hover:border-emerald-400 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300">
                    <Edit className="text-emerald-300 group-hover:text-emerald-200" size={28} />
                  </div>
                  <div className="w-1 h-20 bg-gradient-to-b from-emerald-500/50 to-blue-500/20 mt-2 group-hover:from-emerald-400 transition-colors duration-300"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200 transition-colors duration-300">Fill in your details</h3>
                  <p className="text-slate-400 mt-3 leading-relaxed">Add your experience, education & skills. Our AI instantly suggests improvements.</p>
                </div>
              </div>

              <div className="flex gap-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 border-2 border-blue-500/50 group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <CheckCircle className="text-blue-300 group-hover:text-blue-200" size={28} />
                  </div>
                  <div className="w-1 h-20 bg-gradient-to-b from-blue-500/50 to-purple-500/20 mt-2 group-hover:from-blue-400 transition-colors duration-300"></div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">Choose a template</h3>
                  <p className="text-slate-400 mt-3 leading-relaxed">Pick from ATS-optimized designs. Switch templates anytime without losing content.</p>
                </div>
              </div>

              <div className="flex gap-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30 border-2 border-purple-500/50 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                    <Download className="text-purple-300 group-hover:text-purple-200" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">Download & apply</h3>
                  <p className="text-slate-400 mt-3 leading-relaxed">Export as PDF, Word, or share a link. Start applying with confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 mb-4">
              <Zap className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-slate-400">Create a professional resume in just minutes, not hours.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 mb-4">
              <Award className="text-blue-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-sm text-slate-400">Get intelligent suggestions to improve your resume content.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20 mb-4">
              <FileText className="text-purple-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Formats</h3>
            <p className="text-sm text-slate-400">Export as PDF, Word, or share online instantly.</p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-500/20 mb-4">
              <Clock className="text-pink-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Always Available</h3>
            <p className="text-sm text-slate-400">Access and update your resumes anytime, anywhere.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
