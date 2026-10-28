import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SiriSearchModal from "@/components/SiriSearchModal";

import ecellLogo from "../assets/ecell-logo-wb.png";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/events", label: "EVENTS" },
  { to: "/team", label: "TEAM" },
  { to: "/blogdetails", label: "BLOGS" },
  { to: "/gallery", label: "GALLERY" },
  { to: "/contact", label: "CONTACT" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBlogClick = () => {
    setIsOpen(false);

    if (location.pathname === "/") {
      document.getElementById("blogs")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");

      setTimeout(() => {
        document.getElementById("blogs")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ecellLogo}
              alt="E-Cell Logo"
              className="h-8 md:h-10 w-auto transition-transform hover:scale-110 duration-300"
            />

            <div className="font-bold text-lg md:text-xl tracking-tighter uppercase text-white">
              E-CELL <span className="text-blue-500">RSCOE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 font-medium">

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                  location.pathname === link.to
                    ? "text-blue-500 font-bold"
                    : "text-white hover:text-blue-500"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transition-transform duration-300 origin-left ${
                    location.pathname === link.to
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

            {/* Siri Liquid Glass Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-95 ml-2 cursor-pointer"
              title="Search across E-Cell RSCOE (Ctrl+K)"
            >
              {/* Subtle iridescent glow on hover */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-40 blur transition duration-500 pointer-events-none" />
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform relative z-10" />
              <span className="text-xs text-slate-300 group-hover:text-white font-medium relative z-10">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-slate-300 border border-white/10 relative z-10">
                ⌘K
              </kbd>
            </button>

          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl bg-white/10 border border-white/15 text-cyan-400 hover:text-white transition active:scale-90"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div className="z-50 cursor-pointer">
                  <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    size={32}
                    color="white"
                    duration={0.5}
                    rounded
                  />

                  <span className="sr-only">
                    Toggle menu
                  </span>
                </div>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-black/95 border-l border-white/10 text-white w-[300px]"
              >
                <VisuallyHidden>
                  <SheetTitle>
                    Mobile Navigation Menu
                  </SheetTitle>
                </VisuallyHidden>

                <div className="flex flex-col items-center justify-center space-y-8 mt-20">

                  {navLinks.map((link, index) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-bold tracking-widest uppercase transition-colors animate-in slide-in-from-right-8 duration-500 fill-mode-both ${
                        location.pathname === link.to
                          ? "text-blue-500"
                          : "text-white hover:text-blue-500"
                      }`}
                      style={{
                        animationDelay: `${(index + 1) * 100}ms`,
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Search inside mobile menu */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-sm font-semibold tracking-wider uppercase mt-4 active:scale-95 transition"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Site</span>
                  </button>

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>

      {/* Siri Liquid Glass Search Modal */}
      <SiriSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;