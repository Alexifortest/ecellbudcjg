import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface TicketEmailRequest {
  ticketId: string;
  fullName: string;
  email: string;
  college: string;
  year: string;
}

const yearLabels: Record<string, string> = {
  "1": "First Year",
  "2": "Second Year",
  "3": "Third Year",
  "4": "Fourth Year",
  "pg": "Post Graduate",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-ticket-email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PLUNK_API_KEY = Deno.env.get("PLUNK_API_KEY");
    if (!PLUNK_API_KEY) {
      throw new Error("PLUNK_API_KEY is not configured");
    }

    const { ticketId, fullName, email, college, year }: TicketEmailRequest = await req.json();
    console.log(`Sending ticket email to ${email} for ticket ${ticketId}`);

    // Validate required fields
    if (!ticketId || !fullName || !email) {
      throw new Error("Missing required fields: ticketId, fullName, or email");
    }

    // Generate the ticket URL - using preview URL for now
    const ticketUrl = `https://id-preview--8b066ad4-230a-4537-b27e-f4405d7dfb4b.lovable.app/ticket/${ticketId}`;
    
    // Generate QR code URL using a public QR API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticketId)}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #a855f7; margin: 0; font-size: 28px;">E-SUMMIT '26</h1>
            <p style="color: #888; margin: 5px 0;">E-Cell RSCOE, Pune</p>
          </div>
          
          <!-- Success Message -->
          <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: rgba(34, 197, 94, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 30px;">✅</span>
            </div>
            <h2 style="margin: 0 0 10px; color: #fff;">Registration Successful!</h2>
            <p style="margin: 0; color: #aaa;">Your ticket has been generated</p>
          </div>
          
          <!-- Ticket Card -->
          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 16px; overflow: hidden; margin-bottom: 30px;">
            
            <!-- Ticket Header -->
            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2)); padding: 20px; border-bottom: 1px solid #333;">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <h3 style="margin: 0; color: #fff;">E-SUMMIT '26</h3>
                    <p style="margin: 5px 0 0; color: #888; font-size: 14px;">E-Cell RSCOE</p>
                  </td>
                  <td style="text-align: right;">
                    <span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 5px 12px; border-radius: 20px; font-size: 12px; border: 1px solid rgba(168, 85, 247, 0.3);">Valid</span>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- QR Code -->
            <div style="padding: 30px; text-align: center;">
              <div style="background: #fff; display: inline-block; padding: 15px; border-radius: 12px;">
                <img src="${qrCodeUrl}" alt="Ticket QR Code" style="display: block; width: 180px; height: 180px;">
              </div>
              <p style="margin: 15px 0 5px; color: #888; font-size: 12px;">TICKET ID</p>
              <p style="margin: 0; font-family: monospace; font-size: 11px; color: #aaa; word-break: break-all; padding: 0 20px;">${ticketId}</p>
            </div>
            
            <!-- Divider -->
            <div style="position: relative; margin: 0 -1px;">
              <div style="border-top: 2px dashed #333;"></div>
            </div>
            
            <!-- Attendee Info -->
            <div style="padding: 25px;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">👤 Attendee</p>
                    <p style="margin: 5px 0 0; color: #fff;">${fullName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">📧 Email</p>
                    <p style="margin: 5px 0 0; color: #fff; font-size: 14px;">${email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">🎓 College</p>
                    <p style="margin: 5px 0 0; color: #fff;">${college}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">📅 Year</p>
                    <p style="margin: 5px 0 0; color: #fff;">${yearLabels[year] || year}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">📍 Venue</p>
                    <p style="margin: 5px 0 0; color: #fff;">RSCOE Auditorium, Pune</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <p style="margin: 0; color: #666; font-size: 12px;">🗓️ Event Date</p>
                    <p style="margin: 5px 0 0; color: #fff;">27 March to 29 March 2026</p>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Footer Note -->
            <div style="background: rgba(168, 85, 247, 0.1); padding: 15px 20px; border-top: 1px solid #333;">
              <p style="margin: 0; color: #aaa; font-size: 13px; text-align: center;">
                📱 Show this QR code at the venue for entry. This ticket is valid for single use only.
              </p>
            </div>
          </div>
          
          
          <!-- Footer -->
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0 0 10px;">E-Cell RSCOE • Entrepreneurship Cell</p>
            <p style="margin: 0;">Rajarshi Shahu College of Engineering, Pune</p>
          </div>
          
        </div>
      </body>
      </html>
    `;

    // Send email using Plunk's transactional API
    const plunkResponse = await fetch("https://api.useplunk.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        to: email,
        subject: "🎉 Your E-Summit '26 Ticket - E-Cell RSCOE",
        body: emailHtml,
      }),
    });

    const plunkData = await plunkResponse.json();
    
    if (!plunkResponse.ok) {
      console.error("Plunk API error:", plunkData);
      throw new Error(`Plunk API error: ${JSON.stringify(plunkData)}`);
    }

    console.log("Email sent successfully via Plunk:", plunkData);

    return new Response(JSON.stringify({ success: true, data: plunkData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-ticket-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
