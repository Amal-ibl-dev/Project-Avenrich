import { redirect } from "next/navigation";

/**
 * Root route. This is a Server Component — redirect() here runs on the
 * server before any HTML is sent, so there's no client-side router
 * involved (unlike react-router's <Navigate>, which requires a browser).
 */
export default function Home() {
  redirect("/financial");
}
