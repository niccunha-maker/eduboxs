// Supabase Edge Function: Create Mercado Pago Preference
// Deploy with: supabase functions deploy create-preference
// Set secret: supabase secrets set MP_ACCESS_TOKEN=your_token

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order_id } = await req.json();

    // Initialize Supabase client with auth from request
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: { headers: { Authorization: req.headers.get("Authorization")! } },
      }
    );

    // Fetch order with items
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      throw new Error("Pedido nao encontrado");
    }

    // Build Mercado Pago items
    const items = order.order_items.map((item: any) => ({
      title: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price_cents / 100,
      currency_id: "BRL",
    }));

    // Create preference via Mercado Pago REST API
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("MP_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify({
        items,
        external_reference: order.id,
        back_urls: {
          success: `${req.headers.get("origin")}/pedido/${order.id}/confirmacao`,
          failure: `${req.headers.get("origin")}/carrinho`,
          pending: `${req.headers.get("origin")}/meus-pedidos`,
        },
        auto_return: "approved",
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mp-webhook`,
      }),
    });

    const preference = await mpResponse.json();

    // Update order with preference_id
    await supabaseClient
      .from("orders")
      .update({ payment_id: preference.id })
      .eq("id", order_id);

    return new Response(
      JSON.stringify({ id: preference.id, init_point: preference.init_point }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
