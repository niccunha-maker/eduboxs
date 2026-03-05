import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceCents: number;
  comparePriceCents?: number | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PriceDisplay = ({
  priceCents,
  comparePriceCents,
  className,
  size = "md",
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-bold font-serif-accent text-primary", sizeClasses[size])}>
        {formatCurrency(priceCents)}
      </span>
      {comparePriceCents && comparePriceCents > priceCents && (
        <span className="text-sm text-muted-foreground line-through font-normal">
          {formatCurrency(comparePriceCents)}
        </span>
      )}
    </div>
  );
};
