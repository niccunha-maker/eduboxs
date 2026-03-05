import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  children,
  className,
}: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
    <Icon className="h-12 w-12 text-muted-foreground mb-4" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
    )}
    {children}
  </div>
);
