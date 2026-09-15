import { redirect } from "next/navigation";
import SupplyChainDashboard from "../supplyChain/pages/SupplyChainDashboard";
import FinancialDashboard from "../maindashboard/pages/FinancialDashboard";
import FinancialOverviewPage from "../Financial-Overvew/pages/FinancialOverviewPage";
import BlendOverviewPage from "../blend-overview/pages/BlendOverviewPage";
import InventoryDashboardPage from "../inventoryDashboard/pages/InventoryDashboardPage";
import QualityDashboardPage from "../qualityDashboard/pages/QualityDashboardPage";

/**
 * Root route. This is a Server Component — redirect() here runs on the
 * server before any HTML is sent, so there's no client-side router
 * involved (unlike react-router's <Navigate>, which requires a browser).
 */
// export default function Home() {
//   redirect("/financial");
// }

export default function SupplyChainPage() {
  return <FinancialOverviewPage />;
}
