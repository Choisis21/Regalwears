"use client";

import { useState, useTransition } from "react";

import type { SiteSettings } from "@/lib/settings-store";
import { saveSettingsAction } from "@/app/admin/settings/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { SeoPreview } from "@/components/admin/seo-preview";

const input =
  "h-11 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-foreground";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [titleTemplate, setTitleTemplate] = useState(settings.titleTemplate);
  const [description, setDescription] = useState(settings.description);
  const [domain, setDomain] = useState(settings.domain);
  const [ogImage, setOgImage] = useState(settings.ogImage);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    startTransition(async () => {
      const res = await saveSettingsAction({
        siteTitle: siteTitle.trim(),
        titleTemplate: titleTemplate.trim() || "%s | Regal Wears",
        description: description.trim(),
        domain: domain.trim() || "regalwears.com",
        ogImage: ogImage.trim(),
      });
      if (!res.ok) {
        setError(res.error || "Something went wrong.");
        return;
      }
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div>
          <label className={label}>Default site title</label>
          <input value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} className={input} />
          <p className="mt-1 text-xs text-muted-foreground">
            Used on the homepage and as the fallback everywhere.
          </p>
        </div>

        <div>
          <label className={label}>Title template</label>
          <input value={titleTemplate} onChange={(e) => setTitleTemplate(e.target.value)} className={input} placeholder="%s | Regal Wears" />
          <p className="mt-1 text-xs text-muted-foreground">
            %s is replaced by each page&apos;s title.
          </p>
        </div>

        <div>
          <label className={label}>Default meta description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={160} rows={3} className={`${input} h-auto py-3`} />
          <p className="mt-1 text-xs text-muted-foreground">{description.length}/160</p>
        </div>

        <div>
          <label className={label}>Domain</label>
          <input value={domain} onChange={(e) => setDomain(e.target.value)} className={input} placeholder="regalwears.com" />
        </div>

        <div>
          <label className={label}>Default social share image</label>
          <ImageUploader value={ogImage ? [ogImage] : []} onChange={(urls) => setOgImage(urls[0] ?? "")} multiple={false} />
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-6">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
          >
            {pending ? "Saving" : "Save settings"}
          </button>
          {saved && <span className="text-sm text-rosegold">Saved.</span>}
        </div>
      </div>

      <div className="lg:sticky lg:top-8 lg:self-start">
        <p className="mb-3 text-sm font-medium text-foreground">
          Homepage preview
        </p>
        <SeoPreview
          title={siteTitle}
          description={description}
          path="/"
          image={ogImage}
          domain={domain || "regalwears.com"}
        />
      </div>
    </form>
  );
}
