import type { LucideIcon } from "lucide-react";

/**
 * Cross-feature navigation types. Every feature's sidebar config is one of
 * these, so Sidebar/TopNav (shared/components/layout) can render any of
 * them without depending on a specific feature.
 */

/** A single sidebar/nav entry. */
export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Route path this item links to, e.g. "/sales". */
  path: string;
  active?: boolean;
}

/** A named group of sidebar nav items for one department/module (e.g. "Sales"). */
export interface SidebarConfig {
  menuLabel: string;
  items: NavItem[];
}

/** Currently signed-in user, shown in the top nav profile card. */
export interface CurrentUser {
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}
