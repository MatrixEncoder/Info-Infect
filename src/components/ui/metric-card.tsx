import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, change, trend, icon, className }: MetricCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-muted uppercase tracking-wider">
              {label}
            </p>
            <p className="text-2xl font-serif font-bold tracking-tight text-foreground">
              {value}
            </p>
            {change && (
              <p
                className={cn(
                  "text-[11px] font-medium flex items-center gap-1",
                  trend === "up" && "text-gold-dark",
                  trend === "down" && "text-red-accent",
                  trend === "neutral" && "text-muted"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {change}
              </p>
            )}
          </div>
          {icon && <div className="text-border-default">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
