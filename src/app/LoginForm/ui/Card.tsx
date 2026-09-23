import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * White/frosted rounded card. Used for the floating quote on the banner,
 * but generic enough to reuse anywhere a soft elevated surface is needed.
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/90 p-5 shadow-lg shadow-black/10 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
