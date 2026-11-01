import { redirect } from "next/navigation";

// Backwards-compatible route: the canonical route uses the plural "contributions".
export default function LegacyContributionPage(): never {
  redirect("/organization/contributions");
}
