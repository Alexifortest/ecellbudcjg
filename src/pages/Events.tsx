import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import {
  CalendarDays,
  MapPin,
  Phone,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";

// Speaker Images
import maheshImg from "@/assets/mahesh.png";
import ishaanImg from "@/assets/ishaan.png";
import prafulImg from "@/assets/praful.png";
import fiveminImg from "@/assets/fivemin.png";
import deveshImg from "@/assets/devesh.png";
import murlikantImg from "@/assets/murlikant.png";
import vanshika from "@/speakers/speaker 1.png";
// Event Flyer Posters
import fishTankImg from "@/assets/fish-tank.jpeg";
import brandSprintImg from "@/assets/brand-sprint.jpeg";
import startupArenaImg from "@/assets/startup-arena.jpeg";

interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date?: string;
  start_date?: string;
  deadline?: string;
  venue: string;
  description: string;
  highlights?: string[];
  prizes?: string;
  image?: string;
  isExternal?: boolean;
  linkUrl?: string;
}

const flagshipEvents: EventItem[] = [
  {
    id: "fish-tank",
    title: "FISH TANK",
    subtitle: "Where Ideas Meet Investors",
    category: "Pitch Competition",
    start_date: "24 August | 11:00 AM",
    deadline: "Last day of Registration: 19 August",
    venue: "Jaywant Auditorium, C-Building, JSPM RSCOE",
    description:
      "Presenting in collaboration with E-Cell IIT Bombay's NEC & Eureka! 2026. Pitch your innovative ideas and student startups to an elite panel of 4+ founders, mentors, and investors.",
    highlights: [
      "Top 3 teams get a chance to Pitch at Eureka! IIT Bombay",
      "Who can dive in: Innovative Ideas, Student Startups (Teams of 1-7)",
      "Expert Feedback, Mentorship & Funding Opportunities",
    ],
    image: fishTankImg,
  },
  {
    id: "brand-sprint",
    title: "BRAND SPRINT",
    subtitle: "Where Creativity Meets Entrepreneurship",
    category: "Marketing & Strategy",
    date: "13 - 14 August",
    venue: "Innovation & Incubation Foundation, JSPM RSCOE",
    description:
      "Round 1: Startup Ambassador (30-60 sec promo reel). Round 2: CEO for a Day (offline pitch before judges).",
    prizes:
      "Get a chance to attend Origins at IIT Bombay! Win goodies, prizes & free tickets for E-Summit.",
    image: brandSprintImg,
  },
  {
    id: "startup-arena",
    title: "START-UP ARENA",
    subtitle: "Got a Billion-Dollar Idea? Prove It.",
    category: "Department of IT Event",
    date: "8th August",
    venue: "JSPM RSCOE Campus",
    description:
      "An intense startup pitch competition encouraging student innovators to showcase scalable business models.",
    prizes: "1st: ₹5,000/- | 2nd: ₹3,000/- | 3rd: ₹2,000/-",
    image: startupArenaImg,
  },
  {
    id: "e-summit-2026",
    title: "E-SUMMIT 2026",
    subtitle: "The Flagship Annual Conclave",
    category: "Annual Flagship Conclave",
    date: "Coming Soon",
    venue: "JSPM RSCOE Auditorium",
    description:
      "The monumental culmination of our yearly journey featuring keynote speakers, pan-India competitions, venture capital networking, and high-energy panels.",
    prizes: "The Ultimate Entrepreneurship Gathering",
    isExternal: true,
    linkUrl: "/esummit",
  },
];

