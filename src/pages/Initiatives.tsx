import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const initiatives = [
  "Startup Incubation Support",
  "Founder Mentorship Program",
  "Pitch Practice Sessions",
  "Skill-building Workshops",
];

const Initiatives = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold">Initiatives</h1>
        <p className="mt-6 max-w-3xl text-muted-foreground text-lg">
          Our initiatives are designed to empower students from ideation to execution.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {initiatives.map((initiative) => (
            <li key={initiative} className="glass rounded-xl border border-border/60 p-5 font-medium">
              {initiative}
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Initiatives;
