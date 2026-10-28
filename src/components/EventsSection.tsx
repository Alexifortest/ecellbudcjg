import { CalendarDays, MapPin, Rocket, Users, Briefcase, Mic2 } from "lucide-react";

const events = [
  {
    title: "E-Summit '26",
    date: "27 March to 29 March 2026",
    location: "RSCOE Pune, Tathawade",
    description: "The upcoming edition of our flagship summit, bridging campus innovation with corporate insight.",
    icon: <Rocket className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Startup Pitch Desk",
    date: "Action-Oriented",
    location: "Innovation Ecosystem",
    description: "Pitching ideas directly to a panel of founders and investors for real-world fundraising experience.",
    icon: <Users className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Keynote Series",
    date: "Annual Legacy",
    location: "RSCOE Auditorium",
    description: "Learning mindset and resilience from legends like Murlikant Petkar and brand building from Praful Billore.",
    icon: <Mic2 className="h-4 w-4 text-blue-500" />,
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 font-bold">Our Legacy</p>
          <h2 className="text-4xl md:text-5xl font-black mt-3 uppercase tracking-tighter">
            Proven <span className="italic text-blue-500">Experiences.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
            Decoding the success of our initiatives that create exposure, learning, and high-impact networking for student founders.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.title} className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300 group">
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                {event.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight">{event.title}</h3>
              <p className="mt-4 text-gray-400 leading-relaxed">{event.description}</p>
              
              <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <CalendarDays className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;