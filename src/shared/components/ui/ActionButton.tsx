import React from "react";
import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  icon?: LucideIcon;
  /** "solid" = filled brand green, "outline" = green border on white. */
  variant?: "solid" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * The page-header buttons used by every list page: "Add Product",
 * "Add Supplier", "Export Pdf", "Add Blend Order". Two variants only —
 * anything else should be a plain button rather than a third variant here.
 * Originally lived in features/supply-chain, styled from that feature's
 * LIST_THEME hex constants; promoted here once blend needed the same
 * button, and switched to the shared Tailwind theme tokens so it isn't
 * tied to one feature's color constants.
 */
export function ActionButton({
  label,
  icon: Icon,
  variant = "solid",
  onClick,
  type = "button",
}: ActionButtonProps) {
  const isSolid = variant === "solid";

  return (
    <button
      type={type}
      onClick={onClick}
      className={
        isSolid
          ? "flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
          : "flex items-center gap-2 rounded-full border border-forest px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest-light focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
      }
    >
      {Icon ? <Icon size={16} strokeWidth={2.5} /> : null}
      {label}
    </button>
  );
}
