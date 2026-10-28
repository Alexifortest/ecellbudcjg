import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";
import { Youtube, Instagram } from "lucide-react";

import speaker1 from "@/assests-esummit/speakers/speaker 1.png";
import speaker2 from "@/assests-esummit/speakers/speaker 2.png";
import speaker3 from "@/assests-esummit/speakers/speaker 3.png";
import speaker4 from "@/assests-esummit/speakers/speaker 4.png";
import speaker5 from "@/assests-esummit/speakers/speaker 5.png";
import speaker6 from "@/assests-esummit/speakers/speaker 6.png";
import speaker7 from "@/assests-esummit/speakers/speaker 7.png";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const speakers = [
  {
    name: "Vanshika Pandey",
    image: speaker1,
    bio: "A leading voice in Tech & AI, simplifying what most people find overwhelming.",
    youtube: "https://www.youtube.com/@vanshikaxpandey",
    instagram: "https://www.instagram.com/codecrookshanks/",
  },
  {
    name: "Kamakshi Barve",
    image: speaker2,
    bio: "Founder of Barva Skin Therapie, building a brand that focuses on real skin and real solutionsFrom building her own skincare brand to educating people on mindful skincare,her journey is all about confidence and care. ",
    youtube: "https://www.youtube.com/@BarvaSkincare",
    instagram: "https://www.facebook.com/BarvaSkinTherapie",
  },
  {
    name: "Prachi Shevgaonkar",
    image: speaker3,
    bio: "Founder of Cool The Globe and seen on Shark Tank.At a time when everyone talks about climate change, she’s the one actually building solutions and getting people to take action.From starting a global movement to standing on the Shark Tank stage,her journey is all about purpose, consistency, and real impact.",
    youtube: "https://youtu.be/UUkNwqc5a_0?si=6yECpk5EwWUUckc9",
    instagram: "https://www.instagram.com/prachishevgaonkar/",
  },
  {
    name: "CA Meher Kaur",
    image: speaker4,
    bio: "A voice that is simplifying finance, careers, and everything in between. In a space that often feels complex and overwhelming, she’s the one breaking it down into things you can actually understand and apply.",
    youtube: "https://www.youtube.com/@CAMeherKaur",
    instagram: "https://www.instagram.com/meheronmmoney/",
  },
  {
    name: "Pooja Patel",
    image: speaker5,
    bio: "A finance expert guiding individuals towards smarter financial decisions. In a world where money management is often ignored,she is the one simplifying it and making it actually understandable.",
    youtube: "https://www.youtube.com/@Profittiger",
    instagram: "https://www.instagram.com/poojapatelcfp",
  },
  {
    name: "Nikita Vora",
    image: speaker6,
    bio: "Founder of SHELeads India.In a world where leadership spaces are evolving,she’s the one helping women step up, speak up, and lead.",
    youtube: "https://in.linkedin.com/in/nikitavora",
    instagram: "https://indianexpress.com/article/cities/pune/pune-inc-meet-the-pune-entrepreneur-helping-women-build-and-scale-businesses-10423123/",
  },
  {
    name: "Captain Ritu Singh",
    image: speaker7,
    bio: "A Leader who represents strength, resilience, and real grit. In a world full of comfort zones,she’s the one who chose challenges and grew stronger through them.From serving with dedication to inspiring countless individuals , her journey is all about pushing limits and rising above them.",
    youtube: "https://youtu.be/4nuwp3hEadE?si=W9-d3zasqRmyRTj4",
    instagram: "https://www.instagram.com/speak.with.power/",
  },
];

const ESummitSpeakers = () => {
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <ESummitNavbar />

      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ color: colors.highlight }}
            >
              Speakers
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(247, 239, 249, 0.72)" }}
            >
              Hear from industry leaders, founders, and changemakers who are
              shaping the future of entrepreneurship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="rounded-3xl backdrop-blur-xl overflow-hidden transition-all hover:scale-[1.02] group"
                style={{
                  background: "rgba(42, 6, 64, 0.68)",
                  border: "1px solid rgba(247, 239, 249, 0.12)",
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: colors.highlight }}
                    >
                      {speaker.name}
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href={speaker.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:opacity-80"
                        style={{ color: colors.secondary }}
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                      <a
                        href={speaker.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:opacity-80"
                        style={{ color: colors.secondary }}
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247, 239, 249, 0.72)" }}
                  >
                    {speaker.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter variant="esummit" />
      <div className="py-4 text-center text-sm" style={{ color: "rgba(247, 239, 249, 0.56)" }}>
        Created with 💕 by technical team
      </div>
    </div>
  );
};

export default ESummitSpeakers;
