import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Package } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency } from "@/lib/format";
import { usePageMeta } from "@/hooks/usePageMeta";

const Cart = () => {
  usePageMeta({ title: "Carrinho" });
  const { items, removeItem, updateQuantity, totalCents } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <EmptyState
          icon={ShoppingCart}
          title="Seu carrinho está vazio"
          description="Explore nossos kits escolares e encontre o do colégio do seu filho"
        >
          <Button asChild>
            <Link to="/kits">Ver Kits</Link>
          </Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="container py-8 notebook-grid">
      <div className="mb-8 animate-fade-in">
        <span className="font-handwritten text-xl text-accent font-bold block mb-1 transform -rotate-1">
          Quase lá!
        </span>
        <h1 className="text-3xl font-bold">Carrinho</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId} className="shadow-ink border-2 animate-fade-in">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Link
                    to={`/kits/${item.slug}`}
                    className="flex-shrink-0 h-20 w-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-muted-foreground" />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/kits/${item.slug}`}
                      className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <PriceDisplay priceCents={item.priceCents} size="sm" className="mt-1" />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card className="shadow-ink border-2 animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(totalCents())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-primary font-medium">A calcular</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="highlighter">{formatCurrency(totalCents())}</span>
              </div>
              <Button
                asChild
                className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                <Link to="/checkout">
                  Finalizar Compra
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
