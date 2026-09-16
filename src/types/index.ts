// ============================================================
// src/types/index.ts — Shared TypeScript types
// ============================================================

export type Confidence = "low" | "medium" | "high";

// ── Product catalogue ────────────────────────────────────────
// The single source of truth for what the AI is allowed to recommend.
// `handle` is what Claude returns; everything else is used to render the CTA.
// Keep handles in sync with the Shopify product handles.

export interface JueFishProduct {
  handle: string;
  name: string;
  price: string;
  blurb: string;
  path: string;
}

export const PRODUCTS: JueFishProduct[] = [
  {
    handle: "stain-remover",
    name: "Jue-Fish Stain Remover (150 ml)",
    price: "$14.97",
    blurb: "Enzyme-based and colour-safe. For food, drink, blood, sweat, grass and pet stains on fabric.",
    path: "/products/jue-fish",
  },
  {
    handle: "mould-cleaner",
    name: "Jue-Fish Mold Cleaner (500 ml)",
    price: "$14.97",
    blurb: "Spray-on mould and mildew remover for tiles, grout, silicone and bathroom surfaces. No scrubbing.",
    path: "/products/jue-fish-mould-cleaner",
  },
  {
    handle: "washing-machine-tablets",
    name: "Jue-Fish Washing Machine Cleaning Tablets",
    price: "$14.97",
    blurb: "12 tablets, one a month. Clears odour, limescale and detergent build-up inside the machine.",
    path: "/products/jue-fish-washing-machine-tablets-1",
  },
  {
    handle: "cleaning-paste",
    name: "Jue-Fish Magic Cleaning Paste (500 g)",
    price: "$14.97",
    blurb: "Abrasive paste for rust, grease, burnt-on grime and tarnish. Sinks, pans, ovens, tiles, rims.",
    path: "/products/the-jue-fish-magic-cleaning-paste",
  },
  {
    handle: "mould-wm-bundle",
    name: "Mold & Washing Machine Cleaning Bundle",
    price: "$26.97",
    blurb: "Mold Cleaner + Washing Machine Tablets together. Save 55%.",
    path: "/products/mould-washing-machine-cleaning-bundle",
  },
  {
    handle: "family-rescue-kit",
    name: "Jue-Fish Family Rescue Kit",
    price: "$49.97",
    blurb: "All four products in one box: mould cleaner, stain remover, machine tablets and cleaning paste. Save 38%.",
    path: "/products/best-seller-family-rescue-kit",
  },
];

export const PRODUCT_HANDLES = PRODUCTS.map((p) => p.handle);

export function findProduct(handle: string): JueFishProduct | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

// ── Problem categories ───────────────────────────────────────
// Drives which follow-up questions are asked and which products are in play.

export const PROBLEM_CATEGORIES = [
  "Stain on fabric or carpet",
  "Mould or mildew",
  "Washing machine smell or build-up",
  "Grease, rust or burnt-on grime",
  "Not sure — help me figure it out",
] as const;

export type ProblemCategory = (typeof PROBLEM_CATEGORIES)[number];

// Categories where fabric type and stain age are relevant questions.
export const FABRIC_CATEGORIES: string[] = [
  "Stain on fabric or carpet",
  "Not sure — help me figure it out",
];

// ── Analysis result ──────────────────────────────────────────

export interface RecommendedProduct {
  handle: string;
  why: string;
}

export interface CleaningAnalysisResult {
  problem_guess: string;
  confidence: Confidence;
  can_jue_fish_help: boolean;
  reasoning_summary: string;
  steps: string[];
  warnings: string[];
  extra_tip: string;
  cta: string;
  recommended_product: RecommendedProduct | null;
  also_consider: RecommendedProduct | null;
}

// Kept as an alias so older imports keep compiling.
export type StainAnalysisResult = CleaningAnalysisResult;

export interface AnalyzeRequest {
  imageBase64?: string | null;
  imageMimeType?: "image/jpeg" | "image/png" | "image/webp" | null;
  description: string;
  category: string;
  material: string;
  stainAge: string;
}

export interface AnalyzeResponse {
  success: true;
  data: CleaningAnalysisResult;
}

export interface AnalyzeErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = AnalyzeResponse | AnalyzeErrorResponse;

// ── Form option lists ────────────────────────────────────────

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

export const SURFACES = [
  "Bathroom tiles or grout",
  "Silicone seal or sealant",
  "Painted wall or ceiling",
  "Shower screen or glass",
  "Kitchen sink or taps",
  "Pots, pans or oven",
  "Worktop or counter",
  "Washing machine drum",
  "Car wheels or rims",
  "Other / unknown",
] as const;

export type Surface = (typeof SURFACES)[number];

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
