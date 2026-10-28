import React from "react";
import Navbar from "@/components/Navbar";
import LandingHero from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import StatsSection from "@/components/StatsSection";
import FounderJourneySection from "@/components/FounderJourneySection";
import FlagshipShowcase from "@/components/FlagshipShowcase";
import OurFindsSection from "@/components/OurFindsSection";
import ScrollReveal from "@/components/ScrollReveal";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Rocket, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import BlogsSection from "@/components/BlogsSection";

// Speaker Images Imports
import speaker1 from "../assests-esummit/speakers/speaker 1.png";
import speaker2 from "../assests-esummit/speakers/speaker 2.png";
import speaker3 from "../assests-esummit/speakers/speaker 3.png";
import speaker4 from "../assests-esummit/speakers/speaker 4.png";
import speaker5 from "../assests-esummit/speakers/speaker 5.png";
import speaker6 from "../assests-esummit/speakers/speaker 6.png";
import speaker7 from "../assests-esummit/speakers/speaker 7.png";
import maheshImg from "@/assets/mahesh.png";
import murlikantImg from "@/assets/murlikant.png";
import prafulImg from "@/assets/praful.png";
import ishaanImg from "@/assets/ishaan.png";

const previousSpeakers = [
  { name: "Mahesh Kale", role: "National Award Singer & Entrepreneur", image: maheshImg, badge: "Cultural Icon" },
  { name: "Murlikant Petkar", role: "India's 1st Paralympic Gold Medalist", image: murlikantImg, badge: "Padma Shri" },
  { name: "Praful Billore", role: "Founder, MBA Chai Wala", image: prafulImg, badge: "Founder" },
  { name: "Ishaan Sharma", role: "Creator & Startup Evangelist", image: ishaanImg, badge: "Tech Leader" },
  { name: "Vanshika Pandey", role: "Keynote Speaker & Strategist", image: speaker1, badge: "Speaker" },
  { name: "Kamakshi Barve", role: "Industry & Brand Leader", image: speaker2, badge: "Industry" },
  { name: "Prachi Shevgaonkar", role: "Founder, CoolCrops / Climate Innovator", image: speaker3, badge: "Innovator" },
  { name: "Maher Kaur", role: "Venture Mentor & Ecosystem Builder", image: speaker4, badge: "Mentor" },
  { name: "Pooja Patel", role: "Guest Speaker & Fintech Specialist", image: speaker5, badge: "Fintech" },
  { name: "Nikita Vora", role: "Startup Specialist & Angel Mentor", image: speaker6, badge: "Angel" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#05070d] text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* Hero: High-Impact Kinetic Launchpad */}
      <LandingHero />

      {/* Lando Norris-Inspired Continuous Marquee Strip */}
      <MarqueeTicker />

      {/* Stats: Consolidated Ecosystem Impact */}
      <ScrollReveal delay={100}>
        <StatsSection />
      </ScrollReveal>

      {/* Founder Journey Pipeline */}
      <ScrollReveal delay={100}>
        <FounderJourneySection />
      </ScrollReveal>

      {/* Signature Flagship Initiatives (Bento Grid inspired by ecelliitg.in) */}
      <ScrollReveal delay={100}>
        <FlagshipShowcase />
      </ScrollReveal>

      {/* Our Finds: RSCOE Alumni & Member Startups */}
      <ScrollReveal delay={100}>
        <OurFindsSection />
      </ScrollReveal>

      {/* Previous Visionaries & Speakers Marquee */}
      <ScrollReveal delay={100}>
        <section className="py-24 bg-[#070a14] relative overflow-hidden border-t border-white/5">
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/3 w-[600px] h-64 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container mx-auto px-6 mb-12 text-center max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
              <Mic2 className="w-3.5 h-3.5 text-purple-400" />
              E-Summit Luminary Network
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Previous Visionaries & <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">Keynote Speakers</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light mt-3">
              Trailblazing founders, national medalists, and industry mentors who have shared raw insights on our stages.
            </p>
          </div>

          {/* Marquee Strip with Glowing Hover Cards */}
          <div className="flex w-full overflow-hidden relative py-6 select-none">
            {/* Fade edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#070a14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#070a14] to-transparent z-10 pointer-events-none" />

            <div className="animate-slow-marquee flex gap-7 px-4 hover:[animation-play-state:paused]">
              {previousSpeakers.concat(previousSpeakers).map((speaker, index) => (
                <div
                  key={index}
                  className="relative w-64 h-88 rounded-[28px] overflow-hidden bg-slate-950/80 border border-white/10 shadow-2xl shrink-0 group transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Gradient Overlay & Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-black/70 backdrop-blur-md border border-white/20 text-cyan-300">
                      {speaker.badge}
                    </span>
                  </div>

                  {/* Hover Information Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 transition-all duration-300">
                    <h3 className="text-lg font-black uppercase text-white tracking-wide group-hover:text-cyan-200 transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1">
                      {speaker.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 relative z-10">
            <Link to="/events">
              <Button variant="ghost" className="text-cyan-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider gap-2">
                <span>View Full Keynote Archive</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Blogs & Insights Section */}
      <ScrollReveal delay={100}>
        <BlogsSection />
      </ScrollReveal>

      {/* Voices & Testimonials */}
      <ScrollReveal delay={100}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* High-Voltage Community CTA Banner (Lando Norris style) */}
      <ScrollReveal delay={100}>
        <section className="py-20 px-6 container mx-auto max-w-6xl">
          <div className="relative rounded-[36px] overflow-hidden p-10 md:p-16 border border-white/15 bg-gradient-to-br from-cyan-950/60 via-purple-950/40 to-slate-950/90 backdrop-blur-2xl text-center shadow-[0_0_60px_rgba(6,182,212,0.15)]">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-widest mb-6">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                Launch Your Future
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                Ready to Build Something <br />
                <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Extraordinary?
                </span>
              </h2>
              <p className="mt-5 text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Connect with 1,800+ peers, gain mentorship from battle-tested founders, and scale your venture with E-Cell RSCOE.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-2xl bg-cyan-400 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 active:scale-95"
                >
                  Join Our Ecosystem
                </Link>
                <Link
                  to="/esummit"
                  className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 active:scale-95"
                >
                  Explore E-Summit '26
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Section */}
      <ScrollReveal delay={100}>
        <ContactSection />
      </ScrollReveal>

      {/* Site Footer */}
      <ScrollReveal delay={100}>
        <SiteFooter />
      </ScrollReveal>
    </div>
  );
};

export default Index;