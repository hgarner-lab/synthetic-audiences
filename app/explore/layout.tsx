import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Meet the 24 people behind the decision, ask them questions, and try new versions of the message.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
