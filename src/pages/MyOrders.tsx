import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency, formatDate } from "@/lib/format";
import { usePageMeta } from "@/hooks/usePageMeta";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "outline" },
  payment_approved: { label: "Pago", variant: "default" },
  preparing: { label: "Preparando", variant: "secondary" },
  shipped: { label: "Enviado", variant: "secondary" },
  delivered: { label: "Entregue", variant: "default" },
  cancelled: { label: "Cancelado", variant: "destructive" },
};

const MyOrders = () => {
  usePageMeta({ title: "Meus Pedidos" });
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders(user?.id);

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  return (
    <div className="container py-8 max-w-2xl notebook-grid">
      <div className="mb-8 animate-fade-in">
        <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
          Seus pedidos
        </span>
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
      </div>

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum pedido"
          description="Você ainda não fez nenhum pedido"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusLabels[order.status] || statusLabels.pending;
            return (
              <Link key={order.id} to={`/meus-pedidos/${order.id}`}>
                <Card className="shadow-ink border-2 hover:shadow-md transition-shadow animate-fade-in">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">
                        {order.order_number}
                      </span>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatDate(order.created_at)}</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(order.total_cents)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.order_items?.length || 0} item(ns)
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
