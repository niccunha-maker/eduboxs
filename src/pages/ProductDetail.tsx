import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  Package,
  ArrowLeft,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { useProduct, useRelatedProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cart-store";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ProductCard } from "@/components/shared/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useState } from "react";

const ProductSkeleton = () => (
  <div className="container py-8 notebook-grid">
    <Skeleton className="h-8 w-20 mb-6 rounded-lg" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Skeleton className="aspect-square rounded-xl w-full" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-16 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-24 rounded" />
        <Skeleton className="h-9 w-3/4 rounded" />
        <Skeleton className="h-5 w-1/2 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
        <Skeleton className="h-20 w-full rounded" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-28 rounded-lg" />
          <Skeleton className="h-12 flex-1 rounded-lg" />
        </div>
        <Separator />
        <Skeleton className="h-5 w-32 rounded" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-2/3 rounded" />
        ))}
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || "");
  const { data: relatedProducts } = useRelatedProducts(product);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  usePageMeta({ title: product?.name || "Kit Escolar", description: product?.description || undefined });

  if (isLoading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Kit não encontrado</h1>
        <Button asChild variant="outline">
          <Link to="/kits">Voltar para o catálogo</Link>
        </Button>
      </div>
    );
  }

  const itemsList = (product.items_list as { name: string; qty: number }[]) || [];

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        priceCents: product.price_cents,
        imageUrl: product.image_urls?.[0] || null,
        slug: product.slug,
        schoolName: product.school_name,
      },
      quantity
    );
    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} (${quantity}x)`,
    });
  };

  return (
    <div className="container py-8 notebook-grid">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/kits">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden mb-4 shadow-ink border-2">
            {product.image_urls?.[selectedImage] ? (
              <img
                src={product.image_urls[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package className="h-24 w-24 text-muted-foreground" />
            )}
          </div>
          {product.image_urls && product.image_urls.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.image_urls.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === i
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.grade && (
            <Badge variant="secondary" className="mb-3 sticker-alt">
              {product.grade}
            </Badge>
          )}
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.name}
          </h1>
          {product.school_name && (
            <p className="text-muted-foreground mb-4">{product.school_name}</p>
          )}

          <PriceDisplay
            priceCents={product.price_cents}
            comparePriceCents={product.compare_price_cents}
            size="lg"
            className="mb-6"
          />

          {product.description && (
            <p className="text-muted-foreground mb-6">{product.description}</p>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>

          {product.stock > 0 && product.stock <= 10 && (
            <p className="text-sm text-accent font-medium mb-6">
              Apenas {product.stock} unidades restantes!
            </p>
          )}

          {/* Kit Items */}
          {itemsList.length > 0 && (
            <>
              <Separator className="mb-6" />
              <div>
                <span className="font-handwritten text-lg text-accent font-bold block mb-1 transform -rotate-1">
                  O que vem no kit:
                </span>
                <h3 className="font-semibold mb-3">Itens do Kit</h3>
                <ul className="space-y-2">
                  {itemsList.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {item.qty > 1 && (
                        <span className="font-medium">{item.qty}x</span>
                      )}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16 animate-fade-in stagger-2">
          <Separator className="mb-10" />
          <div className="mb-8">
            <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
              Veja também
            </span>
            <h2 className="text-2xl font-bold">Kits Relacionados</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
