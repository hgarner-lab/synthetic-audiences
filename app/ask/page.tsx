import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { AskTheRoom } from "@/components/AskTheRoom";

export const metadata: Metadata = {
  title: "Ask the room",
  description: "Put a question to 24 synthetic decision-makers and hear them answer side by side.",
};

export default function AskPage() {
  return (
    <PageShell current="ask">
      <AskTheRoom />
    </PageShell>
  );
}
