import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { ArticleCategory } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "gold";
}

const badgeVariants = {
  default: "bg-surface-hover text-muted border border-border-subtle",
  outline: "border border-border-default text-muted",
  gold: "bg-gold/10 text-gold-dark border border-gold/20",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border",
        CATEGORY_COLORS[category]
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

export { Badge, CategoryBadge };
