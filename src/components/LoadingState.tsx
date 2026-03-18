// ============================================================
// src/components/LoadingState.tsx
// ============================================================

export default function LoadingState() {
  return (
    <div className="animate-fade-in space-y-5" aria-live="polite" aria-label="Analyzing your stain">
      {/* Header skeleton */}
      <div className="pb-4 border-b border-[var(--color-border)] space-y-2">
        <div className="shimmer h-3 w-28 rounded-full" />
        <div className="shimmer h-7 w-48 rounded-lg" />
      </div>

      {/* Reasoning block skeleton */}
      <div className="shimmer h-20 w-full rounded-xl" />

      {/* Steps skeleton */}
      <div className="space-y-3">
        <div className="shimmer h-3 w-24 rounded-full" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="shimmer w-7 h-7 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5 pt-1">
              <div className="shimmer h-3 w-full rounded-full" />
              <div className="shimmer h-3 w-3/4 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA skeleton */}
      <div className="shimmer h-20 w-full rounded-2xl" />

      {/* Spinner overlay */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <svg
          className="animate-spin text-brand-600"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            d="M12 3a9 9 0 10.001 18.001A9 9 0 0012 3z"
            opacity="0.25"
          />
          <path
            strokeLinecap="round"
            d="M12 3a9 9 0 019 9"
        
          />
        </svg>
        <p className="text-sm text-[var(--color-muted)] font-medium">
          Analysing your stain…
        </p>
      </div>
    </div>
  );
}
