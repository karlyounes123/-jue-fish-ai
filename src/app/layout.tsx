// ============================================================
// src/app/layout.tsx — Root layout
// ============================================================

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Ask Jue Fish AI — Free Stain Removal",
  description: "Upload a stain photo → get expert removal steps in seconds.",
  type: "website",
  images: [
    {
      url: "https://jue-fish-ai-5f8y.vercel.app/og-image.jpg",
      width: 1200,
      height: 630,
    }
  ],
},

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
