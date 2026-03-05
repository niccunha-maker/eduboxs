import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, MessageCircle, ArrowLeft, School } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/shared/EmptyState";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { usePageMeta } from "@/hooks/usePageMeta";

const Checkout = () => {
  usePageMeta({ title: "Finalizar Compra" });
  const { user } = useAuth();
  const { items, totalCents, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"mercado_pago" | "whatsapp">("mercado_pago");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const schools = [...new Set(items.map((i) => i.schoolName).filter(Boolean))];

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <EmptyState
          icon={CreditCard}
          title="Nenhum item no carrinho"
          description="Adicione produtos antes de finalizar a compra"
        >
          <Button onClick={() => navigate("/kits")}>Ver Kits</Button>
        </EmptyState>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const itemsList = items
      .map((i) => `- ${i.name} (x${i.quantity}) - ${formatCurrency(i.priceCents * i.quantity)}`)
      .join("\n");

    const message = `Olá! Gostaria de finalizar meu pedido na EduBoxs.\n\nItens:\n${itemsList}\n\nTotal: ${formatCurrency(totalCents())}\n\nAguardo orientações sobre a entrega na escola.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleMercadoPago = async () => {
    setProcessing(true);
    // TODO: Integrate with Mercado Pago Edge Function
    // For now, show a placeholder
    setTimeout(() => {
      setProcessing(false);
      alert("Integração com Mercado Pago será configurada com as Edge Functions do Supabase.");
    }, 1000);
  };

  return (
    <div className="container py-8 max-w-3xl">
      <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate("/carrinho")}>
        <ArrowLeft className="mr-1 h-4 w-4" />
        Voltar ao carrinho
      </Button>

      <div className="mb-8 animate-fade-in">
        <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
          Último passo!
        </span>
        <h1 className="text-3xl font-bold">Finalizar Compra</h1>
      </div>

      <div className="space-y-6">
        {/* School Delivery Info */}
        <Card className="shadow-ink border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <School className="h-5 w-5" />
              Entrega na Escola
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Os kits serão entregues diretamente na escola antes do início das aulas.
              </p>
              {schools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {schools.map((school) => (
                    <span
                      key={school}
                      className="inline-flex items-center gap-1.5 text-sm font-medium bg-card border-2 border-border rounded-lg px-3 py-1.5 shadow-sm"
                    >
                      <School className="h-3.5 w-3.5 text-primary" />
                      {school}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-ink border-2">
          <CardHeader>
            <CardTitle className="text-lg">Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatCurrency(item.priceCents * item.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="highlighter">{formatCurrency(totalCents())}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="shadow-ink border-2">
          <CardHeader>
            <CardTitle className="text-lg">Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as any)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="mercado_pago" id="mp" />
                <Label htmlFor="mp" className="cursor-pointer flex items-center gap-2 flex-1">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Mercado Pago</p>
                    <p className="text-xs text-muted-foreground">
                      Cartão, Pix, boleto - parcele em até 12x
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="whatsapp" id="wpp" />
                <Label htmlFor="wpp" className="cursor-pointer flex items-center gap-2 flex-1">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">
                      Finalize pelo WhatsApp com atendimento personalizado
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Action */}
        <Button
          size="lg"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={processing}
          onClick={paymentMethod === "whatsapp" ? handleWhatsAppOrder : handleMercadoPago}
        >
          {processing
            ? "Processando..."
            : paymentMethod === "whatsapp"
            ? "Pedir via WhatsApp"
            : "Pagar com Mercado Pago"}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
