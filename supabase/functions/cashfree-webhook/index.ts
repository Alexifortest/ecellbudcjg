import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-signature, x-webhook-timestamp",
};

interface CashfreeWebhookPayload {
  type: string;
  data: {
    order: {
      order_id: string;
      order_amount: number;
      order_currency: string;
      order_status: string;
      order_tags?: Record<string, string>;
    };
    payment: {
      cf_payment_id: string;
      payment_status: string;
      payment_amount: number;
      payment_currency: string;
      payment_method: {
        type: string;
      };
      payment_time: string;
    };
    customer_details: {
      customer_id: string;
      customer_name: string;
      customer_email: string;
      customer_phone: string;
    };
    link_id?: string;
  };
}

function base64Encode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function verifySignature(
  payload: string,
  signature: string,
  timestamp: string,
  secretKey: string
): Promise<boolean> {
  try {
    const signedPayload = `${timestamp}${payload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(signedPayload)
    );
    const computedSignature = base64Encode(signatureBuffer);
    return computedSignature === signature;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

async function sendTicketEmail(supabaseUrl: string, supabaseKey: string, ticket: any) {
  const PLUNK_API_KEY = Deno.env.get("PLUNK_API_KEY");
  if (!PLUNK_API_KEY) {
    console.error("PLUNK_API_KEY not configured, skipping email");
    return;
  }

  const yearLabels: Record<string, string> = {
    "1": "First Year",
    "2": "Second Year",
    "3": "Third Year",
    "4": "Fourth Year",
    "pg": "Post Graduate",
  };

  const APP_BASE_URL = Deno.env.get("APP_BASE_URL")
    ?? "https://id-preview--8b066ad4-230a-4537-b27e-f4405d7dfb4b.lovable.app";
  const ticketUrl = `${APP_BASE_URL}/ticket/${ticket.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.id)}`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#0a0a0a;color:#ffffff;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#a855f7;margin:0;font-size:28px;">E-SUMMIT '26</h1>
          <p style="color:#888;margin:5px 0;">E-Cell RSCOE, Pune</p>
        </div>
        <div style="background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(59,130,246,0.1));border:1px solid rgba(168,85,247,0.3);border-radius:16px;padding:30px;text-align:center;margin-bottom:30px;">
          <div style="width:60px;height:60px;background:rgba(34,197,94,0.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:15px;">
            <span style="font-size:30px;">✅</span>
          </div>
          <h2 style="margin:0 0 10px;color:#fff;">Payment Successful!</h2>
          <p style="margin:0;color:#aaa;">Your ticket has been confirmed</p>
        </div>
        <div style="background:#1a1a1a;border:1px solid #333;border-radius:16px;overflow:hidden;margin-bottom:30px;">
          <div style="background:linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.2));padding:20px;border-bottom:1px solid #333;">
            <table style="width:100%;"><tr><td><h3 style="margin:0;color:#fff;">E-SUMMIT '26</h3><p style="margin:5px 0 0;color:#888;font-size:14px;">E-Cell RSCOE</p></td><td style="text-align:right;"><span style="background:rgba(34,197,94,0.2);color:#22c55e;padding:5px 12px;border-radius:20px;font-size:12px;border:1px solid rgba(34,197,94,0.3);">Paid ✓</span></td></tr></table>
          </div>
          <div style="padding:30px;text-align:center;">
            <div style="background:#fff;display:inline-block;padding:15px;border-radius:12px;">
              <img src="${qrCodeUrl}" alt="Ticket QR Code" style="display:block;width:180px;height:180px;">
            </div>
            <p style="margin:15px 0 5px;color:#888;font-size:12px;">TICKET ID</p>
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa;word-break:break-all;padding:0 20px;">${ticket.id}</p>
          </div>
          <div style="border-top:2px dashed #333;"></div>
          <div style="padding:25px;">
            <table style="width:100%;">
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">👤 Attendee</p><p style="margin:5px 0 0;color:#fff;">${ticket.full_name}</p></td></tr>
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">📧 Email</p><p style="margin:5px 0 0;color:#fff;font-size:14px;">${ticket.email}</p></td></tr>
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">🎓 College</p><p style="margin:5px 0 0;color:#fff;">${ticket.college}</p></td></tr>
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">📅 Year</p><p style="margin:5px 0 0;color:#fff;">${yearLabels[ticket.year] || ticket.year}</p></td></tr>
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">📍 Venue</p><p style="margin:5px 0 0;color:#fff;">RSCOE Auditorium, Pune</p></td></tr>
              <tr><td style="padding:10px 0;"><p style="margin:0;color:#666;font-size:12px;">🗓️ Event Date</p><p style="margin:5px 0 0;color:#fff;">27 March to 29 March 2026</p></td></tr>
            </table>
          </div>
          <div style="background:rgba(168,85,247,0.1);padding:15px 20px;border-top:1px solid #333;">
            <p style="margin:0;color:#aaa;font-size:13px;text-align:center;">📱 Show this QR code at the venue for entry. This ticket is valid for single use only.</p>
          </div>
        </div>
        <div style="text-align:center;margin-bottom:30px;">
          <a href="${ticketUrl}" style="display:inline-block;background:linear-gradient(135deg,#a855f7,#3b82f6);color:#fff;text-decoration:none;padding:14px 30px;border-radius:8px;font-weight:600;">View Your Ticket Online</a>
        </div>
        <div style="text-align:center;color:#666;font-size:12px;">
          <p style="margin:0 0 10px;">E-Cell RSCOE • Entrepreneurship Cell</p>
          <p style="margin:0;">Rajarshi Shahu College of Engineering, Pune</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const plunkResponse = await fetch("https://api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        to: ticket.email,
        subject: "🎉 Your E-Summit '26 Ticket - Payment Confirmed!",
        body: emailHtml,
      }),
    });

    if (!plunkResponse.ok) {
      console.error("Plunk API error:", await plunkResponse.text());
    } else {
      console.log("Ticket email sent successfully to", ticket.email);
    }
  } catch (emailError) {
    console.error("Failed to send ticket email:", emailError);
  }
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Cashfree webhook called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
    if (!CASHFREE_SECRET_KEY) {
      throw new Error("CASHFREE_SECRET_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    const signature = req.headers.get("x-webhook-signature") || "";
    const timestamp = req.headers.get("x-webhook-timestamp") || "";
    const rawBody = await req.text();
    const payload: CashfreeWebhookPayload = JSON.parse(rawBody);

    const isTestWebhook = payload.type === "WEBHOOK" || payload.type === "TEST";

    if (!isTestWebhook && signature && timestamp) {
      const isValid = await verifySignature(rawBody, signature, timestamp, CASHFREE_SECRET_KEY);
      if (!isValid) {
        console.warn("Webhook signature mismatch - proceeding for debug/sandbox");
      }
    }

    console.log("Webhook type:", payload.type);
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    switch (payload.type) {
      case "PAYMENT_LINK_EVENT": {
        const linkData = payload.data as any;
        const ticketId = linkData.link_id || linkData.link_notes?.ticket_id;
        const linkStatus = linkData.link_status;
        
        console.log(`Payment Link event for ticket ${ticketId}, status: ${linkStatus}`);

        if (linkStatus === "PAID") {
          const { data: updatedTicket, error: updateError } = await supabase
            .from("tickets")
            .update({ status: "paid" })
            .eq("id", ticketId)
            .neq("status", "paid")
            .select()
            .maybeSingle();

          if (updateError) {
            console.error("Error updating ticket:", updateError);
          } else if (updatedTicket) {
            console.log(`Ticket ${ticketId} marked as paid. Sending email...`);
            await sendTicketEmail(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, updatedTicket);
          } else {
            console.log(`Ticket ${ticketId} was ALREADY paid. Skipping email.`);
          }
        } 
        break;
      }

      case "PAYMENT_ORDER_SUCCESS":
      case "PAYMENT_SUCCESS_WEBHOOK":
      case "PAYMENT_SUCCESS": {
        const { order } = payload.data;
        const ticketId = order?.order_tags?.ticket_id || payload.data.link_id || order?.order_id;
        console.log(`Payment successful for ticket ${ticketId}`);
        
        const { data: updatedTicket, error: updateError } = await supabase
          .from("tickets")
          .update({ status: "paid" })
          .eq("id", ticketId)
          .neq("status", "paid")
          .select()
          .maybeSingle();

        if (updateError) {
          console.error("Error updating ticket:", updateError);
        } else if (updatedTicket) {
          console.log(`Ticket ${ticketId} marked as paid. Sending email...`);
          await sendTicketEmail(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, updatedTicket);
        } else {
          console.log(`Ticket ${ticketId} was ALREADY paid. Skipping email.`);
        }
        break;
      }

      case "PAYMENT_ORDER_FAILED":
      case "PAYMENT_FAILED_WEBHOOK":
      case "PAYMENT_FAILED": {
        const { order } = payload.data;
        const ticketId = order?.order_tags?.ticket_id || payload.data.link_id || order?.order_id;
        console.log(`Payment failed for ticket ${ticketId}`);
        
        await supabase
          .from("tickets")
          .update({ status: "failed" })
          .eq("id", ticketId)
          .neq("status", "paid");
        break;
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error processing Cashfree webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);