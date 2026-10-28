import { useState } from "react";
import Navbar from "@/components/Navbar";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Scanner = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scannerPassword, setScannerPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.functions.invoke("scan-ticket", {
        body: { action: "authenticate", scannerPassword },
      });

      if (error) throw error;

      if (data?.success) {
        setIsAuthenticated(true);
        toast.success("Login successful! Welcome to the Scanner Console.");
      } else {
        toast.error(data?.error || "Invalid password");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-32 pb-12 px-4">
          <Card className="glass w-full max-w-md border-border/50">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Scanner Login</CardTitle>
              <CardDescription>
                Authorized personnel only. Enter the scanner password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Scanner Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter scanner password"
                    value={scannerPassword}
                    onChange={(e) => setScannerPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full glow mt-2" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                  ) : (
                    "Access Scanner"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 rounded-2xl border border-border/60 bg-card/70 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold">Scanner Console</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Authorized access. Scan tickets to verify entry.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAuthenticated(false);
                  setScannerPassword("");
                }}
                className="text-xs"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        <QRScanner scannerPassword={scannerPassword} />
      </div>
      <div className="py-4 text-center text-sm text-muted-foreground">
        Created with 💕 by technical team
      </div>
    </div>
  );
};

export default Scanner;
