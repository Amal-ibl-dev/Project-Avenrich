import React, { useState, useRef, useLayoutEffect } from "react";

const COLORS = {
  emerald: "#2ECC71",
  forestGreen: "#1E5631",
  crimsonSoft: "#C0392B",
  crimsonDark: "#5C1010",
  hatchLine: "#E2E5E0",
  hatchBorder: "#CFD3CD",
  divider: "#E5E7EB",
  crimson: "#990000",
};

const MONTHLY_FLOW = [
  { month: "Jan", incoming: 55, expenses: 40, incomingAmount: 322450, expensesAmount: 251300 },
  { month: "Feb", incoming: 42, expenses: 28, incomingAmount: 268100, expensesAmount: 176900 },
  { month: "Mar", incoming: 58, expenses: 45, incomingAmount: 340600, expensesAmount: 289750 },
  { month: "Apr", incoming: 30, expenses: 62, incomingAmount: 198200, expensesAmount: 384500 },
  { month: "May", incoming: 96, expenses: 88, incomingAmount: 560870, expensesAmount: 660290 },
  { month: "Jun", incoming: 60, expenses: 46, incomingAmount: 352000, expensesAmount: 296400 },
  { month: "Jul", incoming: 57, expenses: 44, incomingAmount: 336700, expensesAmount: 282100 },
  { month: "Aug", incoming: 62, expenses: 58, incomingAmount: 368900, expensesAmount: 372600 },
  { month: "Sep", incoming: 59, expenses: 47, incomingAmount: 347500, expensesAmount: 301800 },
  { month: "Oct", incoming: 63, expenses: 49, incomingAmount: 372300, expensesAmount: 312900 },
];

function formatCurrencyWhole(v) {
  return v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const HATCH = `repeating-linear-gradient(135deg, ${COLORS.hatchLine} 0px, ${COLORS.hatchLine} 2px, transparent 2px, transparent 6px)`;

function CapsuleBar({ variant, value, maxHalfHeightPx, isActive }) {
  const isIncoming = variant === "incoming";
  const heightPx = Math.max((value / 100) * maxHalfHeightPx, 18);
  const capHeightPx = Math.min(14, heightPx * 0.3);
  const activeGradient = isIncoming
    ? `linear-gradient(180deg, ${COLORS.emerald} 0%, ${COLORS.forestGreen} 100%)`
    : `linear-gradient(180deg, ${COLORS.crimsonSoft} 0%, ${COLORS.crimsonDark} 100%)`;
  const capColor = isIncoming ? COLORS.emerald : COLORS.crimsonSoft;
  const radiusStyle = isIncoming
    ? { borderTopLeftRadius: 999, borderTopRightRadius: 999 }
    : { borderBottomLeftRadius: 999, borderBottomRightRadius: 999 };

  return (
    <div
      style={{
        height: heightPx,
        ...radiusStyle,
        position: "relative",
        overflow: "hidden",
        background: isActive ? activeGradient : HATCH,
        border: isActive ? "none" : `1px solid ${COLORS.hatchBorder}`,
        [isIncoming ? "borderBottom" : "borderTop"]: "none",
        transition: "background 200ms ease, height 200ms ease",
        width: "100%",
      }}
    >
      {!isActive && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [isIncoming ? "top" : "bottom"]: 0,
            height: capHeightPx,
            background: capColor,
            ...radiusStyle,
          }}
        />
      )}
    </div>
  );
}

export default function CapsuleChartPreview() {
  const [activeMonth, setActiveMonth] = useState("May");
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const barWidth = 34;
  const gap = 14;
  const maxHalfHeight = 110;
  const tooltipWidth = 220;

  const activeIndex = Math.max(0, MONTHLY_FLOW.findIndex((d) => d.month === activeMonth));
  const activeData = MONTHLY_FLOW[activeIndex];
  const desiredLeft = activeIndex * (barWidth + gap) + barWidth / 2;
  const halfTooltip = tooltipWidth / 2;
  const tooltipLeft = containerWidth
    ? Math.min(Math.max(desiredLeft, halfTooltip + 8), containerWidth - halfTooltip - 8)
    : desiredLeft;

  return (
    <div style={{ background: "#F4F5F7", padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
        }}
      >
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: tooltipLeft,
              transform: "translateX(-50%)",
              width: tooltipWidth,
              background: "#fff",
              border: "1px solid #f3f4f6",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              zIndex: 10,
              fontSize: 14,
              transition: "left 200ms ease",
            }}
          >
            <div style={{ fontWeight: 600, color: "#1f2937", marginBottom: 6 }}>{activeData.month}</div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#374151" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.emerald, display: "inline-block" }} />
                Incoming
              </span>
              <span style={{ fontWeight: 600, color: "#111827" }}>{formatCurrencyWhole(activeData.incomingAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#374151", marginTop: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.crimson, display: "inline-block" }} />
                Expenses
              </span>
              <span style={{ fontWeight: 600, color: COLORS.crimson }}>{formatCurrencyWhole(activeData.expensesAmount)}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap, paddingTop: 96 }}>
            {MONTHLY_FLOW.map((m) => {
              const isActive = m.month === activeMonth;
              return (
                <div
                  key={m.month}
                  onMouseEnter={() => setActiveMonth(m.month)}
                  style={{ width: barWidth, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                >
                  <div style={{ height: maxHalfHeight, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <CapsuleBar variant="incoming" value={m.incoming} maxHalfHeightPx={maxHalfHeight} isActive={isActive} />
                  </div>
                  <div style={{ height: 1, width: "100%", background: COLORS.divider }} />
                  <div style={{ height: maxHalfHeight, width: "100%" }}>
                    <CapsuleBar variant="expenses" value={m.expenses} maxHalfHeightPx={maxHalfHeight} isActive={isActive} />
                  </div>
                  <span style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
