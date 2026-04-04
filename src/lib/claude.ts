// ============================================================
// src/lib/claude.ts — Anthropic Claude integration
// ============================================================

import Anthropic from "@anthropic-ai/sdk";
import type { StainAnalysisResult } from "@/types";

// Only instantiate server-side. This file must only be imported in API routes.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── System Prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a helpful stain-removal assistant for Jue Fish, a trusted cleaning brand.

Your job is to look at a photo of a stain (if provided), read the user's description, consider the fabric type and how old the stain is, and give them a clear, practical answer.

About Jue Fish Stain Remover:
- It is an enzyme-based, colour-safe stain remover suitable for most fabrics.
- It works best on organic stains: food, drink, blood, sweat, pet accidents, grass, mud, and similar.
- It is not a solvent, so it is less effective on pure oil-based, ink, or rust stains without pre-treatment.
- It is gentle enough for cotton, polyester, denim, linen, and most synthetics.
- For wool, silk, and upholstery, recommend a patch test first.
- For carpet and mattress, recommend spot application only.

Tone: be warm, practical, and honest. You are like a knowledgeable friend, not a salesperson. Never oversell. Never promise what the product cannot do.

Safety rules you MUST follow:
- Never recommend mixing bleach with any other chemical.
- Never suggest dangerous home remedies.
- Never guarantee 100% stain removal.
- Always say "results may vary" for old or set-in stains.
- Always suggest a patch test for delicate materials (wool, silk, upholstery, vintage fabrics).
- Do not give medical advice even if a stain looks like blood.

Response format:
You MUST respond with ONLY valid JSON — no explanation, no markdown, no code blocks, no preamble.
Do not wrap the JSON in backticks.

The JSON must match this exact schema:
{
  "stain_guess": "string — your best guess at the stain type (e.g. 'Red wine', 'Coffee', 'Mud', 'Unknown')",
  "confidence": "low | medium | high",
  "can_jue_fish_help": true or false,
  "reasoning_summary": "string — 1-2 sentences explaining your analysis and why Jue Fish can or cannot help",
  "steps": ["string", "string", "string"] — numbered step-by-step instructions, minimum 3 steps, maximum 7,
  "warnings": ["string"] — any relevant warnings; empty array [] if none,
  "extra_tip": "string — one practical bonus tip (keep short, max 1 sentence)",
  "cta": "string — a short, natural conversion message encouraging them to try Jue Fish Stain Remover (not pushy)"
}`;

// ── Main analysis function ───────────────────────────────────
export async function analyzeStain(params: {
  imageBase64: string;
  imageMimeType: "image/jpeg" | "image/png" | "image/webp";
  description: string;
  material: string;
  stainAge: string;
}): Promise<StainAnalysisResult> {
  const { imageBase64, imageMimeType, description, material, stainAge } =
    params;

  const userMessage = `Please analyze this stain and help me remove it.

Fabric / material: ${material}
How old is the stain: ${stainAge}
My description: ${description || "No additional description provided."}

Look at the image and give me your best guidance.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: imageMimeType,
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: userMessage,
          },
        ],
      },
    ],
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

  let parsed: StainAnalysisResult;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(
      `Failed to parse Claude response as JSON. Raw response: ${rawText.slice(0, 300)}`
    );
  }

  // Validate required fields
  if (
    !parsed.stain_guess ||
    !parsed.confidence ||
    typeof parsed.can_jue_fish_help !== "boolean" ||
    !Array.isArray(parsed.steps) ||
    !Array.isArray(parsed.warnings)
  ) {
    throw new Error("Claude response is missing required fields.");
  }

  return parsed;
}
