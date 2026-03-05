import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAddresses, useCreateAddress, useDeleteAddress } from "@/hooks/useAddresses";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { STATES } from "@/lib/constants";
function maskCep(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}
import { usePageMeta } from "@/hooks/usePageMeta";

const MyAddresses = () => {
  usePageMeta({ title: "Meus Endereços" });
  const { user } = useAuth();
  const { data: addresses, isLoading } = useAddresses(user?.id);
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const [open, setOpen] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const [form, setForm] = useState({
    label: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const lookupCep = useCallback(async (cep: string) => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      // silently fail — user can fill manually
    } finally {
      setCepLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await createAddress.mutateAsync({
      user_id: user.id,
      ...form,
    });

    setForm({ label: "", cep: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "" });
    setOpen(false);
  };

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  return (
    <div className="container py-8 max-w-2xl notebook-grid">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
            Onde entregar
          </span>
          <h1 className="text-3xl font-bold">Meus Endereços</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Novo Endereço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Endereço</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome (ex: Casa, Trabalho)</Label>
                <Input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>CEP</Label>
                <div className="relative">
                  <Input
                    value={form.cep}
                    onChange={(e) => {
                      const masked = maskCep(e.target.value);
                      setForm({ ...form, cep: masked });
                      if (masked.replace(/\D/g, "").length === 8) lookupCep(masked);
                    }}
                    onBlur={() => lookupCep(form.cep)}
                    placeholder="00000-000"
                    required
                  />
                  {cepLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label>Rua</Label>
                  <Input
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Número</Label>
                  <Input
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Complemento</Label>
                <Input
                  value={form.complement}
                  onChange={(e) => setForm({ ...form, complement: e.target.value })}
                />
              </div>
              <div>
                <Label>Bairro</Label>
                <Input
                  value={form.neighborhood}
                  onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cidade</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Select
                    value={form.state}
                    onValueChange={(v) => setForm({ ...form, state: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={createAddress.isPending}>
                {createAddress.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!addresses || addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="Nenhum endereço"
          description="Cadastre seu primeiro endereço de entrega"
        />
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <Card key={addr.id} className="shadow-ink border-2 animate-fade-in">
              <CardContent className="p-4 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm">{addr.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {addr.street}, {addr.number}
                    {addr.complement && ` - ${addr.complement}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {addr.neighborhood} - {addr.city}/{addr.state} - CEP {addr.cep}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteAddress.mutate({ id: addr.id, userId: user!.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddresses;
