import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

const cardRotations = [
  "-rotate-[0.6deg]",
  "rotate-[0.4deg]",
  "-rotate-[0.3deg]",
  "rotate-[0.7deg]",
  "rotate-[0.2deg]",
  "-rotate-[0.5deg]",
  "rotate-[0.3deg]",
  "-rotate-[0.8deg]",
];

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price_cents: number;
    compare_price_cents?: number | null;
    image_urls?: string[] | null;
    grade?: string | null;
    school_name?: string | null;
    stock: number;
  };
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const rotation = cardRotations[index % cardRotations.length];

  return (
    <Link to={`/kits/${product.slug}`} className="group">
      <div
        className={`rounded-xl overflow-hidden bg-card shadow-ink border-2 border-border/60 hover:shadow-ink-lg hover:-translate-y-1 transition-all h-full flex flex-col transform ${rotation} hover:rotate-0`}
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center overflow-hidden">
          {product.image_urls?.[0] ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
              <BookOpen className="h-10 w-10" />
              <span className="text-xs font-semibold">Kit Escolar</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-1.5">
            {product.compare_price_cents &&
              product.compare_price_cents > product.price_cents && (
                <span className="inline-block bg-accent text-accent-foreground rounded-md text-[11px] font-extrabold px-2.5 py-1 shadow-sm transform -rotate-3">
                  {Math.round(
                    (1 - product.price_cents / product.compare_price_cents) * 100
                  )}
                  % OFF
                </span>
              )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="inline-block bg-foreground/90 text-background rounded-md text-[10px] font-bold px-2 py-0.5 transform rotate-2">
                Últimas!
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 border-t-2 border-dashed border-border/50">
          {product.grade && (
            <span className="inline-flex self-start text-[11px] font-extrabold text-primary bg-primary/8 rounded px-2 py-0.5 mb-2 uppercase tracking-wider">
              {product.grade}
            </span>
          )}
          <h3 className="font-bold text-[15px] leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.school_name && (
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              {product.school_name}
            </p>
          )}
          <div className="mt-auto pt-2 border-t border-border/30">
            <PriceDisplay
              priceCents={product.price_cents}
              comparePriceCents={product.compare_price_cents}
              size="md"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
