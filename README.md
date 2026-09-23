# Avenrich

Supply chain / ERP-style dashboard for a tea & beverage company. Next.js (App
Router) + TypeScript + React + Tailwind CSS v4, structured as a **modular
monolith**: one deployable app, split into feature modules that own their own
UI/types/constants, sitting on one shared kernel.

See [`docs/architecture.md`](./docs/architecture.md) for the full rationale,
folder-by-folder guide, and the Tailwind theming approach. The short version:

```
src/
├── app/        # Next.js routes only — every page.tsx re-exports a screen
├── features/   # auth, finance, sales, inventory, quality, blend, supply-chain
└── shared/     # layout (Sidebar/TopNav/PageHeader), ui, charts, theme,
                # types, constants, utils — no feature imports allowed here
```

**The one rule:** `features/*` may import `shared/*`. `shared/*` never
imports `features/*`. `features/a` never imports `features/b` — if two
features need the same thing, it belongs in `shared/`. This is enforced by
`eslint-plugin-boundaries` (see `eslint.config.mjs`) — `npm run lint` fails
the build if a feature reaches into another feature.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` — it redirects to `/financial`.

## Routes

| Route | Screen |
| --- | --- |
| `/login` | `features/auth` |
| `/financial` | Financial Dashboard |
| `/financial/overview` | Financial Overview (AR/AP aging, cash flow) |
| `/sales` | Sales Dashboard |
| `/sales/customers` | Customer List |
| `/sales/orders` | Sales Order List |
| `/sales/orders/report` | Sales Order Report |
| `/sales/report` | Overall Sales Report |
| `/inventory` | Inventory Dashboard |
| `/quality` | Quality Dashboard |
| `/blend` | Blend Overview (dashboard) |
| `/blend/list` | Blend List (with Create Blend + view-blend modals) |
| `/supply-chain/products` | Product List |
| `/supply-chain/production-orders` | Production Order List |
| `/supply-chain/suppliers` | Supplier List |
| `/supply-chain/purchase-orders` | Purchase Order List |
| `/supply-chain/grn` | GRN List |

## What changed in this rewrite

This replaces the previous ad-hoc layout (`Financial-Overvew/`,
`inventoryDashboard/`, `maindashboard/`, `qualityDashboard/`,
`blend-overview/`, `supplyChainDashboard/`, `LoginForm/`, each with their own
`components/constants/types/pages`) with the `features/` + `shared/`
structure above. Along the way, a few pre-existing bugs in the old layout
were fixed rather than carried forward:

- `app/financial/page.tsx` imported `FinancialDashboard` but actually
  rendered `GrnListPage` (a leftover from testing) — now renders the right
  screen.
- `TeaStockCard` imported a `DualBarChart` component that never existed
  anywhere in the old codebase (broken import) — authored fresh at
  `shared/components/charts/DualBarChart/`.
- Four of the five supply-chain list pages imported `ListPageShell` and
  `usePagination` from paths that didn't exist (`components/supply-chain/…`,
  `hooks/usePagination`) — only `GrnListPage` had the correct path. All five
  now import consistently.
- `PeriodDropdown` was imported from two different misspelled module names
  (`supplyChain/...` and `supply-chain/...`, neither of which existed) in
  `blend-overview` and `Financial-Overvew` — now imported from its real
  (shared) location.
- The Supply Chain sidebar's own nav item pointed at `/supplyChain` while
  every other route in the app uses kebab-case (`/supply-chain/...`) — fixed
  for consistency.
- `Pagination.tsx` existed twice (`maindashboard` and `supplyChainDashboard`)
  with slightly different implementations — consolidated to the more
  complete one (aria-label, `aria-current`, disabled states) as
  `shared/components/ui/Pagination.tsx`.
- `NavItem` / `SidebarConfig` / `CurrentUser` — needed by every feature's
  sidebar config — used to live inside the finance module's
  `dashboard.types.ts`, which is why almost every other feature had a
  broken or cross-module import reaching into `maindashboard/`. They now
  live in `shared/types/navigation.types.ts`.
- `RawMaterialAllocation` was defined in `blend`'s types but also used by
  `quality` (which imported across feature boundaries to get it) — moved to
  `shared/types/material.types.ts`.
- `quality`'s dashboard imported `TopRawMaterialCard` through `blend`'s
  component barrel; it now imports it directly from
  `shared/components/ui/`, where the component actually lives.
- `ListPageShell`, `ActionButton`, and `RowActionButton` started out
  hardcoded to `features/supply-chain` (sidebar/user baked in, colors from
  that feature's `LIST_THEME`). Once `features/blend`'s new Blend List page
  needed the exact same shell/buttons, all three moved to `shared/` —
  `ActionButton` now reads the Tailwind theme tokens instead of
  `LIST_THEME`, and `ListPageShell` takes `sidebar`/`user` as props instead
  of importing a specific feature's constants. Supply-chain's own
  `ListPageShell` is now a thin wrapper that just supplies its sidebar/user
  and its Filter pill — none of its five list pages had to change.

## New screens built from mockups

`features/blend/screens/BlendListPage.tsx` (route `/blend/list`) and its two
modals — `BlendDetailModal` ("view blend", opened from a row's arrow button)
and `CreateBlendModal` (opened from "+ Add Blend Order") — are new, built to
match the Blend List / Ceylon Black Tea / Create Blend mockups. They're not
migrated from the original zip; `BlendOverviewPage` (`/blend`) already
existed and needed no changes. Mock data for the list and the one fleshed-out
detail record (`BL-0001` / Ceylon Black Tea) live in
`features/blend/constants/blend.constants.ts` alongside the dashboard's data.

## Not yet wired up

- No backend — every feature's `constants/*.ts` still holds mock data in
  place of a `services/` layer. See `docs/architecture.md` §7 for the
  suggested `apiClient` + TanStack Query approach.
- `/financial/overview`'s sub-nav (invoice list, AR, AP, cost breakdown —
  see `FINANCIAL_OVERVIEW_SIDEBAR` in
  `features/finance/constants/financial-overview.constants.ts`) links to
  routes that don't have screens built yet.
- `/supply-chain` has no standalone overview/dashboard screen in this
  codebase (only the 5 list pages), so it redirects straight to
  `/supply-chain/products`.
