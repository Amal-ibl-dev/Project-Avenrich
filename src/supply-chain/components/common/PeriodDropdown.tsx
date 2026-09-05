import React from "react";
import { ChevronDown } from "lucide-react";

interface PeriodDropdownProps {
  label: string;
  onClick?: () => void;
}

/** Rounded outline pill with a chevron — used for the "The Quarter" filter. */
export function PeriodDropdown({ label, onClick }: PeriodDropdownProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-[#1E5631] px-4 py-2 text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#EAF6EE]"
    >
      {label}
      <ChevronDown size={14} />
    </button>
  );
}
