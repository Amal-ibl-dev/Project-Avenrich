import FinancialDashboard from "../../maindashboard/pages/FinancialDashboard";

/**
 * Route: /financial
 * This file itself stays a Server Component; the interactivity lives
 * inside FinancialDashboard.tsx, which is marked "use client".
 */
export default function FinancialPage() {
  return <FinancialDashboard />;
}
