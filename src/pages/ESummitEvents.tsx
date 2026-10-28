import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";
import { Rocket, Lightbulb, Trophy, Mic2, Users, Wrench } from "lucide-react";

const events = [
  {
    title: "Startup Pitch Competition",
    description: "Pitch your startup idea to a panel of investors and win funding, mentorship, and incubation support.",
    icon: Rocket,
    tag: "Competition",
  },
  {
    title: "Ideathon",
    description: "A rapid-fire idea generation challenge where teams brainstorm innovative solutions to real-world problems.",
    icon: Lightbulb,
    tag: "Competition",
  },
  {
    title: "Keynote Talks",
    description: "Hear from industry leaders, successful founders, and inspiring personalities sharing their journeys.",
    icon: Mic2,
    tag: "Talk",
  },
  {
    title: "Business Quiz",
    description: "Test your knowledge of the business world in this fast-paced and exciting quiz competition.",
    icon: Trophy,
    tag: "Competition",
  },
  {
    title: "Networking Mixer",
    description: "Connect with like-minded peers, mentors, and investors in a structured networking session.",
    icon: Users,
    tag: "Networking",
  },
  {
    title: "Product Building Workshop",
    description: "A hands-on workshop on building MVPs, validating ideas, and achieving product-market fit.",
    icon: Wrench,
    tag: "Workshop",
  },
];

const ESummitEvents = () => {
  return (
    <div className="min-h-screen" style={{ background: "#35043F" }}>
      <ESummitNavbar />

      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "#ECBDFD" }}>
              Events
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(236, 189, 253, 0.6)" }}>
              Competitions, workshops, and experiences designed to fuel your entrepreneurial spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.title}
                  className="p-8 rounded-3xl backdrop-blur-xl transition-all hover:scale-[1.02] group"
                  style={{
                    background: "rgba(53, 4, 63, 0.6)",
                    border: "1px solid rgba(236, 189, 253, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-2xl transition-colors"
                      style={{ background: "rgba(181, 49, 247, 0.15)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "#B531F7" }} />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: "rgba(181, 49, 247, 0.15)",
                        color: "#B531F7",
                      }}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#ECBDFD" }}>
                    {event.title}
                  </h3>
                  <p style={{ color: "rgba(236, 189, 253, 0.6)" }}>{event.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ESummitEvents;
