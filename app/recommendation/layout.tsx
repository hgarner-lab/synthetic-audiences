import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign recommendation",
  description:
    "Proof you can check: a five-stage campaign for Aramco Advantage Crude in China, tested with 24 synthetic decision-makers.",
  openGraph: {
    title: "Campaign recommendation · MATE",
    description:
      "Proof you can check: a five-stage campaign for Aramco Advantage Crude in China, tested with 24 synthetic decision-makers.",
  },
};

export default function RecommendationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
