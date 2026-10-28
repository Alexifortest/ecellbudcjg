import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ScanLine, CheckCircle, XCircle, AlertCircle, Search, User, Mail, GraduationCap, Camera, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { QrReader } from "react-qr-reader";

interface ScanResult {
  status: "valid" | "scanned" | "invalid";
  ticket?: {
    fullName: string;
    email: string;
    college: string;
    ticketId: string;
  };
  message: string;
}

interface QRScannerProps {
  scannerPassword: string;
}

const QRScanner = ({ scannerPassword }: QRScannerProps) => {
  const [ticketId, setTicketId] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const isMobile = useIsMobile();

  const handleScan = async (scannedId?: string) => {
    const idToProcess = scannedId || ticketId;

    if (!idToProcess.trim()) {
      toast.error("Please enter a ticket ID");
      return;
    }

    if (scannedId) {
      setTicketId(scannedId);
    }

    setIsScanning(true);
    setResult(null);
    setShowCamera(false);

    try {
      const { data, error } = await supabase.functions.invoke("scan-ticket", {
        body: {
          action: "scan",
          scannerPassword,
          ticketId: idToProcess.trim(),
        },
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || "Scan failed");
      }

      setResult(data.result);
      if (data.result.status === "valid") {
        toast.success("Ticket Verified Successfully!");
      }
    } catch (error: any) {
      console.error("Scan error:", error);
      setResult({
        status: "invalid",
        message: error.message || "Error validating ticket. Please try again.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const onCameraResult = (result: any, error: any) => {
    if (result) {
      handleScan(result?.text);
    }
  };

  const resetScanner = () => {
    setTicketId("");
    setResult(null);
    setShowCamera(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "valid":
        return { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/20", borderColor: "border-green-500" };
      case "scanned":
        return { icon: AlertCircle, color: "text-yellow-500", bgColor: "bg-yellow-500/20", borderColor: "border-yellow-500" };
      default:
        return { icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/20", borderColor: "border-red-500" };
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ScanLine className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Ticket Scanner</h1>
          <p className="text-muted-foreground">Scan or enter ticket ID to validate entry</p>
        </div>

        {isMobile && showCamera && (
          <Card className="mb-6 overflow-hidden border-primary/50 bg-black/90">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-base">Point Camera at QR Code</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setShowCamera(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 relative aspect-square">
              <QrReader
                onResult={onCameraResult}
                constraints={{ facingMode: "environment" }}
                className="w-full h-full object-cover"
                videoContainerStyle={{ paddingTop: "100%" }}
                videoStyle={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 border-[30px] border-black/50 pointer-events-none">
                <div className="w-full h-full border-2 border-primary/50 relative">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Enter Ticket ID</CardTitle>
            <CardDescription>Paste the ticket UUID or scan the QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter ticket ID (UUID)"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="bg-background/50 font-mono"
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
                <Button onClick={() => handleScan()} disabled={isScanning} className="glow shrink-0">
                  {isScanning ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {isMobile && !showCamera && (
                <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10" onClick={() => setShowCamera(true)}>
                  <Camera className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`glass border-2 ${getStatusConfig(result.status).borderColor} overflow-hidden animate-in fade-in slide-in-from-bottom-4`}>
            <div className={`${getStatusConfig(result.status).bgColor} p-6`}>
              <div className="flex items-center justify-center gap-3">
                {(() => {
                  const StatusIcon = getStatusConfig(result.status).icon;
                  return <StatusIcon className={`w-12 h-12 ${getStatusConfig(result.status).color}`} />;
                })()}
              </div>
              <h2 className={`text-2xl font-bold text-center mt-3 ${getStatusConfig(result.status).color}`}>
                {result.status === "valid" ? "ACCESS GRANTED" : result.status === "scanned" ? "DUPLICATE ENTRY" : "ACCESS DENIED"}
              </h2>
              <p className="text-center text-muted-foreground mt-1">{result.message}</p>
            </div>
            {result.ticket && (
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{result.ticket.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{result.ticket.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">College</p>
                      <p className="font-medium">{result.ticket.college}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
            <div className="p-4 border-t border-border/50">
              <Button onClick={resetScanner} variant="outline" className="w-full">
                Scan Another Ticket
              </Button>
            </div>
          </Card>
        )}

        <Card className="glass border-border/50 mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Scanner Instructions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span><strong>Green (Valid):</strong> First-time entry - allow access</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                <span><strong>Yellow (Scanned):</strong> Already used - deny entry</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5" />
                <span><strong>Red (Invalid):</strong> Not found - deny entry</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;
