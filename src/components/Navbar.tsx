import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  const location = useLocation();
  const navigate = useNavigate();

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
          <div className="hidden md:flex items-center gap-8 font-medium">

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

            {/* BLOG */}
    

          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
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

                  {/* Mobile BLOG */}
                 

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;