import { redirect } from "next/navigation";

/** Route: /supply-chain — no standalone overview screen shipped yet, so land on the first list. */
export default function SupplyChainIndexPage() {
  redirect("/supply-chain/products");
}
