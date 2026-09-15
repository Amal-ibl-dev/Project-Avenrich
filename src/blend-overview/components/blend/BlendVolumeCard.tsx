import React from "react";
import type { BlendVolumeBar } from "../../types/blend.types";

interface BlendVolumeCardProps {
  title: string;
  bars: BlendVolumeBar[];
  maxHeightPx?: number;
}

/** One rounded-pill bar per product, each individually colored (no shared legend needed). */
export function BlendVolumeCard({ title, bars, maxHeightPx = 180 }: BlendVolumeCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-gray-900">{title}</h3>

      <div className="flex items-end justify-between gap-4" style={{ height: maxHeightPx }}>
        {bars.map((bar) => (
          <div key={bar.id} className="flex flex-1 flex-col items-center">
            <div
              className="w-full max-w-[48px] rounded-full"
              style={{
                height: Math.max((bar.value / 100) * maxHeightPx, 24),
                background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}CC 100%)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between gap-4">
        {bars.map((bar) => (
          <span key={bar.id} className="flex-1 text-center text-xs leading-tight text-gray-500">
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}
