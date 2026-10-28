import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Flame, Users, Trophy, ExternalLink } from "lucide-react";
import heroBgImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 bg-black text-white">
      
      {/* ================= LAYER 1: Deep Obsidian Carbon & Ambient Lights ================= */}
      <div className="absolute inset-0 bg-[#06080e] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/25 via-[#06080e]/90 to-[#06080e] z-0" />
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px] animate-float z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] animate-float z-0 pointer-events-none" style={{ animationDelay: "-3s" }} />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* ================= LAYER 2: Background Image Overlay ================= */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 z-0 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-[#06080e]/80 z-0 pointer-events-none" />

      {/* ================= LAYER 3: Hero Content ================= */}
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)] group hover:border-cyan-400/50 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-cyan-300">
              JSPM'S RSCOE ENTREPRENEURSHIP CELL • 2026 ACTIVE
            </span>
          </div>

          {/* Main Kinetic Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] mb-6 text-white">
            WHERE IDEAS <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
              IGNITE & SCALE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl font-light">
            The central launchpad at JSPM’s RSCOE, Pune. Transforming student ambition into venture-backed startups through elite mentorship, capital runways, and competitive pitch arenas.
          </p>

          {/* High-Impact Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full sm:w-auto">
            
            {/* Primary Magnetic Glow Button */}
            <div className="relative group p-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] transition-all duration-300 active:scale-95">
              <Link
                to="/events"
                className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-[14px] bg-[#070b14] hover:bg-[#070b14]/80 backdrop-blur-md overflow-hidden transition-all duration-300 font-extrabold text-sm tracking-wider uppercase text-white"
              >
                <span>Explore Initiatives</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* Secondary Glass Button */}
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase px-8 py-7 rounded-2xl backdrop-blur-md hover:border-white/40 transition-all duration-300 active:scale-95"
              >
                About Ecosystem
              </Button>
            </Link>

          </div>

          {/* Live Ecosystem Metric Dock */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl w-full shadow-2xl">
            <div className="text-center p-3 border-r border-white/10 last:border-r-0">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">1,800+</p>
              <p className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider mt-1">Community Members</p>
            </div>
            <div className="text-center p-3 border-r border-white/10 last:border-r-0">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">50+</p>
              <p className="text-[11px] text-purple-400 font-bold uppercase tracking-wider mt-1">Ventures Mentored</p>
            </div>
            <div className="text-center p-3 border-r border-white/10 last:border-r-0">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">₹2.5Cr+</p>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider mt-1">Funding Network</p>
            </div>
            <div className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">280+</p>
              <p className="text-[11px] text-pink-400 font-bold uppercase tracking-wider mt-1">Summit Attendees</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;