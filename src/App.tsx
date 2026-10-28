import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop"; // Import the scroll helper

import Index from "./pages/Index";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ESummit from "./pages/ESummit";
import ESummitAgenda from "./pages/ESummitAgenda";
import ESummitSponsors from "./pages/ESummitSponsors";
import ESummitSpeakers from "./pages/ESummitSpeakers";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";
import Scanner from "./pages/Scanner";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop /> {/* Forces page to top on every route change */}
        
        <div className="relative min-h-screen">

          {/* =========================================
              BACKGROUND LAYER
          ========================================= */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />

            <div
              className="absolute bottom-0 left-10 h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-3xl animate-float"
              style={{ animationDelay: "-2s" }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          {/* =========================================
              PAGE OPENING EFFECT
          ========================================= */}
          <div className="page-entrance">

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/about" element={ <About/>}/>
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/team" element={<Team />} />
              <Route path="/blogdetails" element={<BlogDetails />} />
              <Route path="/blogs" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/events" element={<Events />} />

              <Route path="/e-summit" element={<ESummit />} />
              <Route path="/esummit" element={<ESummit />} />

              <Route
                path="/e-summit/agenda"
                element={<ESummitAgenda />}
              />

              <Route
                path="/e-summit/sponsors"
                element={<ESummitSponsors />}
              />

              <Route
                path="/e-summit/speakers"
                element={<ESummitSpeakers />}
              />

              <Route
                path="/e-summit/register"
                element={<Register />}
              />

              <Route
                path="/ticket/:ticketId"
                element={<Ticket />}
              />
              
              <Route path="/scanner" element={<Scanner />} />

              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>

          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;