"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Search } from "lucide-react";

import { cn } from "@/lib/utils";

const DEFAULT_DOMAIN = "regalwears.com";

export function SeoPreview({
  title,
  description,
  path,
  image,
  domain = DEFAULT_DOMAIN,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  domain?: string;
}) {
  const [tab, setTab] = useState<"search" | "social">("search");

  const cleanPath = path.replace(/^\//, "");
  const crumbs = cleanPath ? cleanPath.split("/").filter(Boolean) : [];
  const safeTitle = title.trim() || "Your page title";
  const safeDesc =
    description.trim() ||
    "Your meta description will show here. Add one to entice clicks from search and social.";

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-1 rounded-full bg-secondary p-1 text-sm">
        <button
          type="button"
          onClick={() => setTab("search")}
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors",
            tab === "search" ? "bg-cream text-burgundy shadow-sm" : "text-foreground/60",
          )}
        >
          <Search className="size-4" /> Search
        </button>
        <button
          type="button"
          onClick={() => setTab("social")}
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors",
            tab === "social" ? "bg-cream text-burgundy shadow-sm" : "text-foreground/60",
          )}
        >
          <Globe className="size-4" /> Social
        </button>
      </div>

      {tab === "search" ? (
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs text-[#4d5156]">
            <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-burgundy">
              R
            </span>
            <div className="leading-tight">
              <div className="text-[#202124]">Regal Wears</div>
              <div className="text-[#4d5156]">
                https://{domain}
                {crumbs.length > 0 && (
                  <span> › {crumbs.join(" › ")}</span>
                )}
              </div>
            </div>
          </div>
          <h3 className="mt-1.5 line-clamp-1 text-xl text-[#1a0dab]">
            {safeTitle}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-[#4d5156]">
            {safeDesc}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <div className="relative aspect-[1.91/1] w-full bg-secondary">
            {image ? (
              <Image src={image} alt="" fill sizes="480px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No image set
              </div>
            )}
          </div>
          <div className="border-t border-border px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[#8a8d91]">
              {domain}
            </p>
            <p className="mt-0.5 line-clamp-1 font-semibold text-[#1c1e21]">
              {safeTitle}
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm text-[#606770]">
              {safeDesc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
