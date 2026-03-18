// ============================================================
// src/components/ImageUploader.tsx
// ============================================================

"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES } from "@/types";

interface ImageUploaderProps {
  onImageSelect: (file: File, base64: string, mimeType: string) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageSelect,
  onError,
  disabled,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        onError("Please upload a JPG, PNG, or WebP image.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        onError(`Image is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // result is: "data:image/jpeg;base64,/9j/..."
        const base64 = result.split(",")[1];
        setPreview(result);
        setFileName(file.name);
        onImageSelect(file, base64, file.type);
      };
      reader.onerror = () => onError("Failed to read the image file. Please try again.");
      reader.readAsDataURL(file);
    },
    [onImageSelect, onError]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be re-selected if cleared
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClear = () => {
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-ink/80 tracking-wide uppercase">
        Stain Photo <span className="text-red-500">*</span>
      </label>

      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-3
            border-2 border-dashed rounded-2xl p-8 cursor-pointer
            transition-all duration-200 select-none
            ${isDragging
              ? "border-brand-600 bg-brand-50"
              : "border-[var(--color-border)] bg-white/40 hover:border-brand-400 hover:bg-white/60"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {/* Upload icon */}
          <div className={`
            w-14 h-14 rounded-full flex items-center justify-center transition-colors
            ${isDragging ? "bg-brand-100" : "bg-[var(--color-cream)]"}
          `}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-brand-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>

          <div className="text-center">
            <p className="font-semibold text-ink text-sm">
              {isDragging ? "Drop your photo here" : "Upload a stain photo"}
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              JPG, PNG, WebP — max {MAX_FILE_SIZE_MB}MB
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Drag & drop or click to browse
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES.join(",")}
            onChange={handleFileChange}
            disabled={disabled}
            className="sr-only"
            aria-label="Upload stain photo"
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-white/40">
          <div className="relative w-full h-56 sm:h-72">
            <Image
              src={preview}
              alt="Uploaded stain preview"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>

          {/* Overlay bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/80 backdrop-blur-sm border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 min-w-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs font-medium text-ink truncate max-w-[180px]">
                {fileName}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors shrink-0"
              aria-label="Remove image"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
