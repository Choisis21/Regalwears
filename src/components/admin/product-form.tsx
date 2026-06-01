"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import type { Product } from "@/lib/placeholder-data";
import type { ProductDraft } from "@/lib/catalog-store";
import { saveProductAction } from "@/app/admin/products/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { SeoPreview } from "@/components/admin/seo-preview";

function slugify(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORIES = [
  { value: "dresses", label: "Dresses" },
  { value: "tops", label: "Tops & Blouses" },
  { value: "occasion", label: "Occasion" },
] as const;

const SIZES = ["XS", "S", "M", "L", "XL"];

const input =
  "h-11 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-foreground";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [compareAt, setCompareAt] = useState(
    product?.compareAtPrice ? String(product.compareAtPrice) : "",
  );
  const [category, setCategory] = useState<string>(
    product?.categorySlug ?? "dresses",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [stock, setStock] = useState(
    product?.stock != null ? String(product.stock) : "12",
  );
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [isNew, setIsNew] = useState(Boolean(product?.isNew));
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? ["S", "M", "L"]);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>(
    product?.colors?.length
      ? product.colors
      : [{ name: "", hex: "#401526" }],
  );
  const [metaTitle, setMetaTitle] = useState(product?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    product?.metaDescription ?? "",
  );
  const [imageAlt, setImageAlt] = useState(product?.imageAlt ?? "");

  const toggleSize = (s: string) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanColors = colors.filter((c) => c.name.trim() && c.hex.trim());

    const draft: ProductDraft = {
      name: name.trim(),
      slug: slug.trim(),
      price: Number(price),
      compareAtPrice: compareAt ? Number(compareAt) : undefined,
      description: description.trim(),
      categorySlug: category as ProductDraft["categorySlug"],
      image: images[0] ?? "",
      images,
      colors: cleanColors,
      sizes,
      stock: Number(stock),
      badge: badge.trim() || undefined,
      isNew,
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      imageAlt: imageAlt.trim() || undefined,
    };

    startTransition(async () => {
      const res = await saveProductAction(product?.id ?? null, draft);
      if (!res.ok) {
        setError(res.error || "Something went wrong.");
        return;
      }
      router.push("/admin/products");
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className={input} placeholder="Silk Maxi Dress" />
        </div>
        <div>
          <label className={label}>Slug <span className="text-muted-foreground">(optional)</span></label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className={input} placeholder="auto from name" disabled={Boolean(product)} />
        </div>
        <div>
          <label className={label}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Price ($)</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} required type="number" min="0" step="0.01" className={input} placeholder="189" />
        </div>
        <div>
          <label className={label}>Compare at ($) <span className="text-muted-foreground">(optional)</span></label>
          <input value={compareAt} onChange={(e) => setCompareAt(e.target.value)} type="number" min="0" step="0.01" className={input} placeholder="240" />
        </div>
        <div>
          <label className={label}>Stock</label>
          <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" min="0" className={input} placeholder="12" />
        </div>
        <div>
          <label className={label}>Badge <span className="text-muted-foreground">(optional)</span></label>
          <input value={badge} onChange={(e) => setBadge(e.target.value)} className={input} placeholder="Bestseller" />
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${input} h-auto py-3`} placeholder="Tell the story of this piece…" />
      </div>

      <div>
        <label className={label}>Images <span className="text-muted-foreground">(first is the main image)</span></label>
        <ImageUploader value={images} onChange={setImages} />
      </div>

      <div>
        <label className={label}>Sizes</label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`min-w-11 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                sizes.includes(s)
                  ? "border-burgundy bg-burgundy text-cream"
                  : "border-border text-foreground hover:border-burgundy/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={label}>Colours</label>
        <div className="space-y-2">
          {colors.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={c.hex}
                onChange={(e) =>
                  setColors((prev) =>
                    prev.map((x, j) => (j === i ? { ...x, hex: e.target.value } : x)),
                  )
                }
                className="h-11 w-14 shrink-0 rounded-lg border border-border bg-card"
              />
              <input
                value={c.name}
                onChange={(e) =>
                  setColors((prev) =>
                    prev.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)),
                  )
                }
                placeholder="Colour name"
                className={input}
              />
              <button
                type="button"
                onClick={() => setColors((prev) => prev.filter((_, j) => j !== i))}
                aria-label="Remove colour"
                className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setColors((prev) => [...prev, { name: "", hex: "#401526" }])}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:underline"
        >
          <Plus className="size-4" /> Add colour
        </button>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
        <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="size-4 accent-burgundy" />
        Mark as New arrival
      </label>

      {/* SEO */}
      <div className="border-t border-border pt-6">
        <h2 className="font-heading text-lg text-foreground">
          Search &amp; social (SEO)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Control how this product shows up in Google and when shared. Leave
          blank to use sensible defaults.
        </p>
        <div className="mt-4 space-y-5">
          <div>
            <label className={label}>
              Meta title{" "}
              <span className="text-muted-foreground">
                (defaults to the product name)
              </span>
            </label>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              maxLength={70}
              className={input}
              placeholder="Silk Maxi Dress in Burgundy"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {metaTitle.length}/70
            </p>
          </div>
          <div>
            <label className={label}>Meta description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              maxLength={160}
              rows={2}
              className={`${input} h-auto py-3`}
              placeholder="A short, enticing summary shown in search results."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {metaDescription.length}/160
            </p>
          </div>
          <div>
            <label className={label}>Image alt text</label>
            <input
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className={input}
              placeholder="Describe the main image for accessibility and SEO"
            />
          </div>
        </div>

        <div className="mt-5">
          <SeoPreview
            title={metaTitle || name}
            description={metaDescription || description.slice(0, 160)}
            path={`/product/${slug.trim() || slugify(name)}`}
            image={images[0]}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
        >
          {pending ? "Saving" : product ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-burgundy"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
