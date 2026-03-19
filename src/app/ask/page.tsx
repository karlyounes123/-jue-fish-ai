// ============================================================
// src/app/ask/page.tsx — Main AI tool page
// ============================================================

import type { Metadata } from "next";
import StainForm from "@/components/StainForm";
import Link from "next/link";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Free Stain Removal Advisor",
  description:
    "Upload a photo of your stain and get expert removal instructions in seconds. Powered by AI, trusted by Jue Fish.",
};

const SHOP_URL =
  process.env.NEXT_PUBLIC_SHOP_URL ||
  "https://your-store.com/products/stain-remover";

export default function AskPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── Nav ── */}
        <nav className="border-b border-[var(--color-border)]/60 bg-cream/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="font-display font-bold text-xl text-ink tracking-tight">
              <Image src="/logo end.png" alt="Jue Fish" width={150} height={36} className="object-contain" />
            </Link>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm font-semibold px-4 py-2 rounded-lg
                bg-brand-600 text-white hover:bg-brand-700
                transition-colors duration-150
              "
            >
              Shop Now
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <header className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <div className="max-w-xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 border border-brand-200 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
                AI-powered • Free to use
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
              Ask Jue Fish{" "}
              <span className="text-brand-600 italic">AI</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              Upload a photo of your stain, tell us about the fabric, and get
              personalised step-by-step removal instructions — powered by AI,
              trusted by Jue Fish.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["🍷 Wine", "☕ Coffee", "🩸 Blood", "🌿 Grass", "🐾 Pet stains"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/60 border border-[var(--color-border)] text-ink/70"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </header>

        {/* ── Form + Result ── */}
        <main className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <StainForm />
        </main>

        {/* ── How it works ── */}
        <section className="bg-white/40 border-t border-[var(--color-border)] py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-ink">
                How it works
              </h2>
              <p className="text-[var(--color-muted)] mt-2">
                Get expert stain advice in under 30 seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "📷",
                  step: "01",
                  title: "Upload a photo",
                  desc: "Take a clear photo of the stain. The closer the better — our AI needs to see it clearly.",
                },
                {
                  icon: "📝",
                  step: "02",
                  title: "Answer 3 questions",
                  desc: "Tell us the fabric type, how old the stain is, and optionally describe what caused it.",
                },
                {
                  icon: "✨",
                  step: "03",
                  title: "Get your answer",
                  desc: "Receive a personalised removal guide with step-by-step instructions and product tips.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl bg-white/60 border border-[var(--color-border)] p-6 relative overflow-hidden"
                >
                  <span className="absolute top-4 right-5 font-display text-5xl font-bold text-[var(--color-border)] select-none">
                    {item.step}
                  </span>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-ink text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tips section ── */}
        <section className="py-16 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink mb-4">
                Best results start fast
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                The sooner you treat a stain, the better your chances of full
                removal. Fresh stains haven't had time to bond with fabric
                fibres — giving Jue Fish Stain Remover the best possible
                conditions to work.
              </p>
              <ul className="space-y-2">
                {[
                  "Act within the first 30 minutes for best results",
                  "Blot — never rub — to avoid spreading",
                  "Cold water, not hot, for protein-based stains",
                  "Always patch test on delicate or coloured fabrics",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-ink/80">
                    <span className="text-brand-600 mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product callout */}
            <div className="rounded-2xl bg-ink text-cream p-7 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-600/20"
              />
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-600/10"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-widest text-cream/50 mb-2">
                  Pair with
                </p>
                <h3 className="font-display text-2xl font-bold mb-3">
                  Jue Fish Stain Remover
                </h3>
                <p className="text-sm text-cream/70 leading-relaxed mb-5">
                  Enzyme-based formula. Colour-safe. Works on over 30 stain types
                  — from food and wine to pet accidents and grass.
                </p>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-brand-400 text-ink font-bold text-sm
                    hover:bg-brand-300 transition-colors active:scale-95
                  "
                >
                  Shop Now →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[var(--color-border)] py-8">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
            <p>© {new Date().getFullYear()} Jue Fish. All rights reserved.</p>
            <p className="text-xs">
              AI advice is guidance only. Results may vary. Always patch test first.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
