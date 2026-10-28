import { Mail, MapPin, Instagram, Linkedin , Phone} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card/40">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-stEart">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Connect with the E-Cell Team
            </h2>

            <p className="text-muted-foreground text-lg">
              Reach out to E-Cell RSCOE for collaborations, mentorship requests,
              partnerships, or event-related queries.
            </p>

            <div className="grid gap-4">

              {/* Location */}
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Visit Us</p>
                    <p className="text-sm text-muted-foreground">
                      IIF, JSPM RSCOE, Tathawade, Pune
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Mail className="h-4 w-4" />
    </div>

    <div>
      <p className="text-sm font-medium">Email</p>

      <a
        href="mailto:ecellrscoe01@gmail.com"
        className="text-sm text-blue-500 hover:underline cursor-pointer"
      >
        ecellrscoe01@gmail.com
      </a>
    </div>
  </div>
</div>

{/* Contact Numbers */}
<div className="rounded-2xl border border-border/60 bg-background/70 p-5">
  <div className="flex items-start gap-3">

    {/* Phone Icon */}
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Phone className="h-4 w-4" />
    </div>

    {/* Contact Details */}
    <div className="space-y-3">

      {/* President Contact */}
      <div>
        <p className="text-sm font-medium">
          President Contact
        </p>

        <a
          href="tel:+917796120833"
          className="text-sm text-muted-foreground hover:text-primary transition"
        >
          +91 7796120833
        </a>
      </div>

      {/* General Secretary Contact */}
      <div>
        <p className="text-sm font-medium">
          General Secretary Contact
        </p>

        <a
          href="tel:+919226011153"
          className="text-sm text-muted-foreground hover:text-primary transition"
        >
          +91 9226011153
        </a>
      </div>

    </div>
  </div>
</div>

              {/* Instagram */}
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Instagram className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <a
                      href="https://www.instagram.com/e_cell_rscoe?igsh=MThkejdvZGdyajQ1MQ=="
                      className="text-sm text-blue-500 hover:underline"
                    >
                      @e_cell_rscoe
                    </a>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Linkedin className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/company/rscoe-e-cell/"
                  
                      className="text-sm text-blue-500 hover:underline"
                    >
                      RSCOE E-Cell
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;