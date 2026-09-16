// ============================================================
// src/components/ResultCard.tsx
// ============================================================

"use client";

import type { CleaningAnalysisResult, Confidence } from "@/types";
import { findProduct } from "@/types";

// The store root. Product paths come from the shared catalogue, so a missing
// env var can no longer send shoppers to a placeholder domain.
const STORE_ROOT = (
  process.env.NEXT_PUBLIC_SHOP_URL || "https://juefishcleaning.com"
).replace(/\/+$/, "");

const confidenceConfig: Record<
  Confidence,
  { label: string; color: string; bg: string }
> = {
  high: { label: "High confidence", color: "text-green-700", bg: "bg-green-50" },
  medium: { label: "Medium confidence", color: "text-amber-700", bg: "bg-amber-50" },
  low: { label: "Low confidence", color: "text-orange-700", bg: "bg-orange-50" },
};

interface ResultCardProps {
  result: CleaningAnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const conf = confidenceConfig[result.confidence] ?? confidenceConfig.low;

  const primary = result.recommended_product
    ? findProduct(result.recommended_product.handle)
    : undefined;
  const secondary = result.also_consider
    ? findProduct(result.also_consider.handle)
    : undefined;

  const primaryUrl = primary
    ? `${STORE_ROOT}${primary.path}`
    : `${STORE_ROOT}/collections/all-products`;

  return (
    <div className="animate-fade-up space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1">
            What we think this is
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
            {result.problem_guess}
          </h2>
        </div>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${conf.bg} ${conf.color}`}
        >
          {conf.label}
        </span>
      </div>

      {/* Can Jue Fish help? */}
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border ${
          result.can_jue_fish_help
            ? "bg-brand-50 border-brand-200"
            : "bg-orange-50 border-orange-200"
        }`}
      >
        <span className="text-xl mt-0.5">
          {result.can_jue_fish_help ? "✅" : "⚠️"}
        </span>
        <div>
          <p className="font-semibold text-sm">
            {result.can_jue_fish_help
              ? primary
                ? `${primary.name} can help`
                : "Jue Fish can help"
              : "Jue Fish isn't the right fix for this"}
          </p>
          <p className="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">
            {result.reasoning_summary}
          </p>
        </div>
      </div>

      {/* Steps */}
      {result.steps.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-widest text-[var(--color-muted)] mb-3">
            What to do
          </h3>
          <ol className="space-y-3">
            {result.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 items-start animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold font-display">
                  {i + 1}
                </span>
                <p className="text-sm text-ink leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800 text-sm mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Important warnings
          </h3>
          <ul className="space-y-1.5">
            {result.warnings.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-amber-800">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extra tip */}
      {result.extra_tip && (
        <div className="rounded-xl bg-white/60 border border-[var(--color-border)] p-4 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="font-semibold text-sm text-ink mb-1">Pro tip</p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {result.extra_tip}
            </p>
          </div>
        </div>
      )}

      {/* CTA — links to the product the AI actually chose */}
      {result.can_jue_fish_help && (
        <div className="rounded-2xl bg-ink text-cream p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-display text-xl font-bold leading-snug">
              {primary ? primary.name : "Ready to fix this?"}
            </p>
            {primary && (
              <p className="text-xs font-semibold text-brand-300 mt-1">
                {primary.price} · Cash on delivery across Lebanon
              </p>
            )}
            <p className="text-sm text-cream/70 mt-2">
              {result.recommended_product?.why || result.cta}
            </p>
          </div>
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              shrink-0 inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl font-bold text-sm
              bg-brand-400 text-ink hover:bg-brand-300
              transition-all duration-150 active:scale-95 whitespace-nowrap
            "
          >
            {primary ? "View product" : "Shop Jue Fish"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      )}

      {/* Secondary suggestion — usually a bundle when more than one problem applies */}
      {secondary && (
        <a
          href={`${STORE_ROOT}${secondary.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white/60 p-4 hover:border-brand-300 transition-colors"
        >
          <span className="text-xl shrink-0">📦</span>
          <div className="flex-1">
            <p className="font-semibold text-sm text-ink">
              Also worth a look: {secondary.name}{" "}
              <span className="text-[var(--color-muted)] font-normal">
                — {secondary.price}
              </span>
            </p>
            <p className="text-sm text-[var(--color-muted)] mt-0.5 leading-relaxed">
              {result.also_consider?.why || secondary.blurb}
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[var(--color-muted)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      )}
    </div>
  );
}
