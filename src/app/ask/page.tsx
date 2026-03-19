// ============================================================
// src/app/ask/page.tsx — Clean single-page redesign
// Replace the entire contents of this file with this code
// ============================================================

import type { Metadata } from "next";
import StainForm from "@/components/StainForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ask Jue Fish AI — Stain Removal Assistant",
  description:
    "Upload a photo of your stain and get expert removal instructions in seconds.",
};

export default function AskPage() {
  return (
    <div className="jf-page">
      {/* ── Header ── */}
      <header className="jf-header">
        <div className="jf-logo-wrap">
          <Image
            src="/logo end.png"
            alt="Jue Fish"
            width={140}
            height={34}
            className="jf-logo"
            priority
          />
        </div>
        <div className="jf-badge">
          <span className="jf-dot" />
          AI-POWERED · FREE
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="jf-hero">
        <p className="jf-eyebrow">Stain Removal Assistant</p>
        <h1 className="jf-title">
          What's the<br />
          <em>stain?</em>
        </h1>
        <p className="jf-sub">
          Upload a photo, answer 2 questions,<br />
          get expert removal steps in seconds.
        </p>

        {/* Trust row */}
        <div className="jf-trust">
          {["🔒 Photo never saved", "⚡ ~10s analysis", "✓ Free to use"].map((t) => (
            <span key={t} className="jf-trust-item">{t}</span>
          ))}
        </div>
      </section>

      {/* ── Form ── */}
      <section className="jf-form-section">
        <StainForm />
      </section>

      {/* ── Footer ── */}
      <footer className="jf-footer">
        <p>© {new Date().getFullYear()} Jue Fish · Results may vary · Always patch test first</p>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .jf-page {
          min-height: 100vh;
          background: #0d0d0d;
          color: #f5f0e8;
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .jf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .jf-logo {
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .jf-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        .jf-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* ── Hero ── */
        .jf-hero {
          padding: 48px 24px 32px;
          max-width: 480px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }

        .jf-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 16px;
        }

        .jf-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(42px, 10vw, 64px);
          font-weight: 700;
          line-height: 1.05;
          color: #f5f0e8;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .jf-title em {
          font-style: italic;
          color: #a78bfa;
        }

        .jf-sub {
          font-size: 15px;
          color: rgba(245,240,232,0.5);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .jf-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .jf-trust-item {
          font-size: 11px;
          font-weight: 600;
          color: rgba(245,240,232,0.45);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 12px;
          border-radius: 100px;
          letter-spacing: 0.02em;
        }

        /* ── Form section ── */
        .jf-form-section {
          flex: 1;
          max-width: 520px;
          margin: 0 auto;
          width: 100%;
          padding: 8px 16px 32px;
        }

        /* Override StainForm styles for dark theme */
        .jf-form-section label {
          color: rgba(245,240,232,0.6) !important;
        }

        .jf-form-section input,
        .jf-form-section textarea,
        .jf-form-section select {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.12) !important;
          color: #f5f0e8 !important;
        }

        .jf-form-section select option {
          background: #1a1a1a;
          color: #f5f0e8;
        }

        .jf-form-section textarea::placeholder {
          color: rgba(245,240,232,0.25) !important;
        }

        /* ── Footer ── */
        .jf-footer {
          padding: 20px 24px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .jf-footer p {
          font-size: 11px;
          color: rgba(245,240,232,0.2);
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
