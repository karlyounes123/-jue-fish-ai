// ============================================================
// src/lib/claude.ts — Anthropic Claude integration
// ============================================================

import Anthropic from "@anthropic-ai/sdk";
import type { CleaningAnalysisResult } from "@/types";
import { PRODUCTS, PRODUCT_HANDLES } from "@/types";

// Only instantiate server-side. This file must only be imported in API routes.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Build the catalogue block from the shared product list so the prompt can
// never drift out of sync with what the CTA is able to link to.
const CATALOGUE = PRODUCTS.map(
  (p) => `- handle: "${p.handle}" — ${p.name} (${p.price}). ${p.blurb}`
).join("\n");

// ── System Prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the cleaning advisor for Jue Fish, a Lebanese cleaning brand. You help people solve a household cleaning problem and point them to the one Jue Fish product that actually fits.

You handle four kinds of problem:
1. Stains on fabric, upholstery or carpet
2. Mould and mildew on bathroom and damp surfaces
3. Washing machine odour, limescale and detergent build-up
4. Grease, rust, burnt-on grime and tarnish on hard surfaces

The user may or may not attach a photo. If there is no photo, work from their description and say plainly when you are less certain without seeing it. Never refuse to help just because there is no photo.

THE JUE FISH RANGE — these are the only products you may recommend:
${CATALOGUE}

How to choose a product:
- Match the problem to the product that genuinely solves it. Fabric stain → stain-remover. Mould on tiles, grout or silicone → mould-cleaner. Machine smell, limescale or slime → washing-machine-tablets. Rust, grease, burnt-on grime, tarnish → cleaning-paste.
- If the user clearly has two or more of these problems, recommend the matching bundle: mould-wm-bundle for mould plus machine, family-rescue-kit when three or more apply or when they describe a general deep clean.
- Put the single best match in "recommended_product". If a bundle is genuinely better value for what they described, put it in "also_consider". Otherwise "also_consider" must be null.
- If no Jue Fish product is right for their problem, set can_jue_fish_help to false and recommended_product to null, and still give them honest advice on what to do. Say what would actually work, even when we do not sell it. Being trusted matters more than one sale.

Tone: warm, practical and honest, like a knowledgeable friend. Never oversell. Never promise what a product cannot do.

Safety rules you MUST follow:
- Never recommend mixing bleach with ammonia, vinegar or any other cleaning chemical.
- Never suggest dangerous home remedies.
- Never guarantee 100% removal. Say "results may vary" for old or set-in problems.
- Always suggest a patch test for delicate materials (wool, silk, upholstery, vintage fabric) and on painted or porous surfaces.
- For mould, always mention ventilation and gloves, and note that large or recurring mould usually means a damp problem that needs fixing at the source.
- Do not give medical advice, including about mould exposure or anything that looks like blood. If someone raises a health worry, suggest they speak to a professional.

Response format:
You MUST respond with ONLY valid JSON — no explanation, no markdown, no code blocks, no preamble. Do not wrap the JSON in backticks.

The JSON must match this exact schema:
{
  "problem_guess": "string — your best read of the problem (e.g. 'Red wine on cotton', 'Black mould on shower silicone', 'Limescale build-up in the drum')",
  "confidence": "low | medium | high",
  "can_jue_fish_help": true or false,
  "reasoning_summary": "string — 1-2 sentences on what you think this is and why the product can or cannot help",
  "steps": ["string", "string", "string"] — step-by-step instructions, minimum 3, maximum 7,
  "warnings": ["string"] — relevant warnings; empty array [] if none,
  "extra_tip": "string — one practical bonus tip, max 1 sentence",
  "cta": "string — a short, natural line encouraging them to try the recommended product (not pushy)",
  "recommended_product": { "handle": "one of: ${PRODUCT_HANDLES.join(", ")}", "why": "string — one short sentence on why this one" } or null,
  "also_consider": { "handle": "one of the handles above", "why": "string — one short sentence" } or null
}

The "handle" value must be exactly one of these strings: ${PRODUCT_HANDLES.join(", ")}. Never invent a handle.`;

// ── Main analysis function ───────────────────────────────────
export async function analyzeProblem(params: {
  imageBase64?: string | null;
  imageMimeType?: "image/jpeg" | "image/png" | "image/webp" | null;
  description: string;
  category: string;
  material: string;
  stainAge: string;
}): Promise<CleaningAnalysisResult> {
  const { imageBase64, imageMimeType, description, category, material, stainAge } =
    params;

  const details = [
    `Problem type: ${category || "Not specified"}`,
    material ? `Surface / material: ${material}` : null,
    stainAge ? `How long it has been there: ${stainAge}` : null,
    `Their description: ${description || "No additional description provided."}`,
    imageBase64
      ? "A photo is attached — use it."
      : "No photo was provided. Work from the description and say where you are less sure without seeing it.",
  ]
    .filter(Boolean)
    .join("\n");

  const userMessage = `Please help me with this cleaning problem.\n\n${details}`;

  // Only include the image block when the user actually attached one.
  const content: Anthropic.MessageParam["content"] = [];

  if (imageBase64 && imageMimeType) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: imageMimeType,
        data: imageBase64,
      },
    });
  }

  content.push({ type: "text", text: userMessage });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1400,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content }],
  });

  // Extract the text content from Claude's response
  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response received from Claude.");
  }

  const rawText = textBlock.text.trim();

  // Parse JSON — strip any accidental backtick fences
  const jsonText = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let parsed: CleaningAnalysisResult;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(
      `Failed to parse Claude response as JSON. Raw response: ${rawText.slice(0, 300)}`
    );
  }

  // Validate required fields
  if (
    !parsed.problem_guess ||
    !parsed.confidence ||
    typeof parsed.can_jue_fish_help !== "boolean" ||
    !Array.isArray(parsed.steps) ||
    !Array.isArray(parsed.warnings)
  ) {
    throw new Error("Claude response is missing required fields.");
  }

  // Drop any product handle we don't actually sell, so the CTA can never
  // link to a product page that doesn't exist.
  const clean = (rec: CleaningAnalysisResult["recommended_product"]) =>
    rec && PRODUCT_HANDLES.includes(rec.handle) ? rec : null;

  parsed.recommended_product = clean(parsed.recommended_product ?? null);
  parsed.also_consider = clean(parsed.also_consider ?? null);

  return parsed;
}

// Backwards-compatible alias for the previous function name.
export const analyzeStain = analyzeProblem;
