import React, { useState } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import OurFindsModal from "@/components/OurFindsModal";

export const OurFindsPill = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill on Bottom-Left */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#070b14]/90 hover:bg-[#070b14] border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Explore Our Finds: Startups by E-Cell RSCOE Members & Alumni"
          aria-label="Our Finds"
        >
          {/* Liquid Iridescent Neon Ring */}
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-emerald-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Inner Badge Icon */}
          <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-inner shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 group-hover:rotate-12 transition-transform" />
          </div>

          {/* Text Labels */}
          <div className="relative z-10 flex flex-col text-left">
            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-cyan-400 font-mono leading-none">
              RSCOE VENTURES
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white group-hover:text-cyan-200 transition-colors mt-0.5">
              Our Finds
            </span>
          </div>

          {/* Pulse Indicator & Arrow */}
          <div className="relative z-10 flex items-center gap-1.5 pl-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </button>
      </div>

      {/* Interactive Liquid Glass Modal */}
      <OurFindsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default OurFindsPill;
