import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ProductCard } from "@/components/shared/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { usePageMeta } from "@/hooks/usePageMeta";

const Catalog = () => {
  usePageMeta({ title: "Kits Escolares", description: "Encontre o kit escolar completo do colégio do seu filho. Entrega direto na escola." });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: products, isLoading } = useProducts({
    search: debouncedSearch || undefined,
    categorySlug: selectedCategory,
  });
  const { data: categories } = useCategories();

  return (
    <div className="min-h-[70vh]">
      {/* Page header — notebook style */}
      <div className="relative notebook-grid overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] -skew-x-12 origin-top-right" />
        <div className="container py-10 md:py-14">
          <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
            Catalogo
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Kits Escolares</h1>
          <p className="text-muted-foreground max-w-lg">
            Selecione o colégio e a série do seu filho. Cada kit segue a lista
            oficial e é entregue organizado direto na escola.
          </p>
        </div>
      </div>

      <div className="container pb-16">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 -mt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por colégio, série ou kit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-lg bg-card border-2 border-border/80 shadow-ink focus:shadow-ink-lg focus:border-primary/30 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={!selectedCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(undefined)}
              className={`rounded-lg px-5 h-9 font-bold border-2 ${!selectedCategory ? "shadow-ink" : "border-border"}`}
            >
              Todos
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-lg px-5 h-9 font-bold border-2 ${selectedCategory === cat.slug ? "shadow-ink" : "border-border"}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : !products || products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="Nenhum kit encontrado"
            description="Tente buscar com outros termos ou remover os filtros"
          />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              {products.length} kit{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
