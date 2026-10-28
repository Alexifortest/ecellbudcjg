import React from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

interface LeadMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface CoreMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const LEADS: LeadMember[] = [
  {
    name: "Sarthak Mehta",
    role: "President",
    image: "/team/sarthak.png",
    linkedin:
      "https://www.linkedin.com/in/sarthak-mehta-9349a630b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Yashraj Ghate",
    role: "General Secretary",
    image: "/team/yashraj.png",
    linkedin:
      "https://www.linkedin.com/in/yashraj-ghate-413035396?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
];

const CORE_MEMBERS: CoreMember[] = [
  {
    id: 1,
    name: "Aayush Deshmukh",
    role: "Event Production & Curation secretary",
    image: "/team/ayush.png",
    linkedin:
      "https://www.linkedin.com/in/ayush-deshmukh-b1251038a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 2,
    name: "Aaryan Ingale",
    role: "PR and Marketing Secretary",
    image: "/team/aaryan.png",
    linkedin:
      "https://www.linkedin.com/in/aaryan-ingale-a1106438a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 3,
    name: "Bhumika Purusharthi",
    role: "PR and Marketing Joint Secretray",
    image: "/team/bhumika.jpeg",
    linkedin:
      "https://www.linkedin.com/in/bhumika-pursharthi-284a1b378?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 4,
    name: "Parth Amilkanthwar",
    role: "Finance Secretary",
    image: "/team/parth.png",
    linkedin:
      "https://www.linkedin.com/in/parth-amilkanthwar-389229317?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 5,
    name: "Gargee Waghmare",
    role: "Graphics Secretary",
    image: "/team/gargee.png",
    linkedin:
      "https://www.linkedin.com/in/gargee-waghmare-4aabbb374?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 6,
    name: "Riya Mankumre",
    role: "Graphics Joint Secretary",
    image: "/team/riya.png",
    linkedin: "https://www.linkedin.com/in/riyamankumare7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 7,
    name: "Samarth Dhatrak",
    role: "Technical Secretary",
    image: "/team/samarth.png",
    linkedin:
      "https://www.linkedin.com/in/samarth-dhatrak-93a38136a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 8,
    name: "Mithali Phadtare",
    role: "Technical Joint Secretary",
    image: "/team/mithali.png",
    linkedin:
      "https://www.linkedin.com/in/mithali-phadtare-a0219a384?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 9,
    name: "Vanshika Thakare",
    role: "Content Secretary",
    image: "/team/vanshika.png",
    linkedin:
      "https://www.linkedin.com/in/vanshika-thakare-810387387?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 10,
    name: "Arnav Vaidya",
    role: "Content Joint Secretary",
    image: "/team/arnav.png",
    linkedin:
      "https://www.linkedin.com/in/arnav-vaidya-609665391?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 11,
    name: "Rohan Kalokhe",
    role: "Social Media Secretary",
    image: "/team/rohan.png",
    linkedin:
      "https://www.linkedin.com/in/rohan-kalokhe-ab0a0826b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 12,
    name: "Aarish Khot",
    role: "Social Media Joint Secretary",
    image: "/team/aarish.png",
    linkedin:
      "https://www.linkedin.com/in/aarish-khot-21bb66255?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="overflow-hidden pt-28 pb-20">
        {/* =========================================
            HERO
        ========================================= */}
        <section className="container mx-auto px-4 text-center">
          <div className="team-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-primary">
              The People Behind The Movement
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Meet Our{" "}
              <span className="team-gradient-text">Team.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Visionaries, creators, strategists and changemakers working
              together to build a stronger entrepreneurial ecosystem at
              E-Cell RSCOE.
            </p>
          </div>

          {/* Quote */}
          <div className="mx-auto mt-10 max-w-3xl team-fade-up-delay">
            <div className="relative px-8 py-5">
              <span className="absolute left-0 top-0 text-5xl font-serif text-primary/30">
                “
              </span>

              <p className="text-lg font-medium italic leading-8 text-foreground/90 sm:text-xl">
                Great things in business are never done by one person.
                They're done by a team of people who believe in the vision.
              </p>

              <span className="absolute bottom-0 right-0 text-5xl font-serif text-primary/30">
                ”
              </span>
            </div>
          </div>
        </section>

        {/* =========================================
            LEADERSHIP
        ========================================= */}
        <section className="container mx-auto mt-20 px-4">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Leadership
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The Vision Behind E-Cell
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Leading with purpose, building with passion and creating
              opportunities for the next generation.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
            {LEADS.map((lead, index) => (
              <div
                key={lead.name}
                className="group relative text-center team-leader-card"
                style={{
                  animationDelay: `${index * 180}ms`,
                }}
              >
                {/* Animated outer glow */}
                <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-60 transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/20" />

                {/* Photo container */}
                <div className="relative mx-auto h-60 w-60 sm:h-64 sm:w-64">
                  {/* Rotating outer ring */}
                  <div className="absolute -inset-3 rounded-full border border-primary/20 team-rotate-ring" />

                  {/* Second decorative ring */}
                  <div className="absolute -inset-1 rounded-full border border-dashed border-primary/40 team-rotate-ring-reverse" />

                  {/* Shine ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/60 via-transparent to-primary/10 p-[3px]">
                    <div className="h-full w-full rounded-full bg-background p-2">
                      <div className="relative h-full w-full overflow-hidden rounded-full">
                        <img
                          src={lead.image}
                          alt={lead.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Image shine */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent team-image-shine" />
                      </div>
                    </div>
                  </div>

                  {/* Floating dots */}
                  <span className="absolute -right-2 top-10 h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(255,255,255,0.5)] team-floating-dot" />
                  <span className="absolute -bottom-1 left-6 h-2 w-2 rounded-full bg-primary/60 team-floating-dot-delay" />
                </div>

                {/* Information */}
                <div className="relative mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    {lead.role}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {lead.name}
                  </h3>

                  <div className="mx-auto mt-4 h-px w-12 bg-primary/50 transition-all duration-500 group-hover:w-24" />

                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                  >
                    <span>LinkedIn</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            CORE TEAM
        ========================================= */}
        <section className="container mx-auto mt-28 px-4">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Core Team
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The Force Behind The Work
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Every idea, event and experience is powered by people who bring
              their own talent and energy to the table.
            </p>
          </div>

          {/* Equal-sized circular member cards */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {CORE_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className="group text-center team-member-card"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {/* Circular photo */}
                <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40">
                  {/* Glow */}
                  <div className="absolute -inset-2 rounded-full bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/20" />

                  {/* Border */}
                  <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary/60 via-border to-transparent p-[2px] transition-all duration-500 group-hover:scale-105">
                    <div className="h-full w-full rounded-full bg-background p-1">
                      <div className="relative h-full w-full overflow-hidden rounded-full">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-all duration-300 group-hover:bg-black/35">
                          <span className="translate-y-3 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            View Profile
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member information */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold sm:text-base">
                    {member.name}
                  </h3>

                  <p className="mx-auto mt-1 max-w-[180px] text-xs leading-5 text-muted-foreground">
                    {member.role}
                  </p>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open LinkedIn profile of ${member.name}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-80 transition-all duration-300 hover:gap-2 hover:opacity-100"
                  >
                    LinkedIn
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            BOTTOM QUOTE
        ========================================= */}
        <section className="container mx-auto mt-28 px-4">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/50 bg-card/40 px-6 py-12 text-center sm:px-12">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <p className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
              "Ideas become impact when{" "}
              <span className="team-gradient-text">people work together.</span>
              "
            </p>

            <p className="relative mt-4 text-sm text-muted-foreground">
              — E-Cell RSCOE
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}