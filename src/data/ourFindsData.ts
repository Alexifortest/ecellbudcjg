export interface CompanyFind {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  founded: string;
  accent: string;
  borderGlow: string;
  about: string;
  metrics: { label: string; value: string }[];
  gallery: {
    title: string;
    description: string;
    gradient: string;
    tag: string;
  }[];
  founder: {
    name: string;
    role: string;
    affiliation: string;
    bio: string;
    avatarUrl?: string;
    initials: string;
    linkedin?: string;
  };
  website?: string;
}

export const ourFindsCompanies: CompanyFind[] = [
  {
    id: "learnx",
    name: "LearnX",
    tagline: "Experiential Tech Education & Peer Learning Platform",
    category: "EdTech & Developer Ecosystem",
    badge: "Featured RSCOE Venture",
    founded: "2023",
    accent: "from-cyan-500 via-blue-500 to-indigo-600",
    borderGlow: "shadow-[0_0_35px_rgba(6,182,212,0.35)]",
    about: "Founded by E-Cell RSCOE member Parth Amilkanthwar, LearnX is an experiential peer-learning platform built to bridge the gap between academic curriculum and high-velocity engineering roles. It pairs hands-on micro-cohorts with project sprints guided by industry engineers.",
    metrics: [
      { label: "Active Student Learners", value: "5,000+" },
      { label: "Hands-on Project Sprints", value: "60+" },
      { label: "Curriculum Completion Rate", value: "92%" },
      { label: "Community Builders", value: "1,200+" }
    ],
    gallery: [
      {
        title: "Sprint Sandbox & Code Review",
        description: "Interactive real-time workspace where student teams collaborate on production-ready repositories.",
        gradient: "from-cyan-900/60 to-blue-950/80",
        tag: "Core Platform"
      },
      {
        title: "Micro-Cohort Roadmaps",
        description: "Structured 6-week intensive tracks spanning Full-Stack, AI Engineering, and Cloud Architecture.",
        gradient: "from-indigo-900/60 to-purple-950/80",
        tag: "Curriculum"
      },
      {
        title: "Industry Mentor Arena",
        description: "Weekly 1-on-1 architecture reviews and mock interview debriefs with senior tech leads.",
        gradient: "from-blue-900/60 to-cyan-950/80",
        tag: "Mentorship"
      }
    ],
    founder: {
      name: "Parth Amilkanthwar",
      role: "Founder & Lead Architect",
      affiliation: "E-Cell RSCOE Core Member & Innovator",
      initials: "PA",
      bio: "Passionate developer, educator, and builder. Nurtured within the entrepreneurial culture of E-Cell RSCOE, Parth recognized the need for hands-on, community-driven skill acceleration and engineered LearnX to empower thousands of aspiring engineers.",
      linkedin: "https://www.linkedin.com/in/parth-amilkanthwar/"
    },
    website: "https://learnx.in"
  },
  {
    id: "devcraft",
    name: "DevCraft Studio",
    tagline: "High-Velocity MVP Engineering & SaaS Incubator",
    category: "SaaS & Product Studio",
    badge: "Alumni Venture",
    founded: "2022",
    accent: "from-purple-500 via-pink-500 to-rose-600",
    borderGlow: "shadow-[0_0_35px_rgba(168,85,247,0.35)]",
    about: "Founded by RSCOE E-Cell alumni, DevCraft is a digital engineering studio partnering with early-stage venture founders across India to design, validate, and ship production-grade MVPs within 30 days.",
    metrics: [
      { label: "MVPs Shipped to Market", value: "22+" },
      { label: "Client Funding Facilitated", value: "₹2.1Cr+" },
      { label: "Active Enterprise Clients", value: "14+" },
      { label: "Average Delivery Time", value: "28 Days" }
    ],
    gallery: [
      {
        title: "Rapid MVP Deployment Pipeline",
        description: "Standardized microservice boilerplate that cuts prototype development cycles by 60%.",
        gradient: "from-purple-900/60 to-pink-950/80",
        tag: "Architecture"
      },
      {
        title: "Founder Analytics Dashboard",
        description: "Real-time telemetry and user conversion tracking built for early-stage validation.",
        gradient: "from-pink-900/60 to-rose-950/80",
        tag: "Product Suite"
      }
    ],
    founder: {
      name: "Aryan Deshmukh",
      role: "Co-Founder & Chief Architect",
      affiliation: "Former E-Cell RSCOE Technical Lead (Alumni)",
      initials: "AD",
      bio: "Serial hackathon winner and full-stack technologist. Led technical infrastructure at RSCOE E-Cell before launching DevCraft Studio to solve the engineering bottleneck for emerging startups.",
      linkedin: "https://www.linkedin.com"
    },
    website: "https://devcraft.io"
  },
  {
    id: "ecosphere",
    name: "EcoSphere Solutions",
    tagline: "Circular Packaging & AI Carbon Life-Cycle Tracking",
    category: "ClimateTech & Clean Packaging",
    badge: "Fish Tank Winner",
    founded: "2023",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    borderGlow: "shadow-[0_0_35px_rgba(16,185,129,0.35)]",
    about: "Incubated through RSCOE E-Cell's Fish Tank pitch competition, EcoSphere supplies circular packaging manufactured from agricultural byproducts, paired with a carbon lifecycle intelligence engine.",
    metrics: [
      { label: "D2C Brands Partnered", value: "48+" },
      { label: "Plastic Diverted from Waste", value: "32 Tons" },
      { label: "Carbon Offsets Logged", value: "110 MT" },
      { label: "Campus Incubation Cohort", value: "2023 Batch" }
    ],
    gallery: [
      {
        title: "Agri-Waste Packaging Line",
        description: "100% biodegradable, water-resistant protective shipping materials.",
        gradient: "from-emerald-900/60 to-teal-950/80",
        tag: "Material Science"
      },
      {
        title: "Carbon Accounting Dashboard",
        description: "Automated carbon footprint reporting for direct-to-consumer online merchants.",
        gradient: "from-teal-900/60 to-cyan-950/80",
        tag: "SaaS Engine"
      }
    ],
    founder: {
      name: "Tanvi Kulkarni",
      role: "Founder & Materials Director",
      affiliation: "Former Head of Initiatives, E-Cell RSCOE",
      initials: "TK",
      bio: "Chemical engineer and sustainability advocate. Leveraged the RSCOE incubation lab to prototype compostable materials, pitching and winning top honours at regional startup summits.",
      linkedin: "https://www.linkedin.com"
    },
    website: "https://ecosphere.eco"
  }
];
