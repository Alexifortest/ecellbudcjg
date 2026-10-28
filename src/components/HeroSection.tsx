import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowDown } from "lucide-react";
import heroBgImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-black text-white">
      
      {/* ================= LAYER 1: Base Black & Grids (Bottom) ================= */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: "-3s" }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] z-0" />

      {/* ================= LAYER 2: Background Image (Above Grids, Below Headings) ================= */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-10 pointer-events-none"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      />
      {/* Dark tint overlay right over the image to keep text readable */}
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

      {/* ================= LAYER 3: Main Headings & Content (Top Layer) ================= */}
      <div className="container mx-auto px-6 relative z-20 max-w-5xl">
        <div className="flex flex-col items-start text-left max-w-3xl">
          
          {/* Top Badge */}
          

          {/* Main Title */}
          <h1 style={{fontSize: "70px"}} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-none mb-6 text-white">
            EMPOWERING FUTURE <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              ENTREPRENEURS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
            E-Cell RSCOE is a community-driven hub at JSPM's RSCOE, Pune, where student ideas transform into scalable ventures through mentorship and innovation.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
            <div className="relative group p-0.5 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(20,184,166,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300">
              <Link
                to="/about"
                className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#070b13]/90 hover:bg-[#070b13]/70 backdrop-blur-md overflow-hidden transition-all duration-300 font-bold text-sm tracking-wide text-white group-hover:text-cyan-200"
              >
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "14px 14px"
                  }}
                />
                <span className="relative z-10">Learn More</span>
              </Link>
            </div>
            <Link to="/events">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-8 py-6 rounded-xl backdrop-blur-sm">
                Our Initiatives <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Stats & Clickable Handle Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-full max-w-xl">
            <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">2026 IMPACT</p>
              <p className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight">
                280+ SUMMIT ATTENDEES
              </p>
            </div>
            <div className="sm:pl-2">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">OFFICIAL HANDLE</p>
              <a 
                href="https://www.instagram.com/e_cell_rscoe?igsi=MThkejdvZGdyajQ1MQ=="
                className="inline-flex items-center gap-1.5 text-xl md:text-2xl font-black text-white hover:text-blue-400 transition-colors mt-1 group"
              >
                <span>@E_CELL_RSCOE</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;