import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/formatters";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-600 text-white hover:bg-brand-700",
      secondary: "bg-slate-600 text-white hover:bg-slate-700",
      outline: "border-2 border-brand-600 text-brand-600 hover:bg-brand-50",
      ghost: "text-slate-600 hover:bg-slate-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
