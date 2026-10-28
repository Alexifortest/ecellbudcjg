const stats = [
  { label: "Community Members", value: "1,800+" },
  { label: "Founded Around", value: "2020" },
  { label: "Summit Attendees", value: "280+" },
  { label: "Activities Shared", value: "300+" },
];

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-border/40 bg-card/40">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stats-card group relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
              style={{
                animationDelay: `${index * 0.8}s`,
              }}
            >
              {/* Continuous Shine */}
              <div className="stats-shine pointer-events-none absolute inset-0" />

              {/* Soft Glow */}
              <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

              {/* Number */}
              <p className="relative text-3xl font-semibold text-foreground transition-all duration-500 group-hover:text-primary">
                {stat.value}
              </p>

              {/* Label */}
              <p className="relative mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;