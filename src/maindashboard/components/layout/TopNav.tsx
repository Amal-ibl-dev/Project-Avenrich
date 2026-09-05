
import React from "react";
import { Search, Bell } from "lucide-react";
import { CURRENT_USER } from "../../constants/dashboard.constants";
import type { CurrentUser } from "../../types/dashboard.types";

interface TopNavProps {
  user?: CurrentUser; 
}

export function TopNav({ user = CURRENT_USER }: TopNavProps) {
  return (
    <header className="flex items-center rounded-4xl justify-between bg-[#e6e8ed] mt-6">
      <div className="relative w-full max-w-md">
        <Search size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black-500" />
        <input
          type="text"
          placeholder="Search Task"
          className="w-[409px] rounded-full bg-white py-2.5 pl-10 pr-2 text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="ml-4 flex flex-shrink-0 items-center gap-4">
        <button
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 rounded-full bg-[#e6e8ed] py-1.5 pl-1.5 pr-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-400">{user.role}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
