import Navbar from "@/components/Navbar";
import LandingHero from "@/components/HeroSection.tsx";
import StatsSection from "@/components/StatsSection";
import {ThreeEnginesSection} from "@/components/ThreeEnginesSection.tsx"
import ScrollReveal from "@/components/ScrollReveal";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import  BlogsSection  from "@/components/BlogsSection";

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
  { name: "Vanshika Pandey", role: "Keynote Speaker", image: speaker1 },
  { name: "Kamakshi Barve", role: "Industry Leader", image: speaker2 },
  { name: "Prachi Shevgaonkar", role: "Tech Innovator", image: speaker3 },
  { name: "Maher Kaur", role: "Venture Mentor", image: speaker4 },
  { name: "Pooja Patel", role: "Guest Speaker", image: speaker5 },
  { name: "Nikita Vora", role: "Startup Specialist", image: speaker6 },
  { name: "Mahesh Kale", role: "National Award-winning Classical Singer", image: maheshImg },
  { name: "Murlikant Petkar", role: "India's First Paralympic Gold Medalist", image: murlikantImg },
  { name: "Praful Billore", role: "Founder of MBA Chai Wala", image: prafulImg },
  { name: "Ishaan Sharma", role: "Content Creator & Entrepreneur", image: ishaanImg },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero: High-level Hook & E-Summit CTA */}
      <LandingHero />
      
      <ScrollReveal delay={150}>
        {/* Stats: Consolidated achievements */}
        <StatsSection />
      </ScrollReveal>
      
      <ScrollReveal delay={100}> 
        <ThreeEnginesSection />
      </ScrollReveal>
      
      {/* Flagship Events Section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl space-y-4 hover:border-primary/50 transition-colors group">
              <ScrollReveal delay={150}>
                <Calendar className="h-10 w-10 text-primary mb-2" />
              </ScrollReveal>
              <h3 className="text-2xl font-bold">Flagship Events</h3>
              <p className="text-muted-foreground">
                From E-Summit to Startup Pitch Desk, explore our full calendar of experiences.
              </p>
              <Link to="/events" className="inline-block">
                <Button variant="ghost" className="group-hover:text-primary p-0">
                  Browse Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Speakers Section: Smooth Slow-Motion Left Scroll with Attractive Hover Effects */}
      <ScrollReveal delay={100}>
        <section className="py-16 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Previous Speakers</h2>
            <p className="text-muted-foreground text-sm mt-2">Hover to inspect visionaries who have graced our stage</p>
          </div>

          <div className="flex w-full overflow-hidden relative py-4">
            <div className="animate-slow-marquee flex gap-6 px-3">
              {previousSpeakers.concat(previousSpeakers).map((speaker, index) => (
                <div
                  key={index}
                  className="relative w-64 h-80 rounded-3xl overflow-hidden bg-card border border-border/60 shadow-xl shrink-0 group transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
                >
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                  {/* Attractive Overlay Info Card on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-lg font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {speaker.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={100}> 
        <BlogsSection />
      </ScrollReveal>

      <ScrollReveal delay={100}> 
        <TestimonialsSection />
      </ScrollReveal>
      
      <ScrollReveal delay={100}>  
        <ContactSection />
      </ScrollReveal>
      
      <ScrollReveal delay={100}>
        <SiteFooter />
      </ScrollReveal>
    </div>
  );
};

export default Index;