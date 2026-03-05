import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package } from "lucide-react";
import { useOrder } from "@/hooks/useOrders";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { formatCurrency, formatDate } from "@/lib/format";
import { usePageMeta } from "@/hooks/usePageMeta";

const OrderDetail = () => {
  usePageMeta({ title: "Detalhe do Pedido" });
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pedido não encontrado</h1>
        <Button asChild variant="outline">
          <Link to="/meus-pedidos">Voltar aos pedidos</Link>
        </Button>
      </div>
    );
  }

  const address = order.shipping_address as any;

  return (
    <div className="container py-8 max-w-2xl">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/meus-pedidos">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Meus Pedidos
        </Link>
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{order.order_number}</h1>
        <Badge>{order.status}</Badge>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} x{item.quantity}
                  </span>
                  <span>{formatCurrency(item.unit_price_cents * item.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal_cents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>{formatCurrency(order.shipping_cents)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span>{formatCurrency(order.total_cents)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {address && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {address.street}, {address.number}
                {address.complement && ` - ${address.complement}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {address.neighborhood} - {address.city}/{address.state}
              </p>
              <p className="text-sm text-muted-foreground">CEP: {address.cep}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Data:</span>{" "}
              {formatDate(order.created_at)}
            </p>
            <p>
              <span className="text-muted-foreground">Pagamento:</span>{" "}
              {order.payment_method === "whatsapp" ? "WhatsApp" : "Mercado Pago"}
            </p>
            {order.payment_status && (
              <p>
                <span className="text-muted-foreground">Status pagamento:</span>{" "}
                {order.payment_status}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
