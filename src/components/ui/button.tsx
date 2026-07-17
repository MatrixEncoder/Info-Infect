import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-gold text-white font-semibold hover:bg-gold-dark shadow-sm",
  destructive:
    "bg-red-accent text-white hover:bg-red-accent/90",
  outline:
    "border border-border-default bg-white hover:bg-surface-hover text-foreground",
  ghost: "hover:bg-surface-hover text-muted",
  link: "text-gold underline-offset-4 hover:underline",
};

const sizeStyles = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 rounded px-3 text-xs",
  lg: "h-10 rounded px-6 text-sm",
  xl: "h-12 rounded-lg px-8 text-base",
  icon: "h-9 w-9",
};

type ButtonVariants = keyof typeof variantStyles;
type ButtonSizes = keyof typeof sizeStyles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