const previousSpeakers = [
  {
    name: "Murlikant Petkar",
    info: "India's first Paralympic gold medalist. Spoke on resilience at E-Summit 2025.",
    image: murlikantImg,
  },
  {
    name: "Praful Billore",
    info: "Founder of MBA Chaiwala. Featured speaker at E-Summit 2025 focusing on brand building.",
    image: prafulImg,
  },
  {
    name: "Ishaan Sharma",
    info: "Content Creator and Entrepreneur. Shared insights on the creator economy.",
    image: ishaanImg,
  },
  {
    name: "Mahesh Kale",
    info: "National Award-winning Indian Classical Singer. Guest of honor at flagship events.",
    image: maheshImg,
  },
  {
    name: "Voldx Devesh",
    info: "Founder of Voldx, as seen on Shark Tank India. Mentor for student startups.",
    image: deveshImg,
  },
  {
    name: "5min Engineering",
    info: "Sridhar Sankar, educational influencer bridging theory and practice.",
    image: fiveminImg,
  },
  

];

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Prevent background page from scrolling when popup is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  const handleOpenModal = (event: EventItem) => {
    if (event.isExternal) {
      window.location.href = event.linkUrl || "/esummit";
    } else {
      setSelectedEvent(event);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  // POPUP RENDERED DIRECTLY ON SCREEN
  const modal =
    selectedEvent &&
    createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
        <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl p-6 md:p-8 shadow-2xl">
          
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground bg-secondary/80 p-2 rounded-full transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3">
            {selectedEvent.category}
          </span>

          <h2 className="text-3xl font-extrabold text-foreground mb-1">
            {selectedEvent.title}
          </h2>

          <p className="text-primary font-medium text-sm mb-6">
            {selectedEvent.subtitle}
          </p>

          {selectedEvent.image && (
            <div className="rounded-2xl overflow-hidden mb-6 max-h-64 bg-black flex items-center justify-center border border-border/40">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {selectedEvent.description}
          </p>

          {selectedEvent.highlights && (
            <div className="space-y-2 mb-6 bg-secondary/30 p-4 rounded-2xl border border-border/50">
              <h4 className="font-semibold text-sm mb-2 text-foreground">
                Key Highlights:
              </h4>

              {selectedEvent.highlights.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-border/40 text-sm text-muted-foreground mb-8">
            {(selectedEvent.start_date || selectedEvent.date) && (
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                <span>
                  {selectedEvent.start_date || selectedEvent.date}
                </span>
              </div>
            )}

            {selectedEvent.venue && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{selectedEvent.venue}</span>
              </div>
            )}

            {selectedEvent.prizes && (
              <p className="text-xs font-semibold text-amber-400 mt-2">
                {selectedEvent.prizes}
              </p>
            )}

            {selectedEvent.deadline && (
              <p className="text-xs text-muted-foreground italic">
                {selectedEvent.deadline}
              </p>
            )}
          </div>

          <button
            onClick={handleCloseModal}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />

      <main className="pt-28 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Events Directory
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              The E-Cell Calendar & Flagship Track
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our core events. Click "Learn More" on any card to view
              full guidelines, prizes, schedules, and contact details.
            </p>
          </div>
        </section>

        {/* EVENT CARDS GRID SECTION */}
        <section className="container mx-auto px-4 mt-16 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:-space-x-2 items-stretch py-6">
            {flagshipEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(59,130,246,0.35)] hover:border-primary hover:z-30 group"
              >
                {event.image ? (
                  <div className="h-48 sm:h-52 bg-black/90 overflow-hidden flex items-center justify-center border-b border-border/40 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-background/80 text-foreground backdrop-blur-md shadow-sm">
                      {event.category}
                    </span>
                  </div>
                ) : (
                  <div className="h-48 sm:h-52 bg-gradient-to-br from-blue-950/60 to-black p-4 flex flex-col items-center justify-center text-center border-b border-border/40 relative">
                    <Sparkles className="h-8 w-8 text-primary mb-2 animate-pulse" />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary">
                      {event.category}
                    </span>

                    <h3 className="text-xl font-black text-white">
                      {event.title}
                    </h3>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4 bg-card">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-primary font-medium mt-1 uppercase tracking-wider line-clamp-2">
                      {event.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
                    >
                      <span>
                        {event.isExternal
                          ? "Browse E-Summit Page"
                          : "Learn More"}
                      </span>

                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREVIOUS SPEAKERS SECTION */}
        <section className="container mx-auto px-4 mt-28 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Previous speakers
            </h2>

            <p className="text-muted-foreground mt-2">
              Visionaries who have graced the RSCOE stage
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {previousSpeakers.map((speaker) => (
              <div
                key={speaker.name}
                className="group relative aspect-square overflow-hidden rounded-3xl bg-card border border-border/60 shadow-lg"
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h3 className="text-xl font-bold text-white">
                    {speaker.name}
                  </h3>

                  <p className="text-sm text-gray-300">
                    {speaker.info}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* POPUP DIRECTLY RENDERED ON SCREEN */}
      {modal}
    </div>
  );
};

export default Events;