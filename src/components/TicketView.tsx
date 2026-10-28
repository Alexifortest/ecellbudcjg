import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Mail, Home, CheckCircle, Loader2, AlertTriangle, XCircle, RefreshCw, Download } from "lucide-react";
import ecellLogo from "@/assets/ecell-logo.jpg";
import { supabase } from "@/integrations/supabase/client";

interface TicketData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  created_at: string;
  status: string;
}

const yearLabels: Record<string, string> = {
  "1": "First Year",
  "2": "Second Year",
  "3": "Third Year",
  "4": "Fourth Year",
  "pg": "Post Graduate",
};

const TicketView = () => {
  const { ticketId } = useParams();
  const [searchParams] = useSearchParams();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  const handleSaveAsPdf = useCallback(() => {
    window.print();
  }, []);

  const paymentStatus = searchParams.get("payment_status");

  const fetchTicketById = useCallback(async (id: string): Promise<TicketData | null> => {
    const { data, error } = await supabase.rpc("get_ticket_by_id", { ticket_uuid: id });
    if (error) {
      console.error("Error fetching ticket:", error);
      return null;
    }
    if (!data || data.length === 0) return null;
    return data[0] as TicketData;
  }, []);

  useEffect(() => {
    if (!ticketId) {
      setError("No ticket ID provided");
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      const ticketData = await fetchTicketById(ticketId);

      if (!ticketData) {
        setError("Ticket not found");
        setLoading(false);
        return;
      }

      setTicket(ticketData);
      setLoading(false);

      if (paymentStatus === "SUCCESS" && ticketData.status === "pending") {
        setPolling(true);
      }
    };

    fetchTicket();
  }, [ticketId, paymentStatus, fetchTicketById]);

  // Poll for status update when waiting for webhook
  useEffect(() => {
    if (!polling || !ticketId) return;

    let attempts = 0;
    const maxAttempts = 20;

    const interval = setInterval(async () => {
      attempts++;
      const data = await fetchTicketById(ticketId);

      if (data && (data.status === "paid" || data.status === "valid")) {
        setTicket(data);
        setPolling(false);
        clearInterval(interval);
        return;
      }

      if (data && data.status === "failed") {
        setTicket(data);
        setPolling(false);
        clearInterval(interval);
        return;
      }

      if (attempts >= maxAttempts) {
        setPolling(false);
        clearInterval(interval);
        const finalData = await fetchTicketById(ticketId);
        if (finalData) {
          setTicket(finalData);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [polling, ticketId, fetchTicketById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Card className="glass border-border/50 p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">Ticket Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "This ticket doesn't exist or has been removed."}</p>
          <Link to="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (ticket.status === "failed" || paymentStatus === "FAILED") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
            <p className="text-muted-foreground">Your payment could not be processed. Please try again.</p>
          </div>
          <Card className="glass border-border/50 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ticket ID: <span className="font-mono">{ticket.id}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              If money was deducted, it will be refunded within 5-7 business days.
            </p>
            <div className="flex gap-3">
              <Link to="/e-summit/register" className="flex-1">
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (ticket.status === "pending" && polling) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Confirming Payment...</h2>
          <p className="text-muted-foreground">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  if (ticket.status === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Pending</h1>
            <p className="text-muted-foreground">Your payment has not been completed yet.</p>
          </div>
          <Card className="glass border-border/50 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Please complete your payment to receive your ticket.
            </p>
            <div className="flex gap-3">
              <Link to="/e-summit/register" className="flex-1">
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Register Again
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #ticket-printable, #ticket-printable * { visibility: visible !important; }
          #ticket-printable {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 20px !important;
          }
          nav, .no-print { display: none !important; }
        }
      `}</style>
      <div className="w-full max-w-md" id="ticket-printable">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Your ticket has been confirmed. Check your email too!</p>
        </div>
        <Card className="glass border-border/50 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={ecellLogo} alt="E-Cell" className="w-12 h-12 rounded-lg" />
                <div>
                  <h2 className="font-bold text-lg">E-SUMMIT '26</h2>
                  <p className="text-sm text-muted-foreground">E-Cell RSCOE</p>
                </div>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                Paid ✓
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-foreground rounded-xl">
                <QRCodeSVG value={ticket.id} size={180} level="H" includeMargin={false} />
              </div>
            </div>
            <div className="text-center mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ticket ID</p>
              <p className="font-mono text-sm bg-muted/50 rounded px-3 py-2 break-all">{ticket.id}</p>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed border-border" />
              </div>
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Attendee</p>
                  <p className="font-medium">{ticket.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{ticket.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Event Date</p>
                  <p className="font-medium">27 March to 29 March 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="font-medium">RSCOE Auditorium, Pune</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-xs text-center text-muted-foreground">
                📱 Show this QR code at the venue for entry. This ticket is valid for single use only.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3 mt-6 no-print">
          <Button variant="outline" className="flex-1" onClick={handleSaveAsPdf}>
            <Download className="w-4 h-4 mr-2" />
            Save as PDF
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
