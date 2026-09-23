import React from "react";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderLinkProps {
  title: string;
  onSeeAll?: () => void;
}

/** Title + "See All" pill-button-style link, used above scrollable/list-style widgets. */
export function SectionHeaderLink({ title, onSeeAll }: SectionHeaderLinkProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <button
        onClick={onSeeAll}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-opacity hover:opacity-70"
      >
        See All
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">
          <ArrowUpRight size={13} />
        </span>
      </button>
    </div>
  );
}
