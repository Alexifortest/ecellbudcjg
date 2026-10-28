import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  Building2, 
  Users, 
  Trophy, 
  CheckCircle2, 
  Linkedin, 
  ArrowRight,
  Layers,
  ChevronRight
} from "lucide-react";
import { ourFindsCompanies, CompanyFind } from "@/data/ourFindsData";

interface OurFindsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCompanyId?: string;
}

export const OurFindsModal: React.FC<OurFindsModalProps> = ({ 
  isOpen, 
  onClose,
  initialCompanyId = "learnx"
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialCompanyId);

  useEffect(() => {
    if (initialCompanyId) {
      setSelectedId(initialCompanyId);
    }
  }, [initialCompanyId, isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCompany = ourFindsCompanies.find((c) => c.id === selectedId) || ourFindsCompanies[0];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Dark frosted backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main Liquid Glass Modal */}
      <div className="relative w-full max-w-5xl z-10 my-auto animate-in zoom-in-95 duration-300">
        
        {/* Siri Iridescent Glowing Perimeter */}
        <div className="absolute -inset-[3px] rounded-[36px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-75 blur-xl animate-pulse pointer-events-none" />
        <div className="absolute -inset-[1px] rounded-[34px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-90 pointer-events-none" />

        {/* Modal Content Panel */}
        <div className="relative rounded-[32px] bg-[#070b14]/95 backdrop-blur-3xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-white flex flex-col max-h-[90vh]">
          
          {/* Top Header Bar */}
          <div className="relative flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 text-cyan-300 shadow-inner">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                    Our Finds <span className="text-cyan-400">•</span> RSCOE Venture Portfolio
                  </h2>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Alumni & Member Startups
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light mt-0.5">
                  Companies incubated, founded, and scaled by past and present members of E-Cell RSCOE.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Company Switcher Tabs */}
          <div className="flex items-center gap-2 px-6 sm:px-8 py-3.5 border-b border-white/10 bg-black/40 overflow-x-auto no-scrollbar">
            {ourFindsCompanies.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/60 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]"
                      : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isSelected ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{c.name}</span>
                  {c.id === "learnx" && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-400 text-black font-extrabold">
                      PARTH
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            
            {/* Top Brand Overview Card */}
            <div className="relative rounded-3xl bg-slate-950/70 border border-white/15 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                      {currentCompany.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                      {currentCompany.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Est. {currentCompany.founded}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                    {currentCompany.name}
                  </h3>
                  <p className="text-base sm:text-lg text-cyan-300 font-medium mb-4">
                    {currentCompany.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {currentCompany.about}
                  </p>
                </div>

                {/* Quick Action Button */}
                {currentCompany.website && (
                  <div className="shrink-0">
                    <a
                      href={currentCompany.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95"
                    >
                      <span>Explore Platform</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Traction Metrics Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {currentCompany.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-xl sm:text-2xl font-black text-white font-mono">{metric.value}</p>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column: Sample Gallery (Left) & Founder Spotlight (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sample Gallery (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      Sample Gallery & Platform Walkthrough
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentCompany.gallery.length} Snapshots
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentCompany.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
                    >
                      <div className={`absolute -right-10 -bottom-10 w-44 h-44 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/10">
                            {item.tag}
                          </span>
                          <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                        </div>
                        <h5 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder Spotlight (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Founder Spotlight
                  </h4>
                </div>

                <div className="relative rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-950/70 to-slate-950/90 border border-white/15 p-6 backdrop-blur-xl shadow-xl">
                  {/* Founder Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-0.5 shadow-lg shrink-0">
                      <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center font-black text-xl text-white tracking-wider">
                        {currentCompany.founder.initials}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase text-white tracking-wide">
                        {currentCompany.founder.name}
                      </h4>
                      <p className="text-xs font-bold text-cyan-400 mt-0.5">
                        {currentCompany.founder.role}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {currentCompany.founder.affiliation}
                      </p>
                    </div>
                  </div>

                  {/* Founder Bio Quote */}
                  <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 mb-5">
                    <p className="text-xs text-slate-300 leading-relaxed font-light italic">
                      "{currentCompany.founder.bio}"
                    </p>
                  </div>

                  {/* RSCOE Legacy Verification */}
                  <div className="space-y-2 mb-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Verified JSPM's RSCOE E-Cell Origin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Mentored at Campus Incubation Labs</span>
                    </div>
                  </div>

                  {/* LinkedIn / Connect */}
                  {currentCompany.founder.linkedin && (
                    <a
                      href={currentCompany.founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition hover:border-cyan-400/50"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>Connect with {currentCompany.founder.name.split(" ")[0]}</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Are you an E-Cell RSCOE founder? Apply to be featured in Our Finds.</span>
            </div>
            <a
              href="mailto:ecellrscoe01@gmail.com?subject=Our%20Finds%20Feature%20Application"
              className="font-bold text-cyan-400 hover:text-white transition flex items-center gap-1"
            >
              <span>Submit Your Venture</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OurFindsModal;
