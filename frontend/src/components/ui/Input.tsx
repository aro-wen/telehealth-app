import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/formatters";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-2 border border-surface-200 rounded-lg",
        "focus:ring-2 focus:ring-brand-500 focus:border-transparent",
        "placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
