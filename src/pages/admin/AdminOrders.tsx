import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency, formatDate } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";

const statuses = [
  { value: "pending", label: "Pendente" },
  { value: "payment_approved", label: "Pago" },
  { value: "preparing", label: "Preparando" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregue" },
  { value: "cancelled", label: "Cancelado" },
];

const AdminOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*), profiles(full_name, email)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Status atualizado!" });
    },
  });

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Pedidos</h1>

      {!orders || orders.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Nenhum pedido"
          description="Os pedidos dos clientes aparecerão aqui"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{order.order_number}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {order.profiles?.full_name || order.profiles?.email}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{formatCurrency(order.total_cents)}</span>
                    <span className="text-muted-foreground ml-2">
                      {order.order_items?.length || 0} item(ns) |{" "}
                      {order.payment_method === "whatsapp" ? "WhatsApp" : "Mercado Pago"}
                    </span>
                  </div>
                  <Select
                    value={order.status}
                    onValueChange={(v) =>
                      updateStatus.mutate({ orderId: order.id, status: v })
                    }
                  >
                    <SelectTrigger className="w-40 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
