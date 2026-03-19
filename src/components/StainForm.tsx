"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultCard from "@/components/ResultCard";
import LoadingState from "@/components/LoadingState";
import type { StainAnalysisResult } from "@/types";
import { MATERIALS, STAIN_AGES } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

export default function StainForm() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [stainAge, setStainAge] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [result, setResult] = useState<StainAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleImageSelect = (_file: File, base64: string, mime: string) => {
    setImageBase64(base64);
    setImageMimeType(mime);
    clearFieldError("image");
  };

  const handleImageError = (msg: string) => {
    setImageBase64(null);
    setImageMimeType(null);
    setFieldErrors((prev) => ({ ...prev, image: msg }));
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!imageBase64) errors.image = "Please upload a photo of the stain.";
    if (!material) errors.material = "Please select the fabric or material.";
    if (!stainAge) errors.stainAge = "Please select how old the stain is.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("loading");
    setResult(null);
    setErrorMessage("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          imageMimeType,
          description: description.trim(),
          material,
          stainAge,
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error || "Analysis failed.");
      setResult(json.data);
      setFormState("success");
      setTimeout(() => {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(msg);
      setFormState("error");
    }
  };

  const handleReset = () => {
    setFormState("idle");
    setResult(null);
    setErrorMessage("");
    setImageBase64(null);
    setImageMimeType(null);
    setDescription("");
    setMaterial("");
    setStainAge("");
    setFieldErrors({});
  };

  const isLoading = formState === "loading";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <ImageUploader
              onImageSelect={handleImageSelect}
              onError={handleImageError}
              disabled={isLoading}
            />
            {fieldErrors.image && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.image}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-ink/80 tracking-wide uppercase mb-2">
              Describe the stain{" "}
              <span className="text-[var(--color-muted)] font-normal normal-case">(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              maxLength={1000}
              rows={3}
              placeholder="e.g. Red wine spilled on my shirt at dinner last night..."
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white/60 text-sm text-ink placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="material" className="block text-sm font-semibold text-ink/80 tracking-wide uppercase mb-2">
              Fabric / Material <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="material"
                value={material}
                onChange={(e) => { setMaterial(e.target.value); clearFieldError("material"); }}
                disabled={isLoading}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-[var(--color-border)] bg-white/60 text-sm text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors disabled:opacity-50"
              >
                <option value="" disabled>Select fabric or material…</option>
                {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {fieldErrors.material && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.material}</p>
            )}
          </div>

          <div>
            <label htmlFor="stainAge" className="block text-sm font-semibold text-ink/80 tracking-wide uppercase mb-2">
              How old is the stain? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="stainAge"
                value={stainAge}
                onChange={(e) => { setStainAge(e.target.value); clearFieldError("stainAge"); }}
                disabled={isLoading}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-[var(--color-border)] bg-white/60 text-sm text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors disabled:opacity-50"
              >
                <option value="" disabled>Select stain age…</option>
                {STAIN_AGES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {fieldErrors.stainAge && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.stainAge}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-ink text-cream font-bold text-base hover:bg-ink/80 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-ink/10"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a9 9 0 10.001 18.001A9 9 0 0012 3z" opacity="0.25" />
                  <path strokeLinecap="round" d="M12 3a9 9 0 019 9" />
                </svg>
                Analysing stain…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Analyse My Stain
              </>
            )}
          </button>

          {formState === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3">
              <p className="text-sm text-red-600">{errorMessage}</p>
              <button type="button" onClick={handleReset} className="text-xs font-semibold text-red-700 underline">Try again</button>
            </div>
          )}
        </form>
      </div>

      <div id="result-section">
        {formState === "idle" && (
          <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-72 rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center">
            <div className="text-5xl mb-4">🧴</div>
            <p className="font-display text-xl font-semibold text-ink/50">Your analysis will appear here</p>
            <p className="text-sm text-[var(--color-muted)] mt-2">Upload a photo and fill in the details to get started.</p>
          </div>
        )}
        {formState === "loading" && (
          <div className="bg-white/50 rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
            <LoadingState />
          </div>
        )}
        {formState === "success" && result && (
          <div className="bg-white/50 rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
            <ResultCard result={result} />
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <button type="button" onClick={handleReset} className="text-sm font-semibold text-[var(--color-muted)] hover:text-ink transition-colors">
                ↺ Analyse another stain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
