import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Sparkles, Trophy, Rocket, Target, Users } from "lucide-react";
import fishTankImg from "@/assets/fish-tank.jpeg";
import brandSprintImg from "@/assets/brand-sprint.jpeg";
import startupArenaImg from "@/assets/startup-arena.jpeg";

const flagships = [
  {
    id: "esummit",
    title: "E-SUMMIT '26",
    tag: "ANNUAL FLAGSHIP CONCLAVE",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    date: "27 March - 29 March 2026",
    venue: "RSCOE Campus, Pune",
    description: "The marquee entrepreneurship festival of Pune bringing together 1,500+ attendees, venture funds, visionary keynote founders, and student builders.",
    icon: Trophy,
    cta: "Explore Conclave",
    link: "/esummit",
    stat: "1,500+ Attendees",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderHover: "hover:border-cyan-400/60"
  },
  {
    id: "fish-tank",
    title: "FISH TANK",
    tag: "LIVE PITCH COMPETITION",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    date: "Annual Edition • Eureka! Partner",
    venue: "Jaywant Auditorium, RSCOE",
    description: "Our flagship Shark Tank format in collaboration with E-Cell IIT Bombay. Pitch student startups directly to a panel of founders, angels, and VCs.",
    image: fishTankImg,
    icon: Rocket,
    cta: "Pitch Your Idea",
    link: "/events",
    stat: "IIT Bombay Eureka! Track",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderHover: "hover:border-amber-400/60"
  },
  {
    id: "brand-sprint",
    title: "BRAND SPRINT",
    tag: "48-HOUR GTM HACKATHON",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    date: "Cohort Based Sprints",
    venue: "Innovation Labs, RSCOE",
    description: "A fast-paced sprint where teams build go-to-market strategies, brand identities, and traction funnels under pressure with mentorship.",
    image: brandSprintImg,
    icon: Target,
    cta: "View Sprint Details",
    link: "/events",
    stat: "48H Live Execution",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderHover: "hover:border-purple-400/60"
  },
  {
    id: "startup-arena",
    title: "STARTUP ARENA",
    tag: "INVESTOR & DEMO DAY",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    date: "Demo Days & Pitch Desks",
    venue: "E-Cell Incubation Arena",
    description: "Direct connection between student-led ventures and angel syndicates. Receive critical feedback, investor term sheets, and incubation support.",
    image: startupArenaImg,
    icon: Users,
    cta: "Apply For Arena",
    link: "/events",
    stat: "Seed Funding Runway",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderHover: "hover:border-emerald-400/60"
  }
];

export const FlagshipShowcase = () => {
  return (
    <section className="py-24 bg-[#050811] text-white relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Flagship Experiences
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Our Signature <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Initiatives</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light mt-3">
            From premier investor pitch desks to intensive marketing sprints—explore how we foster real entrepreneurial muscle.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {flagships.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative rounded-[30px] bg-slate-950/70 border border-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 ${item.borderHover} flex flex-col justify-between overflow-hidden shadow-xl`}
              >
                {/* Background ambient corner tint */}
                <div className={`absolute top-0 right-0 w-60 h-60 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl pointer-events-none`} />

                <div>
                  {/* Top Bar with Tag and Stat */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {item.stat}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  {/* Metadata pills */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-8 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-2">
                  <Link
                    to={item.link}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 group-hover:border-cyan-400/40 text-sm font-bold text-white transition-all duration-300"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 text-cyan-400 transition-transform" />
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

export default FlagshipShowcase;
