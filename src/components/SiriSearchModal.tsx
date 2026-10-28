import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  X, 
  ArrowRight, 
  Calendar, 
  Users, 
  FileText, 
  Sparkles, 
  ExternalLink,
  Compass,
  Mic2,
  Rocket
} from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  category: "Page" | "Event" | "Speaker" | "Action";
  description: string;
  path: string;
  badge?: string;
  isExternal?: boolean;
}

const searchableItems: SearchItem[] = [
  // Pages
  { id: "home", title: "Home", category: "Page", description: "Venture hub, live updates, and ecosystem overview", path: "/" },
  { id: "about", title: "About Us", category: "Page", description: "Our mission, platform architecture, and community story", path: "/about" },
  { id: "events", title: "Events & Initiatives", category: "Page", description: "Flagship experiences, pitch competitions & masterclasses", path: "/events" },
  { id: "team", title: "Our Team", category: "Page", description: "Executive board, department heads, and faculty coordinators", path: "/team" },
  { id: "blogs", title: "Blogs & Founder Insights", category: "Page", description: "Articles, startup guides, and industry playbooks", path: "/blogdetails" },
  { id: "gallery", title: "Photo Gallery", category: "Page", description: "Visual timeline of our past summits and interactive events", path: "/gallery" },
  { id: "contact", title: "Contact Us", category: "Page", description: "Get in touch, collaboration requests & partner inquiries", path: "/contact" },
  { id: "esummit", title: "E-Summit '26 Conclave", category: "Page", description: "Our largest annual entrepreneurship festival & summit", path: "/esummit" },
  { id: "register", title: "Summit Registration", category: "Page", description: "Register for upcoming events and grab summit passes", path: "/register" },
  { id: "our-finds", title: "Our Finds", category: "Page", description: "Companies founded by E-Cell RSCOE members and alumni", path: "/#our-finds", badge: "Ventures" },

  // Events & Flagships
  { id: "find-learnx", title: "LearnX by Parth Amilkanthwar", category: "Event", description: "EdTech & peer learning platform founded by E-Cell RSCOE member Parth", path: "/#our-finds", badge: "Our Finds" },
  { id: "find-devcraft", title: "DevCraft Studio", category: "Event", description: "High-velocity MVP engineering & SaaS studio founded by alumni", path: "/#our-finds", badge: "Our Finds" },
  { id: "find-ecosphere", title: "EcoSphere Solutions", category: "Event", description: "Circular packaging & carbon tracking startup incubated at RSCOE", path: "/#our-finds", badge: "Our Finds" },
  { id: "fish-tank", title: "Fish Tank '26", category: "Event", description: "Shark Tank style pitch arena with real angel investors & IIT Bombay Eureka", path: "/events", badge: "Flagship" },
  { id: "brand-sprint", title: "Brand Sprint", category: "Event", description: "48-hour marketing, go-to-market and brand deployment sprint", path: "/events", badge: "Competition" },
  { id: "startup-arena", title: "Startup Arena & Pitch Desk", category: "Event", description: "Live investor showcase connecting student founders with venture capital", path: "/events", badge: "Investor Connect" },
  { id: "keynotes", title: "Keynote Series", category: "Event", description: "Inspiring speeches and deep dives from visionary Indian founders", path: "/events", badge: "Speaker Series" },

  // Speakers
  { id: "spk-mahesh", title: "Mahesh Kale", category: "Speaker", description: "National Award-winning Classical Singer & Cultural Entrepreneur", path: "/events", badge: "Speaker" },
  { id: "spk-murlikant", title: "Murlikant Petkar", category: "Speaker", description: "India's First Paralympic Gold Medalist & Resilient Pioneer", path: "/events", badge: "Keynote" },
  { id: "spk-praful", title: "Praful Billore", category: "Speaker", description: "Founder of MBA Chai Wala & Youth Entrepreneurship Icon", path: "/events", badge: "Mentor" },
  { id: "spk-ishaan", title: "Ishaan Sharma", category: "Speaker", description: "Tech Creator, Podcaster & Startup Evangelist", path: "/events", badge: "Creator" },
  { id: "spk-vanshika", title: "Vanshika Pandey", category: "Speaker", description: "Keynote Speaker on Early Stage Growth & Venture Strategy", path: "/events", badge: "Speaker" },
  { id: "spk-prachi", title: "Prachi Shevgaonkar", category: "Speaker", description: "Tech Innovator, Climate Action Leader & CoolCrops Founder", path: "/events", badge: "Founder" },
  { id: "spk-nikita", title: "Nikita Vora", category: "Speaker", description: "Startup Specialist, Ecosystem Builder & Venture Mentor", path: "/events", badge: "Speaker" },

  // Actions & Socials
  { id: "act-youtube", title: "Official YouTube Channel", category: "Action", description: "Watch event recaps, speaker keynotes, and founder interviews", path: "https://www.youtube.com/@E-CellRSCOE", isExternal: true, badge: "YouTube" },
  { id: "act-instagram", title: "Follow on Instagram", category: "Action", description: "Daily stories, behind the scenes, and summit announcements", path: "https://www.instagram.com/e_cell_rscoe?igsi=MThkejdvZGdyajQ1MQ==", isExternal: true, badge: "@e_cell_rscoe" },
  { id: "act-linkedin", title: "Connect on LinkedIn", category: "Action", description: "Professional network updates, partnerships, and announcements", path: "https://www.linkedin.com/company/rscoe-e-cell/", isExternal: true, badge: "LinkedIn" },
  { id: "act-email", title: "Email E-Cell RSCOE", category: "Action", description: "Direct inquiry inbox for sponsors and student innovators", path: "mailto:ecellrscoe01@gmail.com", isExternal: true, badge: "Mail" },
];

