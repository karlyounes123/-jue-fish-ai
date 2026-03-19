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
  const [errorMessage, setErrorMessage] = useState("");
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
    setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
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
        body: JSON.stringify({ imageBase64, imageMimeType, description: description.trim(), material, stainAge }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error || "Analysis failed.");
      setResult(json.data);
      setFormState("success");
      setTimeout(() => {
        document.getElementById("jf-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
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
    <div className="jf-stain-form">
      <style>{`
        .jf-stain-form { display: flex; flex-direction: column; gap: 0; }

        .jf-field { margin-bottom: 16px; }

        .jf-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          margin-bottom: 8px;
        }

        .jf-upload-box {
          border: 1.5px dashed rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.03);
        }
        .jf-upload-box:hover {
          border-color: #7c3aed;
          background: rgba(124,58,237,0.08);
        }
        .jf-upload-icon { font-size: 32px; margin-bottom: 10px; }
        .jf-upload-text { font-size: 14px; font-weight: 600; color: #f5f0e8; }
        .jf-upload-hint { font-size: 12px; color: rgba(245,240,232,0.35); margin-top: 4px; }

        .jf-preview {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        .jf-preview img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .jf-preview-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(255,255,255,0.05);
          font-size: 12px;
        }
        .jf-remove-btn {
          background: none;
          border: none;
          color: #f87171;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .jf-textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 16px;
          color: #f5f0e8;
          font-size: 14px;
          font-family: inherit;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
        }
        .jf-textarea:focus { border-color: #7c3aed; }
        .jf-textarea::placeholder { color: rgba(245,240,232,0.25); }

        .jf-select-wrap { position: relative; }
        .jf-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 40px 14px 16px;
          color: #f5f0e8;
          font-size: 14px;
          font-family: inherit;
          appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .jf-select:focus { border-color: #7c3aed; }
        .jf-select option { background: #1a1a1a; }
        .jf-select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(245,240,232,0.4);
          font-size: 12px;
        }

        .jf-field-error {
          font-size: 11px;
          color: #f87171;
          margin-top: 6px;
          font-weight: 600;
        }

        .jf-submit-btn {
          width: 100%;
          padding: 16px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.15s;
          margin-top: 8px;
          letter-spacing: 0.02em;
        }
        .jf-submit-btn:hover { background: #6d28d9; }
        .jf-submit-btn:active { transform: scale(0.98); }
        .jf-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .jf-error-box {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 14px;
          padding: 16px;
          margin-top: 12px;
          font-size: 13px;
          color: #fca5a5;
        }
        .jf-error-retry {
          background: none;
          border: none;
          color: #f87171;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          font-size: 12px;
          margin-top: 6px;
          display: block;
          padding: 0;
        }

        .jf-result-wrap {
          margin-top: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 24px 20px;
        }

        .jf-reset-btn {
          background: none;
          border: none;
          color: rgba(245,240,232,0.4);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .jf-reset-btn:hover { color: rgba(245,240,232,0.7); }

        .jf-loading-wrap {
          margin-top: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 24px 20px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .jf-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <form onSubmit={handleSubmit} noValidate>
        {/* Image Upload */}
        <div className="jf-field">
          <label className="jf-label">Stain Photo *</label>
          <JFImageUploader
            onSelect={handleImageSelect}
            onError={handleImageError}
            disabled={isLoading}
          />
          {fieldErrors.image && <p className="jf-field-error">{fieldErrors.image}</p>}
        </div>

        {/* Description */}
        <div className="jf-field">
          <label className="jf-label">Describe the stain <span style={{fontWeight:400, textTransform:'none', letterSpacing:0}}>(optional)</span></label>
          <textarea
            className="jf-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            maxLength={500}
            rows={2}
            placeholder="e.g. Red wine on my shirt, happened last night..."
          />
        </div>

        {/* Material */}
        <div className="jf-field">
          <label className="jf-label">Fabric / Material *</label>
          <div className="jf-select-wrap">
            <select
              className="jf-select"
              value={material}
              onChange={(e) => { setMaterial(e.target.value); clearFieldError("material"); }}
              disabled={isLoading}
            >
              <option value="" disabled>Select material…</option>
              {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="jf-select-arrow">▼</span>
          </div>
          {fieldErrors.material && <p className="jf-field-error">{fieldErrors.material}</p>}
        </div>

        {/* Stain Age */}
        <div className="jf-field">
          <label className="jf-label">How old is the stain? *</label>
          <div className="jf-select-wrap">
            <select
              className="jf-select"
              value={stainAge}
              onChange={(e) => { setStainAge(e.target.value); clearFieldError("stainAge"); }}
              disabled={isLoading}
            >
              <option value="" disabled>Select age…</option>
              {STAIN_AGES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <span className="jf-select-arrow">▼</span>
          </div>
          {fieldErrors.stainAge && <p className="jf-field-error">{fieldErrors.stainAge}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="jf-submit-btn" disabled={isLoading}>
          {isLoading ? (
            <><div className="jf-spinner" /> Analysing stain…</>
          ) : (
            <>✦ Analyse My Stain</>
          )}
        </button>

        {formState === "error" && (
          <div className="jf-error-box">
            <strong>Failed:</strong> {errorMessage}
            <button type="button" className="jf-error-retry" onClick={handleReset}>Try again</button>
          </div>
        )}
      </form>

      {/* Loading */}
      {formState === "loading" && (
        <div className="jf-loading-wrap">
          <LoadingState />
        </div>
      )}

      {/* Result */}
      {formState === "success" && result && (
        <div className="jf-result-wrap" id="jf-result">
          <ResultCard result={result} />
          <button type="button" className="jf-reset-btn" onClick={handleReset}>
            ↺ Analyse another stain
          </button>
        </div>
      )}
    </div>
  );
}

// Inline image uploader for dark theme
function JFImageUploader({ onSelect, onError, disabled }: {
  onSelect: (file: File, base64: string, mime: string) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useState<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    const accepted = ["image/jpeg", "image/png", "image/webp"];
    if (!accepted.includes(file.type)) { onError("Please upload JPG, PNG, or WebP."); return; }
    if (file.size > 8 * 1024 * 1024) { onError("Max size is 8MB."); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setFileName(file.name);
      onSelect(file, result.split(",")[1], file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleClear = () => { setPreview(null); setFileName(null); };

  if (preview) {
    return (
      <div className="jf-preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Stain preview" />
        <div className="jf-preview-bar">
          <span style={{fontSize:12, color:'rgba(245,240,232,0.5)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:200}}>{fileName}</span>
          <button type="button" className="jf-remove-btn" onClick={handleClear} disabled={disabled}>Remove</button>
        </div>
      </div>
    );
  }

  return (
    <label
      className="jf-upload-box"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={disabled ? {opacity:0.5, cursor:'not-allowed'} : {}}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={disabled}
        style={{display:'none'}}
      />
      <div className="jf-upload-icon">📷</div>
      <p className="jf-upload-text">Upload a stain photo</p>
      <p className="jf-upload-hint">JPG, PNG, WebP · max 8MB · drag & drop or tap</p>
    </label>
  );
}
