import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import ESummitNavbar from "@/components/ESummitNavbar";
import SiteFooter from "@/components/SiteFooter";

const colors = {
  primary: "#2A0640",
  secondary: "#BA6EEA",
  support: "#5E4271",
  background: "#12011D",
  highlight: "#F7EFF9",
} as const;

const agendaByDay = [
  {
    day: "Day 1",
    items: [
      { time: "9:00 AM", title: "Starting of Event" },
      { time: "10:00 AM", title: "Arrival of Guest at IIF" },
      { time: "10:30 AM - 10:45 AM", title: "Arrangement" },
      { time: "10:45 AM - 11:30 AM", title: "Inauguration" },
      { time: "11:30 AM - 12:30 PM", title: "Panel 1 Discussion" },
      { time: "12:30 PM - 1:30 PM", title: "Break" },
      { time: "1:30 PM - 1:45 PM", title: "Arrangements" },
      { time: "1:45 PM - 2:45 PM", title: "Speaker Session (Interview 1)" },
      { time: "3:00 PM - 5:00 PM", title: "Pitch Deck Competition" },
    ],
  },
  {
    day: "Day 2",
    items: [
      { time: "10:00 AM - 11:00 AM", title: "Panel Session 2" },
      { time: "11:00 AM - 11:30 AM", title: "Arrangements" },
      { time: "11:30 AM", title: "Short Break (Snacks)" },
      { time: "11:45 AM - 12:45 PM", title: "Session 2" },
      { time: "12:45 PM - 2:00 PM", title: "Long Break & Startup Expo Competition" },
      { time: "2:15 PM - 3:15 PM", title: "Session 3" },
      { time: "3:15 PM - 3:30 PM", title: "Arrangements" },
      { time: "3:30 PM - 4:30 PM", title: "Session 4" },
      { time: "4:30 PM - 5:00 PM", title: "Farewell Speech" },
    ],
  },

] as const;

type DayFilter = "Day 1" | "Day 2" ;

const dayButtons: DayFilter[] = ["Day 1", "Day 2"];

const ESummitAgenda = () => {
  const [selectedDay, setSelectedDay] = useState<DayFilter>("Day 1");

  const visibleDays = useMemo(
    () => agendaByDay.filter((day) => day.day === selectedDay),
    [selectedDay],
  );

  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <ESummitNavbar />

      <section className="pt-28 pb-20 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border p-6 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.35)]" style={{ borderColor: "rgba(247, 239, 249, 0.18)", background: "rgba(42, 6, 64, 0.72)" }}>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl" style={{ color: colors.highlight }}>
                Agenda
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm md:text-lg" style={{ color: "rgba(247, 239, 249, 0.74)" }}>
                Complete schedule for all three days of E-SUMMIT &apos;26.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {dayButtons.map((day) => {
                const isActive = day === selectedDay;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className="min-w-28 rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-200 md:text-base"
                    style={{
                      borderColor: isActive ? colors.highlight : "rgba(247, 239, 249, 0.3)",
                      background: isActive ? "linear-gradient(135deg, #2A0640, #BA6EEA)" : "rgba(0, 0, 0, 0.28)",
                      color: isActive ? colors.highlight : "rgba(247, 239, 249, 0.9)",
                      boxShadow: isActive ? "0 8px 24px rgba(186, 110, 234, 0.32)" : "none",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 space-y-6">
              {visibleDays.map((day) => (
                <div key={day.day} className="space-y-4">
                  <h2 className="text-2xl font-bold md:text-3xl" style={{ color: colors.highlight }}>
                    {day.day}
                  </h2>

                  <div className="space-y-3 md:space-y-4">
                    {day.items.map((item) => (
                      <div
                        key={`${day.day}-${item.time}-${item.title}`}
                        className="flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:gap-5 md:p-5" style={{ borderColor: "rgba(247, 239, 249, 0.16)", background: "rgba(94, 66, 113, 0.35)" }}
                      >
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold md:min-w-56" style={{ background: "rgba(186, 110, 234, 0.2)" }}>
                          <Clock className="h-4 w-4" style={{ color: colors.highlight }} />
                          <span style={{ color: colors.highlight }}>{item.time}</span>
                        </div>

                        <h3 className="text-base font-semibold md:text-lg" style={{ color: colors.highlight }}>
                          {item.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

export default ESummitAgenda;
