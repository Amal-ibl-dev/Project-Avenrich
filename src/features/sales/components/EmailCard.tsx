import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import type { EmailItem } from "../types/sales.types";

interface EmailCardProps {
  title: string;
  emails: EmailItem[];
  onViewAll?: () => void;
  onToggleStar?: (id: string) => void;
}

export function EmailCard({ title, emails, onViewAll, onToggleStar }: EmailCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          onClick={onViewAll}
          aria-label={`View all ${title.toLowerCase()}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {emails.map((email) => (
          <div key={email.id} className="flex items-center justify-between gap-3 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={email.avatarUrl}
                alt={email.sender}
                className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 object-contain p-1.5"
              />
              <div className="min-w-0">
                <div className="font-semibold text-gray-900">{email.sender}</div>
                <div className="truncate text-sm text-gray-400">{email.subject}</div>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="text-xs text-gray-400">{email.date}</span>
              {email.unread && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
              <button
                onClick={() => onToggleStar?.(email.id)}
                aria-label={email.starred ? "Unstar email" : "Star email"}
                aria-pressed={email.starred}
                className="text-gray-300 transition-colors hover:text-amber-400"
              >
                <Star size={16} fill={email.starred ? "none" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
