"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultCard from "@/components/ResultCard";
import LoadingState from "@/components/LoadingState";
import type { CleaningAnalysisResult } from "@/types";
import {
  MATERIALS,
  SURFACES,
  STAIN_AGES,
  PROBLEM_CATEGORIES,
  FABRIC_CATEGORIES,
} from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

const selectClass =
  "w-full px-4 py-3 pr-10 rounded-xl border border-[var(--color-border)] bg-white/60 text-sm text-ink appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors disabled:opacity-50";

const labelClass =
  "block text-sm font-semibold text-ink/80 tracking-wide uppercase mb-2";

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function StainForm() {
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [stainAge, setStainAge] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [result, setResult] = useState<CleaningAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Fabric questions only make sense for fabric problems.
  const isFabric = FABRIC_CATEGORIES.includes(category);
  const materialOptions = isFabric ? MATERIALS : SURFACES;
  const materialLabel = isFabric ? "Fabric / material" : "Surface";

  const handleImageSelect = (_file: File, base64: string, mime: string) => {
    setImageBase64(base64);
    setImageMimeType(mime);
    clearFieldError("image");
    clearFieldError("description");
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
    if (!category) errors.category = "Please choose what you're dealing with.";
    // A photo is optional — but we need something to go on.
    if (!imageBase64 && description.trim().length < 10) {
      errors.description =
        "Add a photo, or describe the problem in a sentence or two.";
    }
    if (isFabric && !material) errors.material = "Please select the fabric or material.";
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
          category,
          material,
          stainAge,
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error || "Analysis failed.");
      setResult(json.data);
      setFormState("success");
      setTimeout(() => {
        document
          .getElementById("result-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    setCategory("");
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
          {/* 1 — What kind of problem */}
          <div>
            <label htmlFor="category" className={labelClass}>
              What are you dealing with? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setMaterial("");
                  clearFieldError("category");
                }}
                disabled={isLoading}
                className={selectClass}
              >
                <option value="" disabled>
                  Choose your problem…
                </option>
                {PROBLEM_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            {fieldErrors.category && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {fieldErrors.category}
              </p>
            )}
          </div>

          {/* 2 — Optional photo */}
          <div>
            <ImageUploader
              onImageSelect={handleImageSelect}
              onError={handleImageError}
              disabled={isLoading}
            />
            <p className="mt-1.5 text-xs text-[var(--color-muted)]">
              Optional — a photo helps, but a good description works too.
            </p>
            {fieldErrors.image && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {fieldErrors.image}
              </p>
            )}
          </div>

          {/* 3 — Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Describe the problem
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim().length >= 10) clearFieldError("description");
              }}
              disabled={isLoading}
              maxLength={1000}
              rows={3}
              placeholder="e.g. Black mould along the silicone in my shower, keeps coming back…"
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white/60 text-sm text-ink placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none transition-colors disabled:opacity-50"
            />
            {fieldErrors.description && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {fieldErrors.description}
              </p>
            )}
          </div>

          {/* 4 — Surface or fabric */}
          {category && category !== "Washing machine smell or build-up" && (
            <div>
              <label htmlFor="material" className={labelClass}>
                {materialLabel}{" "}
                {isFabric ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-[var(--color-muted)] font-normal normal-case">
                    (optional)
                  </span>
                )}
              </label>
              <div className="relative">
                <select
                  id="material"
                  value={material}
                  onChange={(e) => {
                    setMaterial(e.target.value);
                    clearFieldError("material");
                  }}
                  disabled={isLoading}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select {materialLabel.toLowerCase()}…
                  </option>
                  {materialOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
              {fieldErrors.material && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {fieldErrors.material}
                </p>
              )}
            </div>
          )}

          {/* 5 — How long (fabric only) */}
          {isFabric && (
            <div>
              <label htmlFor="stainAge" className={labelClass}>
                How old is it?{" "}
                <span className="text-[var(--color-muted)] font-normal normal-case">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <select
                  id="stainAge"
                  value={stainAge}
                  onChange={(e) => setStainAge(e.target.value)}
                  disabled={isLoading}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {STAIN_AGES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>
          )}

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
                Working it out…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Get my cleaning plan
              </>
            )}
          </button>

          {formState === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3">
              <p className="text-sm text-red-600">{errorMessage}</p>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-red-700 underline"
              >
                Try again
              </button>
            </div>
          )}
        </form>
      </div>

      <div id="result-section">
        {formState === "idle" && (
          <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-72 rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center">
            <div className="text-5xl mb-4">🧴</div>
            <p className="font-display text-xl font-semibold text-ink/50">
              Your cleaning plan will appear here
            </p>
            <p className="text-sm text-[var(--color-muted)] mt-2">
              Tell us what you&apos;re dealing with to get started.
            </p>
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
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-semibold text-[var(--color-muted)] hover:text-ink transition-colors"
              >
                ↺ Ask about something else
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
