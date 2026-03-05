import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Ticket, ToggleLeft, ToggleRight } from "lucide-react";
import { useCoupons, useCreateCoupon, useDeleteCoupon, useUpdateCoupon } from "@/hooks/useCoupons";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";

const AdminCoupons = () => {
  const { data: coupons, isLoading } = useCoupons();
  const createCoupon = useCreateCoupon();
  const deleteCoupon = useDeleteCoupon();
  const updateCoupon = useUpdateCoupon();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    code: "",
    description: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: 0,
    min_order_cents: 0,
    max_uses: "",
    expires_at: "",
  });

  const resetForm = () => {
    setForm({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: 0,
      min_order_cents: 0,
      max_uses: "",
      expires_at: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCoupon.mutateAsync({
        code: form.code.toUpperCase().trim(),
        description: form.description || undefined,
        discount_type: form.discount_type,
        discount_value: form.discount_value,
        min_order_cents: form.min_order_cents || 0,
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        expires_at: form.expires_at || null,
      });
      toast({ title: "Cupom criado!" });
      resetForm();
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Erro ao criar cupom", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon.mutateAsync(id);
      toast({ title: "Cupom excluído" });
    } catch {
      toast({ title: "Erro ao excluir", variant: "destructive" });
    }
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    await updateCoupon.mutateAsync({ id, is_active: !currentActive });
  };

  const formatDiscount = (type: string, value: number) =>
    type === "percentage" ? `${value}%` : formatCurrency(value);

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Cupons de Desconto</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Novo Cupom
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Cupom</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Código</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="EX: VOLTA10"
                  required
                />
              </div>
              <div>
                <Label>Descrição (opcional)</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="10% de desconto na volta às aulas"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo</Label>
                  <Select
                    value={form.discount_type}
                    onValueChange={(v) => setForm({ ...form, discount_type: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>
                    {form.discount_type === "percentage" ? "Desconto (%)" : "Desconto (centavos)"}
                  </Label>
                  <Input
                    type="number"
                    value={form.discount_value}
                    onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })}
                    required
                    min={1}
                  />
                  {form.discount_type === "fixed" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Ex: 5000 = R$ 50,00
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pedido mínimo (centavos)</Label>
                  <Input
                    type="number"
                    value={form.min_order_cents}
                    onChange={(e) => setForm({ ...form, min_order_cents: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Limite de usos</Label>
                  <Input
                    type="number"
                    value={form.max_uses}
                    onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                    placeholder="Ilimitado"
                  />
                </div>
              </div>
              <div>
                <Label>Validade</Label>
                <Input
                  type="datetime-local"
                  value={form.expires_at}
                  onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">Deixe vazio para sem expiração</p>
              </div>
              <Button type="submit" className="w-full" disabled={createCoupon.isPending}>
                {createCoupon.isPending ? "Criando..." : "Criar Cupom"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!coupons || coupons.length === 0 ? (
        <EmptyState icon={Ticket} title="Nenhum cupom" description="Crie seu primeiro cupom de desconto" />
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon) => {
            const expired = coupon.expires_at && new Date(coupon.expires_at) < new Date();
            const exhausted = coupon.max_uses && coupon.used_count >= coupon.max_uses;
            return (
              <Card key={coupon.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Ticket className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm">{coupon.code}</span>
                      <Badge variant={coupon.is_active && !expired && !exhausted ? "default" : "secondary"}>
                        {!coupon.is_active ? "Inativo" : expired ? "Expirado" : exhausted ? "Esgotado" : "Ativo"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDiscount(coupon.discount_type, coupon.discount_value)} de desconto
                      {coupon.min_order_cents > 0 && ` | Mín: ${formatCurrency(coupon.min_order_cents)}`}
                      {coupon.max_uses && ` | ${coupon.used_count}/${coupon.max_uses} usos`}
                      {coupon.expires_at && ` | Expira: ${new Date(coupon.expires_at).toLocaleDateString("pt-BR")}`}
                    </p>
                    {coupon.description && (
                      <p className="text-xs text-muted-foreground">{coupon.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggle(coupon.id, coupon.is_active)}
                    title={coupon.is_active ? "Desativar" : "Ativar"}
                  >
                    {coupon.is_active ? (
                      <ToggleRight className="h-5 w-5 text-primary" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
