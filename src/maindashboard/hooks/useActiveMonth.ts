import { useMemo, useState } from "react";
import type { MonthlyFlow } from "../types/dashboard.types";

interface UseActiveMonthResult {
  activeMonth: string;
  activeData: MonthlyFlow;
  setActiveMonth: (month: string) => void;
  activeIndex: number;
}

/**
 * Tracks which bar/month is currently "active" (hovered, or a sensible
 * default) and resolves the corresponding data point for the tooltip.
 */
export function useActiveMonth(
  data: MonthlyFlow[],
  defaultMonth?: string
): UseActiveMonthResult {
  const [activeMonth, setActiveMonth] = useState<string>(
    defaultMonth ?? data[0]?.month ?? ""
  );

  const activeIndex = useMemo(
    () => Math.max(0, data.findIndex((d) => d.month === activeMonth)),
    [data, activeMonth]
  );

  const activeData = data[activeIndex] ?? data[0];

  return { activeMonth, activeData, setActiveMonth, activeIndex };
}
