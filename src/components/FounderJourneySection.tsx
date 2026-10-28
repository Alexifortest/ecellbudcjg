import React from "react";
import { Lightbulb, Cpu, TrendingUp, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const stages = [
  {
    step: "01",
    tag: "IDEATION & DISCOVERY",
    title: "Ignite & Validate",
    subtitle: "The Innovation Forge",
    description: "Transform raw campus ideas and technical prototypes into battle-tested business blueprints through structured hackathons, mentor feedback, and Fish Tank.",
    metrics: "100+ Ideas Evaluated Yearly",
    points: ["Problem-Solution Fit Validation", "Rapid Prototyping Workshops", "Fish Tank Pitch Entryway"],
    accent: "from-cyan-500 to-blue-600",
    glow: "shadow-[0_0_35px_rgba(6,182,212,0.25)]",
    border: "group-hover:border-cyan-400/60",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    icon: Lightbulb
  },
  {
    step: "02",
    tag: "ACCELERATION & PRODUCT",
    title: "Build & Accelerate",
    subtitle: "The Execution Engine",
    description: "Master go-to-market strategy, product iteration, and compliance fundamentals during intensive 48-hour Brand Sprints and 1-on-1 venture mentorship sessions.",
    metrics: "25+ Cohort Teams Guided",
    points: ["48-Hour Brand Sprints", "Legal & Compliance Roadmaps", "1-on-1 Industry Mentorship"],
    accent: "from-purple-500 to-pink-600",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    border: "group-hover:border-purple-400/60",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    icon: Cpu
  },
  {
    step: "03",
    tag: "CAPITAL & EXPANSION",
    title: "Capitalize & Scale",
    subtitle: "The Investor Runway",
    description: "Connect validated student ventures directly with institutional seed capital, angel networks, and national ecosystem partners at the flagship E-Summit.",
    metrics: "₹2.5Cr+ Ecosystem Network",
    points: ["E-Summit Investor Showcase", "Direct Angel Pitch Desk", "IIT Bombay Eureka! Track"],
    accent: "from-emerald-400 to-teal-600",
    glow: "shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    border: "group-hover:border-emerald-400/60",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    icon: TrendingUp
  }
];

export const FounderJourneySection = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-black text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              The Founder Pipeline
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              From Campus to Capital: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                How We Accelerate Founders
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            A battle-tested 3-stage ecosystem designed to incubate raw student ambition into scalable, venture-ready market realities.
          </p>
        </div>

        {/* 3 Modular High-Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className={`group relative rounded-[28px] bg-card/40 border border-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-card/70 ${stage.border} ${stage.glow} flex flex-col justify-between`}
              >
                {/* Top Subtle Gradient Beam */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${stage.accent} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg border ${stage.badgeBg}`}>
                      {stage.tag}
                    </span>
                    <span className="text-3xl font-black text-white/20 font-mono group-hover:text-white/40 transition-colors">
                      {stage.step}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.accent} p-0.5 shadow-md`}>
                      <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center text-white">
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{stage.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {stage.description}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-2.5 mb-8 border-t border-white/5 pt-5">
                    {stage.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Metric */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{stage.metrics}</span>
                  <Link 
                    to="/events" 
                    className="inline-flex items-center gap-1 font-bold text-cyan-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FounderJourneySection;
