import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { DecisionPath } from "./DecisionPath";
import "./decision.css";

export const metadata: Metadata = {
  title: "Follow the decision",
  description: "Follow your message through a refinery, person by person, and see where it gets through and where it stalls.",
};

export default function DecisionPage() {
  return (
    <PageShell current="journey">
      <DecisionPath />
    </PageShell>
  );
}