interface SiriSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiriSearchModal: React.FC<SiriSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keyboard shortcut to close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const filteredItems = searchableItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery = 
      item.title.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.path, "_blank", "noopener,noreferrer");
    } else {
      navigate(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-28 px-4 sm:px-6">
      {/* Blurred Backdrop with soft organic Siri tinted glow */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main Glassy Siri Container */}
      <div className="relative w-full max-w-2xl z-10 animate-in zoom-in-95 duration-300">
        
        {/* =========================================================
            SIRI LIQUID GLOW BORDER (Fluid Multi-color Radial Aura)
            ========================================================= */}
        <div className="absolute -inset-[3px] rounded-[32px] bg-gradient-to-r from-[#00f0ff] via-[#d946ef] via-[#8b5cf6] to-[#06b6d4] opacity-80 blur-xl animate-pulse pointer-events-none transition-all duration-700" />
        <div className="absolute -inset-[1.5px] rounded-[30px] bg-gradient-to-r from-[#00f0ff] via-[#ec4899] via-[#8b5cf6] to-[#10b981] opacity-90 pointer-events-none" />

        {/* Liquid Glass Panel Body */}
        <div className="relative rounded-[28px] bg-[#070b14]/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden text-white">
          
          {/* Top Siri Aura Reflection */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-gradient-to-b from-[#00f0ff]/25 via-[#a855f7]/20 to-transparent blur-2xl pointer-events-none" />

          {/* Search Header Bar */}
          <div className="relative flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 text-cyan-300 shadow-inner">
              <Search className="w-4 h-4 animate-pulse text-cyan-300" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask or search anything across E-Cell RSCOE..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 text-base md:text-lg font-medium outline-none border-none tracking-wide"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-400 tracking-wider">
              <span>ESC</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-white/[0.01] overflow-x-auto no-scrollbar">
            {["All", "Page", "Event", "Speaker", "Action"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-cyan-500/20 via-indigo-500/30 to-purple-500/20 border border-cyan-400/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat === "All" ? "✨ All Results" : cat + "s"}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div 
            ref={listRef} 
            className="max-h-[380px] overflow-y-auto px-3 py-3 space-y-1.5 divide-y divide-white/[0.03]"
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Sparkles className="w-8 h-8 mx-auto text-purple-400/60 mb-3 animate-bounce" />
                <p className="text-base font-semibold text-white">No matching results found</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for "Fish Tank", "E-Summit", "Praful", or "Blogs"</p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group relative flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)] translate-x-1"
                        : "hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon per Category */}
                      <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                        item.category === "Event" 
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                          : item.category === "Speaker" 
                          ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                          : item.category === "Action"
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      }`}>
                        {item.category === "Event" && <Rocket className="w-4 h-4" />}
                        {item.category === "Speaker" && <Mic2 className="w-4 h-4" />}
                        {item.category === "Action" && <ExternalLink className="w-4 h-4" />}
                        {item.category === "Page" && <Compass className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white tracking-wide truncate group-hover:text-cyan-200 transition">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/10">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5 font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-3 shrink-0">
                      <span className="text-[11px] font-medium text-slate-500 group-hover:text-cyan-400 transition flex items-center gap-1">
                        {item.isExternal ? "Open Link" : "Navigate"}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Siri Footer Hint */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-medium text-slate-300">E-Cell Intelligence Search</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">↓</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">ENTER</kbd> to select</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SiriSearchModal;
