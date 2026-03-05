import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Package, Trash2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const AdminProducts = () => {
  const { data: products, isLoading } = useProducts({ isActive: undefined } as any);
  const { toast } = useToast();
  const qc = useQueryClient();

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Produto excluído" });
      qc.invalidateQueries({ queryKey: ["products"] });
    }
  };

  if (isLoading) return <LoadingSpinner className="min-h-[60vh]" />;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Button asChild>
          <Link to="/admin/produtos/novo">
            <Plus className="mr-1 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>

      {!products || products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto"
          description="Cadastre seu primeiro kit escolar"
        >
          <Button asChild>
            <Link to="/admin/produtos/novo">Cadastrar Produto</Link>
          </Button>
        </EmptyState>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {product.image_urls?.[0] ? (
                    <img
                      src={product.image_urls[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {product.school_name || "Sem colegio"} | Estoque: {product.stock}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {formatCurrency(product.price_cents)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/admin/produtos/${product.id}/editar`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
