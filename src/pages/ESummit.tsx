import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";

import justLogo from "@/assests-esummit/just_logo.png";
import logoWithTitle from "@/assests-esummit/logo_w_title.png";
import openingBg from "@/assests-esummit/opening.jpeg";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const summitStats = [
  { icon: Calendar, text: "27 & 28 March 2026" },
  { icon: MapPin, text: "RSCOE Auditorium" },
  { icon: Users, text: "400+ attendees" },
] as const;

const highlights = [
  {
    title: "Keynote Talks",
    desc: "Insights from founders, operators, and industry leaders building impactful businesses.",
  },
  {
    title: "Startup Pitches",
    desc: "Student teams pitch their ideas and products in front of mentors and investors.",
  },
  {
    title: "Workshops",
    desc: "Practical sessions on product, growth, branding, and execution for early-stage teams.",
  },
] as const;

const ESummit = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = Math.max(0, 1 - scrollY / 650);

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <ESummitNavbar />

      <div className="fixed inset-0 z-0 transition-opacity duration-300" style={{ opacity: bgOpacity }}>
        <img src={openingBg} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18, 1, 29, 0.35) 0%, rgba(42, 6, 64, 0.8) 60%, #12011D 100%)",
          }}
        />
      </div>

      <main className="relative z-10">
        <section className="relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-36">
          <div
            className="absolute -left-28 top-20 h-72 w-72 rounded-full blur-[120px]"
            style={{ background: "rgba(186, 110, 234, 0.38)" }}
          />
          <div
            className="absolute -right-20 bottom-10 h-72 w-72 rounded-full blur-[120px]"
            style={{ background: "rgba(247, 239, 249, 0.2)" }}
          />

          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-12 md:py-16" style={{ borderColor: "rgba(247, 239, 249, 0.22)", background: "rgba(42, 6, 64, 0.72)" }}>
              <img src={logoWithTitle} alt="E-Summit Logo" className="mx-auto mb-8 h-28 w-auto md:h-40" />

              <p
                className="mx-auto mb-3 inline-block rounded-full border px-5 py-2 text-sm font-semibold tracking-wide"
                style={{ borderColor: "rgba(247, 239, 249, 0.28)", background: "rgba(186, 110, 234, 0.2)", color: colors.highlight }}
              >
                Event Concluded
              </p>

              <h1
                className="text-5xl font-extrabold uppercase tracking-tight md:text-8xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.highlight} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                E-Summit <span style={{ color: colors.highlight }}>'26</span>
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed md:text-xl" style={{ color: "rgba(247, 239, 249, 0.84)" }}>
                RSCOE&apos;s flagship entrepreneurship summit where ideas meet execution through talks,
                sessions, and startup showcases.
              </p>

              <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                {summitStats.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center justify-center gap-2 rounded-xl border px-3 py-3"
                    style={{ borderColor: "rgba(247, 239, 249, 0.14)", background: "rgba(94, 66, 113, 0.5)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: colors.highlight }} />
                    <span className="text-sm font-medium" style={{ color: colors.highlight }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/e-summit/register">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base font-bold transition-all duration-300 hover:scale-105 md:text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      color: "#fff",
                      boxShadow: "0 0 28px rgba(186, 110, 234, 0.35)",
                    }}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Registrations Closed
                  </Button>
                </Link>
                <Link to="/e-summit/agenda">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 bg-transparent px-8 text-base font-semibold md:text-lg"
                    style={{ color: colors.highlight, borderColor: "rgba(247, 239, 249, 0.35)" }}
                  >
                    View Agenda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "rgba(42, 6, 64, 0.88)" }}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold md:text-5xl" style={{ color: colors.highlight }}>
                What is E-Summit?
              </h2>
              <p className="mt-6 text-base leading-relaxed md:text-lg" style={{ color: "rgba(247, 239, 249, 0.76)" }}>
                E-Summit is E-Cell RSCOE&apos;s three-day entrepreneurship experience that brings students,
                founders, and mentors together for meaningful learning and collaboration.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "rgba(94, 66, 113, 0.2)" }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold md:text-5xl" style={{ color: colors.highlight }}>
              Summit Highlights
            </h2>
            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1"
                  style={{ borderColor: "rgba(247, 239, 249, 0.15)", background: "rgba(42, 6, 64, 0.72)" }}
                >
                  <h3 className="text-xl font-bold" style={{ color: colors.highlight }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "rgba(247, 239, 249, 0.72)" }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: colors.primary }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <img src={justLogo} alt="E-Summit Logo Mark" className="mx-auto mb-8 h-16 w-auto opacity-85 md:h-20" />
            <h2 className="text-3xl font-bold md:text-5xl" style={{ color: colors.highlight }}>
              Thank You for Being Part of E-Summit 2026
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg" style={{ color: "rgba(247, 239, 249, 0.72)" }}>
              We are grateful for the amazing participation and support from our community.
              Registrations are closed as the event has ended.
            </p>
            <Link to="/e-summit/register" className="mt-8 inline-block">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-bold transition-all duration-300 hover:scale-105 md:text-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: "#fff",
                  boxShadow: "0 0 36px rgba(186, 110, 234, 0.35)",
                }}
              >
                <Ticket className="mr-2 h-5 w-5" />
                Thank You for Joining E-Summit '26
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <div className="relative z-10 py-4 text-center text-sm" style={{ color: "rgba(247, 239, 249, 0.56)" }}>
        Created with 💕 by Technical Team
      </div>
    </div>
  );
};

export default ESummit;
