// Supabase Edge Function: Generate WhatsApp Order
// Deploy with: supabase functions deploy generate-whatsapp-order

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
    const { items, address_id, whatsapp_number } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: { headers: { Authorization: req.headers.get("Authorization")! } },
      }
    );

    // Get user
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error("Nao autenticado");

    // Get address
    const { data: address } = await supabaseClient
      .from("addresses")
      .select("*")
      .eq("id", address_id)
      .single();

    // Generate order number
    const { data: orderNumberData } = await supabaseClient
      .rpc("generate_order_number");
    const orderNumber = orderNumberData || `EB-${Date.now()}`;

    // Calculate totals
    let subtotalCents = 0;
    const orderItems = [];

    for (const item of items) {
      const { data: product } = await supabaseClient
        .from("products")
        .select("*")
        .eq("id", item.product_id)
        .single();

      if (!product) continue;

      subtotalCents += product.price_cents * item.quantity;
      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price_cents: product.price_cents,
      });
    }

    // Create order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        status: "pending",
        payment_method: "whatsapp",
        subtotal_cents: subtotalCents,
        total_cents: subtotalCents,
        shipping_address: address,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    await supabaseClient
      .from("order_items")
      .insert(orderItems.map((item) => ({ ...item, order_id: order.id })));

    // Build WhatsApp message
    const itemsList = orderItems
      .map((i) => `- ${i.product_name} (x${i.quantity}) - R$ ${(i.unit_price_cents * i.quantity / 100).toFixed(2)}`)
      .join("\n");

    const addressText = address
      ? `\n\nEndereco:\n${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ""}\n${address.neighborhood} - ${address.city}/${address.state}\nCEP: ${address.cep}`
      : "";

    const message = `Ola! Gostaria de finalizar meu pedido na EduBoxs.\n\nPedido: ${orderNumber}\nItens:\n${itemsList}\n\nTotal: R$ ${(subtotalCents / 100).toFixed(2)}${addressText}`;

    const whatsappUrl = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(message)}`;

    return new Response(
      JSON.stringify({ order_id: order.id, whatsapp_url: whatsappUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
