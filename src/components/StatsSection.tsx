import React from "react";
import { Users, Calendar, Trophy, Rocket } from "lucide-react";

const stats = [
  { 
    label: "Community Members", 
    value: "1,800+", 
    sub: "Founders, developers & designers across campus",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/30"
  },
  { 
    label: "Active Inventions & Sprints", 
    value: "300+", 
    sub: "Workshops, hackathons & incubation sessions",
    icon: Rocket,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/30"
  },
  { 
    label: "Summit Delegates", 
    value: "280+", 
    sub: "Venture capitalists, founders & delegates at E-Summit",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30"
  },
  { 
    label: "Years of Ecosystem Legacy", 
    value: "5+", 
    sub: "Pioneering entrepreneurship since 2020",
    icon: Calendar,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30"
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 border-y border-white/10 bg-[#080b13] relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-32 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/60 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                {/* Continuous Subtle Shine */}
                <div className="stats-shine pointer-events-none absolute inset-0" />

                {/* Top Icon Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    RSCOE 0{index + 1}
                  </span>
                </div>

                {/* Number */}
                <p className="text-4xl font-black text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="mt-2 text-sm font-bold text-white tracking-wide">
                  {stat.label}
                </p>

                {/* Sub */}
                <p className="mt-1 text-xs text-slate-400 font-light leading-relaxed">
                  {stat.sub}
                </p>

                {/* Bottom Neon Accent Bar */}
                <div className="mt-5 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-3/4 rounded-full group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;