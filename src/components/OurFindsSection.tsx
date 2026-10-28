import React, { useState } from "react";
import { Sparkles, Building2, ExternalLink, ArrowRight, CheckCircle2, Linkedin, Layers } from "lucide-react";
import { ourFindsCompanies } from "@/data/ourFindsData";
import OurFindsModal from "@/components/OurFindsModal";

export const OurFindsSection = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("learnx");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCompany = ourFindsCompanies.find((c) => c.id === selectedCompanyId) || ourFindsCompanies[0];

  const handleOpenModal = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };

  return (
    <section id="our-finds" className="py-24 bg-[#060912] text-white relative overflow-hidden border-t border-white/5">
      {/* Background ambient aura */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              RSCOE Founder Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Our Finds: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                Ventures by E-Cell RSCOE Members
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            From classroom ideas to venture-backed enterprises—celebrating game-changing companies built by past and current leaders of E-Cell RSCOE.
          </p>
        </div>

        {/* Company Quick-Select Strip */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
          {ourFindsCompanies.map((c) => {
            const isSelected = c.id === selectedCompanyId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompanyId(c.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-wide uppercase transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/60 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] scale-[1.02]"
                    : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Building2 className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{c.name}</span>
                {c.id === "learnx" && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-400 text-black font-extrabold">
                    PARTH
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card */}
        <div className="relative rounded-[32px] bg-slate-950/80 border border-white/15 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Brand Story & Traction (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                  {activeCompany.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                  {activeCompany.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">Founded {activeCompany.founded}</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  {activeCompany.name}
                </h3>
                <p className="text-base sm:text-lg text-cyan-300 font-medium">
                  {activeCompany.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {activeCompany.about}
              </p>

              {/* Traction Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                {activeCompany.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-xl sm:text-2xl font-black text-white font-mono">{m.value}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Sample Gallery Snippet */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Platform Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCompany.gallery.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">{item.tag}</span>
                      <p className="text-xs font-bold text-white mt-1">{item.title}</p>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5 leading-snug">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenModal(activeCompany.id)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>View Full Gallery & Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {activeCompany.website && (
                  <a
                    href={activeCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                  >
                    <span>Visit {activeCompany.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>

            </div>

            {/* Right Column: Founder Spotlight Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-950/70 to-slate-950/90 border border-white/15 p-7 backdrop-blur-xl shadow-xl">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-4 font-bold">
                  FOUNDER PROFILE
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-0.5 shadow-lg shrink-0">
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center font-black text-xl text-white tracking-wider">
                      {activeCompany.founder.initials}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-white tracking-wide">
                      {activeCompany.founder.name}
                    </h4>
                    <p className="text-xs font-bold text-cyan-400 mt-0.5">
                      {activeCompany.founder.role}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {activeCompany.founder.affiliation}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 mb-5">
                  <p className="text-xs text-slate-300 leading-relaxed font-light italic">
                    "{activeCompany.founder.bio}"
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>JSPM's RSCOE E-Cell Heritage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Active Member / Alumni Network</span>
                  </div>
                </div>

                {activeCompany.founder.linkedin && (
                  <a
                    href={activeCompany.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white transition hover:border-cyan-400/50"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive Modal */}
      <OurFindsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialCompanyId={selectedCompanyId}
      />
    </section>
  );
};

export default OurFindsSection;
