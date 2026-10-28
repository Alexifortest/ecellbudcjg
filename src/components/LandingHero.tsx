import { Link } from "react-router-dom";
import { Ticket, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBgImage from "@/assets/hero-bg.jpg";

const LandingHero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-28 pb-20 bg-transparent" style={{backgroundImage: 'url(${heroBgImage'}}>
      {/* 3D Parallax Background: 
        - Using z-0 to keep it visible but behind content.
        - Using backgroundAttachment: 'fixed' creates the depth effect as you scroll.
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay to ensure text is readable regardless of the image brightness */}
        <div className="absolute inset-0 bg-black/50 lg:bg-black/30" />
        
        {/* Bottom gradient to help it "disappear" into the next section smoothly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md px-4 py-2 text-sm text-primary-foreground mb-6 shadow-lg">
            Driven by Students, Built for Innovators
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6 uppercase text-white drop-shadow-2xl">
            Empowering Future <br />
            <span className="gradient-text brightness-125">Entrepreneurs</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mb-10 leading-relaxed drop-shadow-md font-medium">
            E-Cell RSCOE is a community-driven hub at JSPM’s RSCOE, Pune, where student ideas transform into scalable ventures through mentorship and innovation.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            
          </div>
          
          {/* Impact Stats Card */}
          <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-md shadow-2xl">
             <div className="text-sm border-r border-white/20 pr-6">
                <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">2025 Impact</p>
                <p className="font-bold text-white">280+ SUMMIT ATTENDEES</p>
             </div>
             <div className="text-sm">
                <p className="text-white/60 uppercase tracking-widest text-[10px] font-bold">Official Handle</p>
                <p className="font-semibold text-primary">@E_CELL_RSCOE</p>
             </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default LandingHero;