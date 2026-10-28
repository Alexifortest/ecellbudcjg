import Navbar from "@/components/Navbar";
import TicketView from "@/components/TicketView";

const Ticket = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <TicketView />
      <div className="py-4 text-center text-sm text-muted-foreground">
        Created with 💕 by technical team
      </div>
    </div>
  );
};

export default Ticket;
