import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { LIST_THEME } from "../../constants/list-theme.constants";

interface FilterButtonProps {
  label?: string;
  activeCount?: number;
  onClick?: () => void;
}

/**
 * Outline pill that opens the list filters. Shows a count badge when filters
 * are applied, so the user can tell a filtered table from a full one without
 * opening the panel.
 */
export function FilterButton({ label = "Filter", activeCount = 0, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#EAF6EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5631] focus-visible:ring-offset-2"
      style={{ borderColor: LIST_THEME.outlineBorder, color: LIST_THEME.outlineText }}
    >
      <SlidersHorizontal size={16} />
      {label}
      {activeCount > 0 ? (
        <span className="rounded-full bg-[#1E5631] px-2 py-0.5 text-xs font-semibold text-white">
          {activeCount}
        </span>
      ) : null}
    </button>
  );
}
