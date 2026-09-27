import type { Metadata } from "next";
import "./globals.css";

const description =
  "Put a campaign message in front of the people who decide on it, and see how they react. A McCann prototype.";

export const metadata: Metadata = {
  title: { default: "Synthetic Audiences · McCann", template: "%s · Synthetic Audiences" },
  description,
  openGraph: { title: "Synthetic Audiences · McCann", description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
