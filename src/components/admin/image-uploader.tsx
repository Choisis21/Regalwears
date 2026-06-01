"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";

export function ImageUploader({
  value,
  onChange,
  multiple = true,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;
    setError("");
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of list) {
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setError(data.error || "Upload failed.");
          continue;
        }
        uploaded.push(data.url);
        if (!multiple) break;
      } catch {
        setError("Upload failed. Please try again.");
      }
    }

    setUploading(false);
    if (uploaded.length === 0) return;
    onChange(multiple ? [...value, ...uploaded] : [uploaded[0]]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const remove = (url: string) => onChange(value.filter((u) => u !== url));

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragging
            ? "border-burgundy bg-burgundy/5"
            : "border-border hover:border-burgundy/50",
        )}
      >
        {uploading ? (
          <Loader2 className="size-6 animate-spin text-burgundy" />
        ) : (
          <ImagePlus className="size-6 text-rosegold" />
        )}
        <p className="mt-3 text-sm font-medium text-foreground">
          {uploading ? "Uploading…" : "Drag & drop images here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse · JPG, PNG, WebP up to 5MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          hidden
          onChange={(e) => {
            if (e.target.files) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, i) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary"
            >
              <Image src={url} alt="" fill sizes="120px" className="object-cover" />
              {multiple && i === 0 && (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-burgundy px-2 py-0.5 text-[10px] font-medium text-cream">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(url)}
                aria-label="Remove image"
                className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-cream/90 text-burgundy shadow-sm transition-colors hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
