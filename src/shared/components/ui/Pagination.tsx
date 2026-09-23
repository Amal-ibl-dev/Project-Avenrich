import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const BUTTON_BASE =
  "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5631] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

/** Circular prev / page-number / next control centred under each table. */
export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${BUTTON_BASE} bg-white text-gray-500 hover:bg-gray-100`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((value) => {
        const isActive = value === page;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onPageChange(value)}
            aria-current={isActive ? "page" : undefined}
            className={`${BUTTON_BASE} ${
              isActive
                ? "bg-white font-semibold text-[#123A20] ring-1 ring-[#1E5631]"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {value}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={`${BUTTON_BASE} bg-white text-gray-500 hover:bg-gray-100`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
