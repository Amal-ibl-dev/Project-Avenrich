import { redirect } from "next/navigation";

/**
 * Root route. Server Component — redirect() runs before any HTML is sent.
 */
export default function Home() {
  redirect("/financial");
}
