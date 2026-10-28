import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  Wrench, 
  Globe, 
  Target, 
  Eye, 
  ArrowRight, 
  Sparkles,
  Users,
  CheckCircle2,
  Network
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
const keyWorkAreas = [
  {
    icon: Lightbulb,
    title: "Startup Incubation & Acceleration",
    tag: "Branch 01",
    description: "Mentorship pipelines, prototyping support, and direct pathways to incubators, angel networks, and seed funding.",
    glow: "hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    badge: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    iconBg: "text-purple-300 bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: Rocket,
    title: "Hackathons & Innovation Challenges",
    tag: "Branch 02",
    description: "High-energy national-level hackathons, ideathons, and venture pitch competitions designed to solve real-world problems.",
    glow: "hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    iconBg: "text-blue-300 bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: TrendingUp,
    title: "Investor & Industry Networking",
    tag: "Branch 03",
    description: "Direct fireside sessions, masterclasses, and networking avenues with founders, CXOs, venture capitalists, and alumni entrepreneurs.",
    glow: "hover:border-pink-500/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    badge: "text-pink-300 bg-pink-500/10 border-pink-500/20",
    iconBg: "text-pink-300 bg-pink-500/10 border-pink-500/20"
  },
  {
    icon: Wrench,
    title: "Skill Development & Bootcamps",
    tag: "Branch 04",
    description: "Workshops in product management, tech architecture, business model generation, and go-to-market strategies.",
    glow: "hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    iconBg: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
  },
  {
    icon: Globe,
    title: "Ecosystem Outreach & Community",
    tag: "Branch 05",
    description: "Bridging inter-college entrepreneurship networks, government startup schemes, and fostering a builder culture.",
    glow: "hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(192,132,252,0.2)]",
    badge: "text-purple-300 bg-purple-400/10 border-purple-400/20",
    iconBg: "text-purple-300 bg-purple-400/10 border-purple-400/20"
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full relative">
        
        {/* Ambient background glows with cool blue, purple and pink tones */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-[650px] right-[-100px] w-96 h-96 bg-pink-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* 1. Page Header with Entrance Fade */}
        <div className={`text-center mb-16 relative z-10 transition-all duration-700 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            About <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">E-Cell RSCOE</span>
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            The epicenter of innovation at JSPM's Rajarshi Shahu College of Engineering, built to turn campus thinkers into high-impact venture builders.
          </p>
        </div>

        {/* 2. Frosted Quote Card */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 p-8 sm:p-10 mb-24 shadow-2xl backdrop-blur-2xl transition-all duration-700 delay-150 transform hover:border-white/20 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-gray-200 text-base sm:text-xl font-normal leading-relaxed italic">
              "Backed by an active community of <span className="text-blue-300 font-semibold not-italic underline decoration-blue-500/40 underline-offset-4">100+ student innovators and leaders</span>, E-Cell RSCOE acts as the launchpad for scalable ventures—providing early mentorship, incubation access, and corporate connections to accelerate ideas into market realities."
            </p>
          </div>
        </div>

        {/* 3. Strategic Vision (Blue) & Mission (Purple) Hub */}
        <div className={`mb-28 transition-all duration-700 delay-300 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-8">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-blue-400 uppercase">
              Strategic Blueprint
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1">Our Core Trajectory & Purpose</p>
          </div>

          {/* Tab Switcher Controls */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-lg">
              <button
                type="button"
                onClick={() => setActiveTab("vision")}
                className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "vision"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-100"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4" />
                Our Vision
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mission")}
                className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-100"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Target className="w-4 h-4" />
                Our Mission
              </button>
            </div>
          </div>

          {/* Vision Card (Blue Accent) - Displayed First */}
          {activeTab === "vision" && (
            <div className="rounded-2xl bg-gradient-to-b from-[#081220]/90 via-[#090e18]/80 to-[#090b10] border border-blue-500/40 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 animate-in fade-in zoom-in-95">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                  <Eye className="w-10 h-10" />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">
                    Long-Term Vision
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-3">A Premier National Startup Cradle</h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                    To foster a community where innovative entrepreneurial ideas are nurtured and brought to life (implied from tagline "Ideas that matter").
                    </p><div className="flex flex-wrap gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> National Recognition</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Founder Pipeline</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Sustainable Tech Innovations</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Card (Purple Accent) - Displayed Second */}
          {activeTab === "mission" && (
            <div className="rounded-2xl bg-gradient-to-b from-[#150a20]/90 via-[#100918]/80 to-[#090b10] border border-purple-500/40 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 animate-in fade-in zoom-in-95">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                  <Target className="w-10 h-10" />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">
                    Execution & Impact
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-400 mb-3">Empowering Student Founders from Day Zero</h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                     To spread entrepreneurial drive among budding engineers and lead to their overall personality development. </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Action-Oriented Mentorship</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Prototype Grants Guidance</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Campus Startup Incubator</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Top-Down Ecosystem & Branch Tree Architecture */}
        <div className={`mb-28 relative transition-all duration-700 delay-500 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <div className="text-center mb-12">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-blue-400 uppercase">
              Ecosystem Architecture
            </h2>
            <p className="text-2xl sm:text-4xl font-black text-white mt-1">Core Platform & Branch Tree</p>
            <p className="text-gray-400 text-sm max-w-md mx-auto mt-2">
              Our central nerve center coordinating support, infrastructure, and resources across all operational pillars.
            </p>
          </div>

          {/* Central Top Node (E-Cell Core Platform) */}
          <div className="flex flex-col items-center justify-center mb-12 relative z-20">
            <div className="relative group p-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="px-8 py-5 rounded-[14px] bg-[#0c101a] flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 animate-pulse">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest text-purple-400 uppercase">Central Command Hub</div>
                  <div className="text-lg font-extrabold text-white">E-Cell RSCOE Core Platform</div>
                </div>
              </div>
            </div>

            {/* Downward Stem Line connecting to branches */}
            <div className="w-0.5 h-12 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 relative overflow-hidden">
              <div className="w-full h-1/2 bg-white/60 animate-pulse" />
            </div>
          </div>

          {/* Branch Grid with harmonized blue, purple, pink styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {keyWorkAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl bg-[#0a0e17]/90 border border-white/10 ${area.glow} p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-xl overflow-hidden backdrop-blur-md`}
                >
                  {/* Subtle Accent Glow on Card Left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Branching Header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className={`p-3.5 rounded-xl border ${area.iconBg} transition-all shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold tracking-wider px-3 py-1 rounded-full border ${area.badge} uppercase`}>
                      {area.tag}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Bottom Call to Action Card */}
        <div className={`rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-[#0b101c] to-purple-950/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-700 delay-700 transform hover:border-white/20 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Turn Your Idea into a Venture?
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-8 leading-relaxed">
            Join the RSCOE builder community, find mentors, join incubators, and launch products that matter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              to="/Events"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 font-bold text-white text-sm transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              Explore Our Initiatives <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 font-semibold text-gray-200 text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact E-Cell Team
            </Link>
          </div>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
