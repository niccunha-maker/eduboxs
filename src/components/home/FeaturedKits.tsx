import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedKits = () => {
  const { data: products, isLoading } = useProducts();
  const featured = products?.slice(0, 4);

  return (
    <section className="py-20 relative">
      {/* Notebook margin line decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary/[0.02] to-transparent hidden lg:block" />

      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-handwritten text-2xl text-accent font-bold block mb-1 transform -rotate-2">
              Os mais pedidos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Kits em Destaque
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden md:inline-flex rounded-lg text-primary hover:text-primary hover:bg-primary/5 font-bold border-2 border-transparent hover:border-primary/15"
          >
            <Link to="/kits">
              Ver todos
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-card shadow-ink border-2 border-border">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5">
                    <Skeleton className="h-3 w-16 mb-3 rounded" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-4" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              ))
            : featured?.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
        </div>

        {!isLoading && (!featured || featured.length === 0) && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-xl bg-muted border-2 border-dashed border-border mb-4">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold mb-1">Nenhum kit disponível</p>
            <p className="text-muted-foreground text-sm">
              Novos kits serão adicionados em breve.
            </p>
          </div>
        )}

        <div className="text-center mt-10 md:hidden">
          <Button asChild variant="outline" className="rounded-lg px-8 border-2 font-bold">
            <Link to="/kits">
              Ver todos os kits
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
