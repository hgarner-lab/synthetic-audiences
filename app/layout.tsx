import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

// Display and thin fonts for the collage direction (loaded as CSS variables only).
const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const thin = Inter({ weight: ["200", "300", "400"], subsets: ["latin"], variable: "--font-thin", display: "swap" });

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
    <html lang="en" className={`${display.variable} ${thin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
