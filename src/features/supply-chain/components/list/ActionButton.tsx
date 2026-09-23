import React from "react";
import type { LucideIcon } from "lucide-react";
import { LIST_THEME } from "../../constants/list-theme.constants";

interface ActionButtonProps {
  label: string;
  icon?: LucideIcon;
  /** "solid" = filled brand green, "outline" = green border on white. */
  variant?: "solid" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * The page-header buttons: "Add Product", "Add Supplier", "Export Pdf",
 * "Create GRN". Two variants only — anything else should be a plain button
 * rather than a third variant here.
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
      className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5631] focus-visible:ring-offset-2"
      style={
        isSolid
          ? { background: LIST_THEME.primaryBg, color: LIST_THEME.primaryText }
          : {
              background: "#FFFFFF",
              color: LIST_THEME.outlineText,
              border: `1px solid ${LIST_THEME.outlineBorder}`,
            }
      }
      onMouseEnter={(event) => {
        if (!isSolid) event.currentTarget.style.background = LIST_THEME.outlineHoverBg;
      }}
      onMouseLeave={(event) => {
        if (!isSolid) event.currentTarget.style.background = "#FFFFFF";
      }}
    >
      {Icon ? <Icon size={16} strokeWidth={2.5} /> : null}
      {label}
    </button>
  );
}
