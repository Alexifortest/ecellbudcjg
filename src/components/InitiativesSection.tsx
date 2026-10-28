import { ShieldCheck, Target, TrendingUp, Presentation } from "lucide-react";

const initiatives = [
  {
    icon: ShieldCheck,
    title: "Legal & Compliance",
    description: "Foundational sessions on startup legalities and compliance to ensure a strong business base.",
  },
  {
    icon: Target,
    title: "Resilience & Mindset",
    description: "Keynote talks focused on mental toughness and customer-centric brand building.",
  },
  {
    icon: TrendingUp,
    title: "Market Strategy",
    description: "Practical guidance from industry practitioners on scaling and market penetration.",
  },
  {
    icon: Presentation,
    title: "Investment Pitching",
    description: "Simulating real-world fundraising pressure with feedback from professional investors.",
  },
];

const InitiativesSection = () => {
  return (
    <section id="initiatives" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Focus Areas</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Cultivating Startup Knowledge</h2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Bridging campus innovation with corporate insight through structured mentorship and expert-led sessions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {initiatives.map((initiative) => (
            <div key={initiative.title} className="rounded-2xl border border-border/60 bg-card/70 p-6 transition hover:border-primary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <initiative.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{initiative.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{initiative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;