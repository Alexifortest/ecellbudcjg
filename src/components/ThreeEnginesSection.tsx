import React from 'react';

export const ThreeEnginesSection = () => {
  return (
    <section className="relative py-32 bg-transparent text-white overflow-hidden">
      {/* Ambient glowing core behind the gears */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-emerald-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            The Three Pillars of E-Cell RSCOE
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
            Interlocked operational systems working in continuous synchronization.
          </p>
        </div>

        {/* U-Shape Meshed Gear Structure Container */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16 min-h-[420px] py-10">
          
          {/* GEAR 1: LEFT (Innovation Engine) */}
          <div className="flex flex-col items-center text-center max-w-xs group z-10 md:-mr-4">
            {/* Rotating Toothed Gear Structure */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400 rounded-3xl animate-[spin_14s_linear_infinite] shadow-[0_0_35px_rgba(59,130,246,0.3)] flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600/30 border-2 border-cyan-400 rounded-3xl animate-[spin_14s_linear_infinite_reverse]"></div>
              </div>
              <div className="absolute inset-3 bg-slate-950 rounded-2xl border border-blue-500/50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-blue-400 flex items-center justify-center shadow-inner">
                  <span className="text-blue-400 font-black text-sm">01</span>
                </div>
              </div>
            </div>
            {/* Content Outside the Gear */}
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">Creation Phase</span>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-2">The Innovation </h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Sparks raw ideas and turns them into validated blueprints through hackathons and Fish Tank.
            </p>
          </div>

          {/* GEAR 2: MIDDLE-BOTTOM (Execution Engine - Sized slightly smaller & dropped lower) */}
          <div className="flex flex-col items-center text-center max-w-xs group z-20 md:translate-y-20">
            {/* Rotating Toothed Gear Structure (Slightly smaller size: w-36 h-36) */}
            <div className="relative w-36 h-36 md:w-42 md:h-42 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-purple-500/20 border-2 border-purple-400 rounded-3xl animate-[spin_10s_linear_infinite_reverse] shadow-[0_0_40px_rgba(168,85,247,0.35)] flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-600/30 border-2 border-pink-400 rounded-3xl animate-[spin_10s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-3 bg-slate-950 rounded-2xl border border-purple-500/50 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-purple-400 flex items-center justify-center shadow-inner">
                  <span className="text-purple-400 font-black text-sm">02</span>
                </div>
              </div>
            </div>
            {/* Content Outside the Gear */}
            <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1">Core Transmission</span>
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">The Execution </h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Drives business fundamentals, market deployment, and marketing sprints like Brand Sprint.
            </p>
          </div>

          {/* GEAR 3: RIGHT (Impact Engine) */}
          <div className="flex flex-col items-center text-center max-w-xs group z-10 md:-ml-4">
            {/* Rotating Toothed Gear Structure */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 border-2 border-emerald-400 rounded-3xl animate-[spin_16s_linear_infinite] shadow-[0_0_35px_rgba(16,185,129,0.3)] flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-600/30 border-2 border-teal-400 rounded-3xl animate-[spin_16s_linear_infinite_reverse]"></div>
              </div>
              <div className="absolute inset-3 bg-slate-950 rounded-2xl border border-emerald-500/50 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center shadow-inner">
                  <span className="text-emerald-400 font-black text-sm">03</span>
                </div>
              </div>
            </div>
            {/* Content Outside the Gear */}
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Scale Phase</span>
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">The Impact </h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Connects student ventures directly with institutional capital and networks at the E-Summit.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};