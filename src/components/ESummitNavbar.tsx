import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { Squash as Hamburger } from "hamburger-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import justLogo from "@/assests-esummit/just_logo.png";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const navLinks = [
  { to: "/e-summit", label: "HOME" },
  { to: "/e-summit/agenda", label: "AGENDA" },
  { to: "/e-summit/speakers", label: "SPEAKERS" },
  { to: "/e-summit/sponsors", label: "SPONSORS" },
];

const ESummitNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotation = scrollY * 0.5;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-lg"
      style={{
        background: "rgba(18, 1, 29, 0.76)",
        borderColor: "rgba(247, 239, 249, 0.12)",
      }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Hamburger menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div className="z-50 cursor-pointer">
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  size={28}
                  color={colors.highlight}
                  duration={0.5}
                  rounded
                />
                <span className="sr-only">Toggle menu</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] border-r text-white"
              style={{
                background: "rgba(18, 1, 29, 0.97)",
                borderColor: "rgba(247, 239, 249, 0.14)",
              }}
            >
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>

              <div className="flex flex-col items-center justify-center space-y-8 mt-20">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold tracking-widest uppercase transition-colors animate-in slide-in-from-left-8 duration-500 fill-mode-both hover:opacity-80"
                    style={{
                      color: colors.highlight,
                      animationDelay: `${(index + 1) * 100}ms`,
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/e-summit/register"
                  onClick={() => setIsOpen(false)}
                  className="animate-in slide-in-from-left-8 duration-500 fill-mode-both"
                  style={{ animationDelay: "500ms" }}
                >
                  <Button
                    className="text-lg px-8 py-6 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      color: "#fff",
                      boxShadow: "0 0 30px rgba(186, 110, 234, 0.35)",
                    }}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Event Over
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center rotating logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src={justLogo}
              alt="E-Summit Logo"
              className="h-10 md:h-12 w-auto transition-transform"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>

          {/* Right E-Cell logo */}
          <a href="https://ecellrscoe.org" target="_blank" rel="noopener noreferrer" className="z-50">
            <img
              src="/favicon.ico"
              alt="E-Cell RSCOE"
              className="h-8 md:h-10 w-auto hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default ESummitNavbar;
