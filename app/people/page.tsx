import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PeopleList } from "./PeopleList";

export const metadata: Metadata = {
  title: "The people",
  description: "Meet the 24 synthetic decision-makers in the room: what shapes their view and what they need.",
};

export default function PeoplePage() {
  return (
    <PageShell current="people">
      <PeopleList />
    </PageShell>
  );
}
