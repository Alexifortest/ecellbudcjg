import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SCANNER_PASSWORD = Deno.env.get("SCANNER_PASSWORD");
    if (!SCANNER_PASSWORD) {
      throw new Error("Scanner password not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration missing");
    }

    const { action, scannerPassword, ticketId } = await req.json();

    // Validate scanner password
    if (!scannerPassword || scannerPassword !== SCANNER_PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid scanner password" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (action === "authenticate") {
      // Just validate password - already done above
      return new Response(
        JSON.stringify({ success: true, message: "Authenticated" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "scan") {
      if (!ticketId || typeof ticketId !== "string" || ticketId.trim().length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid ticket ID" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Fetch ticket
      const { data: ticket, error: fetchError } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", ticketId.trim())
        .maybeSingle();

      if (fetchError) {
        console.error("Fetch error:", fetchError);
        return new Response(
          JSON.stringify({ success: false, error: "Database error" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (!ticket) {
        return new Response(
          JSON.stringify({
            success: true,
            result: {
              status: "invalid",
              message: "Invalid ticket. No matching record found.",
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (ticket.status === "scanned") {
        return new Response(
          JSON.stringify({
            success: true,
            result: {
              status: "scanned",
              ticket: {
                fullName: ticket.full_name,
                email: ticket.email,
                college: ticket.college,
                ticketId: ticket.id,
              },
              message: "This ticket has already been used!",
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (ticket.status !== "paid" && ticket.status !== "valid") {
        return new Response(
          JSON.stringify({
            success: true,
            result: {
              status: "invalid",
              message: `Ticket status is '${ticket.status}'. Only paid tickets can be scanned.`,
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Mark as scanned
      const { error: updateError } = await supabase
        .from("tickets")
        .update({ status: "scanned", scanned_at: new Date().toISOString() })
        .eq("id", ticket.id);

      if (updateError) {
        console.error("Update error:", updateError);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to update ticket" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          result: {
            status: "valid",
            ticket: {
              fullName: ticket.full_name,
              email: ticket.email,
              college: ticket.college,
              ticketId: ticket.id,
            },
            message: "Access Granted! Welcome to E-Summit '26",
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Scan ticket error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
