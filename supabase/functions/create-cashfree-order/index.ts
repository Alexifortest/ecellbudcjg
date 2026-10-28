import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type TicketType = "single" | "group2" | "group5";

interface OrderRequest {
  ticketId: string;
  fullName: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  returnBaseUrl?: string;
}

const TICKET_CONFIG: Record<TicketType, { amount: number; note: string }> = {
  single: {
    amount: Number((249 * 1.02).toFixed(2)),
    note: "E-Summit '26 Single Ticket (₹249 + 2% fee)",
  },
  group2: {
    amount: Number((478 * 1.02).toFixed(2)),
    note: "E-Summit '26 Group of Two Ticket (₹478 + 2% fee)",
  },
  group5: {
    amount: Number((1095 * 1.02).toFixed(2)),
    note: "E-Summit '26 Group of Five Ticket (₹1095 + 2% fee)",
  },
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Create Cashfree order called");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
    const CASHFREE_ENV = Deno.env.get("CASHFREE_ENV") ?? "sandbox";
    const APP_BASE_URL = Deno.env.get("APP_BASE_URL")
      ?? "https://id-preview--8b066ad4-230a-4537-b27e-f4405d7dfb4b.lovable.app";
    const CASHFREE_NOTIFY_URL = Deno.env.get("CASHFREE_NOTIFY_URL")
      ?? "https://eqxiwnlilfbdfsorrdoo.supabase.co/functions/v1/cashfree-webhook";

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      throw new Error("Cashfree credentials are not configured");
    }

    const { ticketId, fullName, email, phone, ticketType, returnBaseUrl }: OrderRequest = await req.json();

    if (!ticketId || !fullName || !email || !phone || !ticketType) {
      throw new Error("Missing required fields");
    }

    const config = TICKET_CONFIG[ticketType];
    if (!config) {
      throw new Error("Invalid ticket type");
    }

    console.log(`Creating order for ticket: ${ticketId}, type: ${ticketType}`);

    const baseUrl = returnBaseUrl || APP_BASE_URL;

    const cashfreeApiBaseUrl = CASHFREE_ENV === "production"
      ? "https://api.cashfree.com/pg/orders"
      : "https://sandbox.cashfree.com/pg/orders";

    const orderPayload = {
      order_id: ticketId,
      order_amount: config.amount,
      order_currency: "INR",
      order_note: config.note,
      customer_details: {
        customer_id: ticketId,
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${baseUrl}/ticket/${ticketId}?payment_status={order_status}`,
        notify_url: CASHFREE_NOTIFY_URL,
      },
      order_tags: {
        ticket_id: ticketId,
        ticket_type: ticketType,
      },
      order_expiry_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };

    console.log("Sending order request to Cashfree:", JSON.stringify(orderPayload));

    const response = await fetch(cashfreeApiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await response.json();
    console.log("Cashfree response:", JSON.stringify(orderData));

    if (!response.ok) {
      console.error("Cashfree order creation failed:", orderData);
      throw new Error(orderData.message || "Failed to create order");
    }

    const checkoutBaseUrl = CASHFREE_ENV === "production"
      ? "https://payments.cashfree.com/pgbillpay"
      : "https://sandbox.cashfree.com/pgbillpay";

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderData.order_id,
        paymentSessionId: orderData.payment_session_id,
        orderStatus: orderData.order_status,
        paymentUrl: `${checkoutBaseUrl}?order_token=${orderData.payment_session_id}`,
        environment: CASHFREE_ENV,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error creating Cashfree order:", error);
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
