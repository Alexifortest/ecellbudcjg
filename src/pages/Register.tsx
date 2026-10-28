import { Link } from "react-router-dom";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const Register = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: colors.background }}>
      <ESummitNavbar />
      <main className="pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 relative">
        <div
          className="absolute top-6 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: colors.secondary }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: colors.support }}
        />

        <section
          className="relative z-10 mx-auto max-w-3xl rounded-3xl border px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-10 sm:py-14"
          style={{
            borderColor: "rgba(247, 239, 249, 0.2)",
            background: "rgba(42, 6, 64, 0.72)",
          }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(186, 110, 234, 0.2)", color: colors.highlight }}>
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <p
            className="mx-auto mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
            style={{ borderColor: "rgba(247, 239, 249, 0.24)", color: colors.highlight }}
          >
            Registration Closed
          </p>

          <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl" style={{ color: colors.highlight }}>
            E-Summit &apos;26 is now over
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-lg" style={{ color: "rgba(247, 239, 249, 0.82)" }}>
            Thank you for being part of E-Summit 2026. Registrations have been disabled as the event has concluded.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border px-4 py-4 text-left sm:px-5" style={{ borderColor: "rgba(247, 239, 249, 0.16)", background: "rgba(94, 66, 113, 0.36)" }}>
            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0" style={{ color: colors.highlight }} />
            <p className="text-sm sm:text-base" style={{ color: "rgba(247, 239, 249, 0.74)" }}>
              We truly appreciate all speakers, attendees, volunteers, and partners for making this summit memorable.
              See you at the next edition.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/e-summit">
              <Button
                size="lg"
                className="font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: "#fff",
                }}
              >
                Back to E-Summit
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                style={{
                  color: colors.highlight,
                  borderColor: "rgba(247, 239, 249, 0.34)",
                }}
              >
                View Gallery
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter variant="esummit" />
      <div className="py-4 text-center text-sm" style={{ color: "rgba(247, 239, 249, 0.56)" }}>
        Created with 💕 by technical team
      </div>
    </div>
  );
};

export default Register;
