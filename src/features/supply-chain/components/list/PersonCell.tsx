import React from "react";
import type { PersonRef } from "../../types/supply-chain.types";

interface PersonCellProps {
  person: PersonRef;
  /** Centres the avatar + text block inside the cell. */
  align?: "left" | "center";
}

/** Avatar with the person's name and phone stacked beside it. */
export function PersonCell({ person, align = "left" }: PersonCellProps) {
  return (
    <div className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
      <img
        src={person.avatarUrl}
        alt=""
        aria-hidden="true"
        className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 object-cover"
      />
      <div className="min-w-0 leading-tight">
        <div className="truncate text-sm font-medium text-gray-800">{person.name}</div>
        <div className="truncate text-[11px] text-gray-400">{person.phone}</div>
      </div>
    </div>
  );
}
