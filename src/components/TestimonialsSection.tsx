import React, { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Praful Billore",
    role: "Founder, MBA Chai Wala",
    quote: "The energy, teamwork, and execution at E-Cell RSCOE are phenomenal. Seeing students hustle with such raw passion and professional structure proves that the future of entrepreneurship in India is in great hands.",
    highlight: "Phenomenal Teamwork & Hustle"
  },
  {
    name: "Nikita Vora",
    role: "Startup Mentor & Speaker",
    quote: "It was an absolute stellar experience speaking at the E-Summit. The meticulous planning, high engagement from student founders, and the overall professional management made it one of my favorite speaking engagements.",
    highlight: "Exceptional E-Summit Experience"
  },
  {
    name: "Prachi Shevgaonkar",
    role: "Founder, CoolCrops / Climate Leader",
    quote: "E-Cell RSCOE goes beyond typical college clubs—they are building a true ecosystem of impact. Their dedication to fostering real-world problem solvers and sustainable startups is truly inspiring to witness.",
    highlight: "Building Real-World Impact"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 bg-transparent text-white overflow-hidden">
      {/* Ambient glowing backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            What People Say About Us
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Hear from industry leaders, mentors, and founders who have experienced the energy of E-Cell RSCOE.
          </p>
        </div>

        {/* Testimonial Card Container */}
        <div className="relative p-8 md:p-14 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-all duration-700">
          
          {/* Quote Icon watermark */}
          <div className="absolute top-6 right-8 text-slate-800 font-serif text-7xl select-none pointer-events-none opacity-50">
            “
          </div>

          <div className="min-h-[190px] flex flex-col justify-between">
            {/* Top Text Content with slightly decreased font size */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-5 shadow-inner">
                {testimonials[currentIndex].highlight}
              </span>
              <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed italic mb-8">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>
            </div>

            {/* Bottom Author Section with fixed spacing & letter-spacing */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-slate-800/90 pt-6">
              <div className="space-y-1">
                {/* Fixed name spacing using tracking-wide */}
                <h4 className="text-white font-bold text-lg md:text-xl tracking-wide uppercase">
                  {testimonials[currentIndex].name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <p className="text-blue-400/90 text-xs md:text-sm font-medium tracking-normal">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex items-center gap-2.5 self-start sm:self-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index 
                        ? 'w-10 h-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                        : 'w-3 h-3 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};