import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { Phone, Mail, Instagram, Youtube, Linkedin, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20 max-w-5xl flex-grow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact E-Cell RSCOE
          </h1>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Reach out to us for collaborations, sponsorships, event queries, and student startup support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Core Leadership Contacts */}
          <div className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold border-b border-border/40 pb-4">
              Core Leadership
            </h2>

            {/* President Contact */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">President Contact</p>
                <a
                  href="tel:+917796120833"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  +91 7796120833
                </a>
              </div>
            </div>

            {/* General Secretary Contact */}
            <div className="flex items-start gap-4 pt-4 border-t border-border/40">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">General Secretary Contact</p>
                <a
                  href="tel:+919226011153"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  +91 9226011153
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Channels & Socials */}
          <div className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold border-b border-border/40 pb-4">
              Direct Channels
            </h2>

            <div className="space-y-5 text-sm">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Us</span>
                  <a 
                    href="mailto:ecellrscoe01@gmail.com" 
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    ecellrscoe01@gmail.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Instagram</span>
                  <a 
                    href="https://www.instagram.com/e_cell_rscoe?igsi=MThkejdvZGdyajQ1MQ==" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    @ecellrscoe
                  </a>
                </div>
              </div>

              {/* YouTube */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">YouTube</span>
                  <a 
                    href="https://www.youtube.com/@E-CellRSCOE" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    @E-CellRSCOE
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">LinkedIn</span>
                  <a 
                    href="https://linkedin.com/company/rscoe-e-cell/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    E-Cell RSCOE
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contact;