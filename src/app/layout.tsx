// ============================================================
// src/app/layout.tsx — Root layout
// ============================================================

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Cleaning Advice in Seconds",
  description:
    "Describe a stain, mould, a smelly washing machine or burnt-on grease and get step-by-step instructions plus the right Jue-Fish product. Free to use.",
  openGraph: {
    title: "Ask Jue Fish AI — Free Cleaning Advice",
    description:
      "Tell us the problem, get a step-by-step plan and the product that fixes it. Stains, mould, washing machines, grease and rust.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
