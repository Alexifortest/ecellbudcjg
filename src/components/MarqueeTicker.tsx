import React from "react";
import { Zap, Flame, Rocket, Sparkles } from "lucide-react";

export const MarqueeTicker = () => {
  const items = [
    { text: "INNOVATION DRIVEN", icon: Flame },
    { text: "VENTURE ACCELERATOR", icon: Rocket },
    { text: "FISH TANK '26", icon: Zap },
    { text: "E-SUMMIT 2026", icon: Sparkles },
    { text: "1,800+ FOUNDERS", icon: Flame },
    { text: "BRAND SPRINT", icon: Rocket },
    { text: "SEED CAPITAL RUNWAY", icon: Zap },
    { text: "CAMPUS TO CAPITAL", icon: Sparkles },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-950/60 border-y border-white/10 backdrop-blur-md select-none">
      {/* Subtle edge blur masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Ribbon */}
      <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 shrink-0 group">
            <item.icon className="w-4 h-4 text-cyan-400 group-hover:text-pink-400 group-hover:scale-125 transition-all duration-300" />
            <span className="text-sm md:text-base font-black tracking-[0.2em] uppercase text-white/90 group-hover:text-cyan-300 transition-colors">
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
