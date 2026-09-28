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
  "Put your message in front of 24 people built from McCann audience data, and see who leans in, who pushes back and why.";

// Link previews need the full web address of the share image. On Vercel this is the live site.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "McCann Audience Truth Engine", template: "%s · McCann Audience Truth Engine" },
  description,
  openGraph: { title: "McCann Audience Truth Engine", description, siteName: "McCann Audience Truth Engine", type: "website" },
  twitter: { card: "summary_large_image" },
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
