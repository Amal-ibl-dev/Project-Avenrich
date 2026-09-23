import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "ghost";
}

/**
 * Pill-shaped, full-width primary button used for the "Log In" CTA.
 * Deep forest-green fill, bold white label, disabled/loading affordance.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, disabled, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-full",
          "px-6 py-3.5 text-base font-bold tracking-wide",
          "transition-colors duration-150 focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-offset-2 focus-visible:ring-[#2D5A27]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variant === "primary" &&
            "bg-[#275B37] text-white hover:bg-[#204b2e] active:bg-[#1a3f27]",
          variant === "ghost" &&
            "bg-transparent text-[#2D5A27] hover:bg-[#2D5A27]/5",
          className
        )}
        {...props}
      >
        {isLoading ? "Logging in..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
