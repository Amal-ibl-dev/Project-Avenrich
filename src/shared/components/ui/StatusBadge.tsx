import React from "react";

export type BadgeVariant = "pending" | "completed" | "approved" | "neutral" | "rejected";

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
  /** "solid" for filled backgrounds (used on the dark green card), "outline" for bordered pills. */
  tone?: "solid" | "outline";
}

const OUTLINE_STYLES: Record<BadgeVariant, string> = {
  pending: "border-amber-400 text-amber-500",
  completed: "border-emerald-400 text-emerald-500",
  approved: "border-blue-400 text-blue-500",
  neutral: "border-fuchsia-400 text-fuchsia-500",
  rejected: "border-rose-400 text-rose-500",
};

const SOLID_STYLES: Record<BadgeVariant, string> = {
  pending: "bg-amber-400/15 text-amber-300",
  completed: "bg-emerald-400/15 text-emerald-300",
  approved: "bg-blue-400/15 text-blue-300",
  neutral: "bg-fuchsia-400/15 text-fuchsia-300",
  rejected: "bg-rose-400/15 text-rose-300",
};

/** Small rounded-pill badge used for order/report/customer statuses. */
export function StatusBadge({ label, variant, tone = "outline" }: StatusBadgeProps) {
  const styles = tone === "solid" ? SOLID_STYLES[variant] : OUTLINE_STYLES[variant];
  const borderClass = tone === "outline" ? "border" : "";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${borderClass} ${styles}`}
    >
      {label}
    </span>
  );
}
