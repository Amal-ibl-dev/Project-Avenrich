import type { ReactNode } from "react";
import { LoginBanner } from "./LoginBanner";

export interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Shell for all auth screens: a 50/50 split on large screens (brand banner
 * left, form right), collapsing to a form-only single column on mobile
 * (the banner's imagery is decorative and hidden below `lg`).
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full items-stretch bg-white">
      <div className="w-full lg:w-1/2">
        <LoginBanner />
      </div>

      <div className="flex w-full items-center justify-center px-6 py-16 lg:w-1/2 lg:px-16">
        {children}
      </div>
    </div>
  );
}
