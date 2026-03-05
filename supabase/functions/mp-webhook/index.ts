// Supabase Edge Function: Mercado Pago Webhook (IPN)
// Deploy with: supabase functions deploy mp-webhook

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    // Only process payment notifications
    if (body.type !== "payment") {
      return new Response("ok", { status: 200 });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return new Response("missing payment id", { status: 400 });
    }

    // Verify payment by fetching from Mercado Pago API
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("MP_ACCESS_TOKEN")}`,
        },
      }
    );

    const payment = await mpResponse.json();

    // Initialize admin Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Map Mercado Pago status to our payment_status
    const statusMap: Record<string, string> = {
      approved: "approved",
      pending: "pending",
      rejected: "rejected",
      refunded: "refunded",
    };

    const paymentStatus = statusMap[payment.status] || "pending";
    const orderStatus = payment.status === "approved" ? "payment_approved" : "pending";

    // Update order
    await supabaseAdmin
      .from("orders")
      .update({
        payment_status: paymentStatus,
        payment_id: String(paymentId),
        status: orderStatus,
      })
      .eq("id", payment.external_reference);

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("error", { status: 500 });
  }
});
