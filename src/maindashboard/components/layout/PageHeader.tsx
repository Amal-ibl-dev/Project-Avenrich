"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  action?: {
    label: string;
    icon?: React.ComponentType<{ size?: number }>;
    onClick?: () => void;
  };
}

/**
 * Title row with a circular back button and an optional primary CTA.
 * Must be a Client Component: it uses next/navigation's useRouter() and
 * passes onClick handlers to <button>, both of which require a client
 * boundary in the App Router.
 */
export function PageHeader({ title, onBack, action }: PageHeaderProps) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.back());

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 rounded-full bg-[#1E5631] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#164124]"
        >
          {action.icon ? <action.icon size={16} /> : null}
          {action.label}
        </button>
      )}
    </div>
  );
}
