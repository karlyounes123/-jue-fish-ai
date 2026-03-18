// ============================================================
// src/app/api/analyze/route.ts — Backend API route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { analyzeStain } from "@/lib/claude";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
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
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Too many requests. Please wait a moment before trying again.",
      },
      { status: 429 }
    );
  }

  // ── Parse body ─────────────────────────────────────────────
  let body: {
    imageBase64?: string;
    imageMimeType?: string;
    description?: string;
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

  const { imageBase64, imageMimeType, description, material, stainAge } = body;

  // ── Validate inputs ────────────────────────────────────────
  if (!imageBase64) {
    return NextResponse.json(
      { success: false, error: "No image provided. Please upload a photo of the stain." },
      { status: 400 }
    );
  }

  if (!imageMimeType || !ACCEPTED_FILE_TYPES.includes(imageMimeType)) {
    return NextResponse.json(
      {
        success: false,
        error: `Unsupported image format. Please upload a JPG, PNG, or WebP image.`,
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

  if (!material) {
    return NextResponse.json(
      { success: false, error: "Please select the fabric or material type." },
      { status: 400 }
    );
  }

  if (!stainAge) {
    return NextResponse.json(
      { success: false, error: "Please select how old the stain is." },
      { status: 400 }
    );
  }

  // Sanitise description
  const safeDescription = (description ?? "").slice(0, 1000).trim();

  // ── Call Claude ────────────────────────────────────────────
  try {
    const result = await analyzeStain({
      imageBase64,
      imageMimeType: imageMimeType as "image/jpeg" | "image/png" | "image/webp",
      description: safeDescription,
      material,
      stainAge,
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
      : "Something went wrong while analyzing your stain. Please try again in a moment.";

    return NextResponse.json(
      { success: false, error: clientMessage },
      { status: 500 }
    );
  }
}
