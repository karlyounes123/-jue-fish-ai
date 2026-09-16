// ============================================================
// src/app/api/analyze/route.ts — Backend API route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { analyzeProblem } from "@/lib/claude";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  PROBLEM_CATEGORIES,
  FABRIC_CATEGORIES,
} from "@/types";

// Simple in-memory rate limiter (per IP, resets on server restart)
// For production, use Upstash Redis or similar.
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // ── Rate limit ─────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a moment before trying again.",
      },
      { status: 429 }
    );
  }

  // ── Parse body ─────────────────────────────────────────────
  let body: {
    imageBase64?: string | null;
    imageMimeType?: string | null;
    description?: string;
    category?: string;
    material?: string;
    stainAge?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { imageBase64, imageMimeType, description, category, material, stainAge } =
    body;

  // ── Validate inputs ────────────────────────────────────────
  // A photo is optional. Plenty of problems — a smelly washing machine,
  // mould behind a shower screen — are easier to describe than photograph,
  // and requiring an upload was turning those people away.
  if (!category || !PROBLEM_CATEGORIES.includes(category as never)) {
    return NextResponse.json(
      { success: false, error: "Please choose what kind of problem you have." },
      { status: 400 }
    );
  }

  const safeDescription = (description ?? "").slice(0, 1000).trim();

  // Without a photo we need at least a written description to work from.
  if (!imageBase64 && safeDescription.length < 10) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Add a photo, or describe the problem in a sentence or two so we can help.",
      },
      { status: 400 }
    );
  }

  if (imageBase64) {
    if (!imageMimeType || !ACCEPTED_FILE_TYPES.includes(imageMimeType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported image format. Please upload a JPG, PNG, or WebP image.",
        },
        { status: 400 }
      );
    }

    // Check base64 size (base64 is ~33% larger than binary)
    const estimatedBytes = Math.ceil((imageBase64.length * 3) / 4);
    if (estimatedBytes > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `Image is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
        },
        { status: 400 }
      );
    }
  }

  // Fabric type and age only make sense for fabric problems.
  if (FABRIC_CATEGORIES.includes(category) && !material) {
    return NextResponse.json(
      { success: false, error: "Please select the fabric or material type." },
      { status: 400 }
    );
  }

  // ── Call Claude ────────────────────────────────────────────
  try {
    const result = await analyzeProblem({
      imageBase64: imageBase64 ?? null,
      imageMimeType:
        (imageMimeType as "image/jpeg" | "image/png" | "image/webp") ?? null,
      description: safeDescription,
      category,
      material: material ?? "",
      stainAge: stainAge ?? "",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    console.error("[/api/analyze] Claude error:", message);

    // Don't leak internal errors to client
    const clientMessage = message.includes("Failed to parse")
      ? "We received an unexpected response from the AI. Please try again."
      : message.includes("API key")
      ? "Service configuration error. Please contact support."
      : "Something went wrong while analysing your problem. Please try again in a moment.";

    return NextResponse.json(
      { success: false, error: clientMessage },
      { status: 500 }
    );
  }
}
