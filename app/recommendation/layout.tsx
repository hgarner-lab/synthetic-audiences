import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign recommendation",
  description:
    "A five-stage campaign for Aramco Advantage Crude in China and Saudi Arabia, tested with 24 synthetic decision-makers in each.",
  openGraph: {
    title: "Campaign recommendation · McCann Audience Truth Engine",
    description:
      "A five-stage campaign for Aramco Advantage Crude in China and Saudi Arabia, tested with 24 synthetic decision-makers in each.",
  },
};

export default function RecommendationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
