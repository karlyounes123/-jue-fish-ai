// ============================================================
// src/types/index.ts — Shared TypeScript types
// ============================================================

export type Confidence = "low" | "medium" | "high";

export interface StainAnalysisResult {
  stain_guess: string;
  confidence: Confidence;
  can_jue_fish_help: boolean;
  reasoning_summary: string;
  steps: string[];
  warnings: string[];
  extra_tip: string;
  cta: string;
}

export interface AnalyzeRequest {
  imageBase64: string;
  imageMimeType: "image/jpeg" | "image/png" | "image/webp";
  description: string;
  material: string;
  stainAge: string;
}

export interface AnalyzeResponse {
  success: true;
  data: StainAnalysisResult;
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = AnalyzeResponse | AnalyzeErrorResponse;

export const MATERIALS = [
  "Cotton",
  "Polyester",
  "Wool",
  "Silk",
  "Denim",
  "Linen",
  "Upholstery",
  "Carpet",
  "Mattress",
  "Synthetic blend",
  "Unknown",
] as const;

export type Material = (typeof MATERIALS)[number];

export const STAIN_AGES = [
  "Fresh (just happened)",
  "A few hours old",
  "1 day old",
  "Several days old",
  "Old / set stain",
  "Unknown",
] as const;

export type StainAge = (typeof STAIN_AGES)[number];

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILE_SIZE_MB = 8;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
