import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { ProfileProvider } from "@/components/Profile";
import "./globals.css";

// Archivo runs from very heavy and condensed to very thin, so headlines can mix weights
// the way McCann's current work does. Loaded as a variable font with its width axis.
const brand = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-brand", display: "swap" });
// Inter for body text, which stays even and readable at small sizes.
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

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
    <html lang="en" className={`${brand.variable} ${body.variable}`}>
      <body>
        {/* Brand texture: a thin gradient bar along the top edge, and printed grain over everything. */}
        <div className="edgeBar" aria-hidden="true" />
        <ProfileProvider>{children}</ProfileProvider>
        <div className="edgeBar edgeBarBottom" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
