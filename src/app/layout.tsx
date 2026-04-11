// ============================================================
// src/app/layout.tsx — Root layout
// ============================================================

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "Ask Jue Fish AI — Stain Removal Assistant",
  description:
    "Upload a photo of your stain and get personalised step-by-step removal instructions powered by AI. Jue Fish Stain Remover helps with food, drink, pet stains and more.",
  openGraph: {
    title: "Ask Jue Fish AI — Stain Removal Assistant",
    description:
      "Get expert stain removal advice in seconds. Upload a photo and let AI identify your stain.",
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
      <body className="font-body bg-cream text-ink antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
