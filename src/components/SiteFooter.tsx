import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#0a0d14] text-[#8a8f9d] border-t border-[#1e2330] pt-12 pb-8 px-4 transition-colors z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="inline-block text-xl font-bold text-white tracking-tight">
            E-Cell <span className="text-primary">RSCOE</span>
          </Link>
          <p className="text-sm leading-relaxed text-[#8a8f9d]">
            Fostering innovation, incubation, and entrepreneurial mindset among young minds at RSCOE.
          </p>
          
          {/* Social Links with Icons */}
          <div className="relative flex items-center gap-3 pt-2 z-50 pointer-events-auto">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/rscoe-e-cell/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-[#141824] border border-[#23293a] flex items-center justify-center text-white hover:bg-primary hover:border-primary transition cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/e_cell_rscoe?igsi=MThkejdvZGdyajQ1MQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#141824] border border-[#23293a] flex items-center justify-center text-white hover:bg-primary hover:border-primary transition cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@e-cellrscoe?si=qJA25JZALRDefJ3p"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-[#141824] border border-[#23293a] flex items-center justify-center text-white hover:bg-primary hover:border-primary transition cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition block py-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white transition block py-1">
                Initiatives & Events
              </Link>
            </li>
            <li>
              <Link to="/team" className="hover:text-white transition block py-1">
                Our Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition block py-1">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Major Initiatives */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Initiatives
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/events#fish-tank" className="hover:text-white transition block py-1">
                Fish Tank
              </Link>
            </li>
            <li>
              <Link to="/events#brand-sprint" className="hover:text-white transition block py-1">
                Brand Sprint
              </Link>
            </li>
            <li>
              <Link to="/events#startup-arena" className="hover:text-white transition block py-1">
                Start-Up Arena
              </Link>
            </li>
            <li>
              <Link to="/esummit" className="hover:text-white transition block py-1">
                E-Summit
              </Link>
            </li>
          </ul>
        </div>

        {/* Join Our Community */}
        <div className="space-y-4 p-5 rounded-2xl bg-[#121623] border border-[#23293a]">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            Join Our Community
          </h3>
          <p className="text-xs text-[#8a8f9d] leading-relaxed">
            Get instant updates on upcoming workshops, startup hackathons, and exclusive networking sessions.
          </p>
          <a
            href="https://chat.whatsapp.com/HlJBzfJSv1mJI4s33xkYgg?s=cl&p=a&mlu=4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-md shadow-emerald-950/40 cursor-pointer"
          >
            <span>Join WhatsApp Group</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-6xl mx-auto pt-6 border-t border-[#1e2330] flex flex-col sm:flex-row items-center justify-between text-xs text-[#626779] gap-3">
        <p>© {new Date().getFullYear()} E-Cell RSCOE. All rights reserved.</p>
      </div>
    </footer>
  );
}