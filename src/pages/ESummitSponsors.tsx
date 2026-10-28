import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";
import { Handshake } from "lucide-react";

// Importing sponsor logos from the assets folder
import sportLogo from "@/assests-esummit/sponsers/sport foundation logo.png";
import mediaLogo from "@/assests-esummit/sponsers/The Entrepreneurs of India logo.png";
import chocLogo from "@/assests-esummit/sponsers/chocolate origin logo.png";
import bxiLogo from "@/assests-esummit/sponsers/BXI(Berter Exchange of India).jpeg";
import tastyLogo from "@/assests-esummit/sponsers/Tasty Bites logo.jpeg";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const sponsorTiers = [
  {
    tier: "Title Sponsor",
    sponsors: [
      { 
        name: "Anup More Social and Sports Foundation", 
        logo: sportLogo 
      }
    ],
  },
  {
    tier: "Media Partner",
    sponsors: [
      { 
        name: "The Enterpreneur of India", 
        logo: mediaLogo 
      }
    ],
  },
  {
    tier: "Event Partners",
    sponsors: [
      { 
        name: "D Chocoholicx", 
        logo: chocLogo 
      },
      { 
        name: "BXI (Barter Exchange of India)", 
        logo: bxiLogo 
      },
      { 
        name: "Tasty Bites", 
        logo: tastyLogo 
      },
    ],
  },
];

const ESummitSponsors = () => {
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <ESummitNavbar />

      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.highlight }}>
              Sponsors
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(247, 239, 249, 0.72)" }}>
              E-Summit '26 is powered by visionary partners who believe in student entrepreneurship.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {sponsorTiers.map((tier) => (
              <div key={tier.tier} className="text-center">
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest" style={{ color: colors.secondary }}>
                  {tier.tier}
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {tier.sponsors.map((sponsor, i) => (
                    <div
                      key={i}
                      className="w-64 h-48 flex flex-col items-center justify-center rounded-2xl backdrop-blur-xl transition-all hover:scale-105 p-6"
                      style={{
                        background: "rgba(94, 66, 113, 0.3)",
                        border: "1px solid rgba(247, 239, 249, 0.12)",
                      }}
                    >
                      {sponsor.logo ? (
                        <img 
                          src={sponsor.logo} 
                          alt={sponsor.name} 
                          className="max-h-24 w-auto object-contain mb-4 filter brightness-110"
                        />
                      ) : (
                        <Handshake className="w-10 h-10 mb-3" style={{ color: "rgba(247, 239, 249, 0.3)" }} />
                      )}
                      <span className="text-sm font-medium text-center" style={{ color: "rgba(247, 239, 249, 0.8)" }}>
                        {sponsor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <p className="text-lg mb-4" style={{ color: "rgba(247, 239, 249, 0.72)" }}>
              Interested in sponsoring E-Summit '26?
            </p>
            <a
              href="mailto:ecellrscoe01@gmail.com"
              className="inline-block px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: "0 0 30px rgba(186, 110, 234, 0.35)",
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/*<SiteFooter variant="esummit" />
      <div className="py-4 text-center text-sm" style={{ color: "rgba(247, 239, 249, 0.56)" }}>
        Created with 💕 by technical team
      </div>*/}
    </div>
  );
};

export default ESummitSponsors;