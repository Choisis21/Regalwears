"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { BlogBlock, BlogPost } from "@/lib/placeholder-data";
import type { BlogDraft } from "@/lib/blog-store";
import { saveBlogAction } from "@/app/admin/blog/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import { SeoPreview } from "@/components/admin/seo-preview";

function slugify(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const input =
  "h-11 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none";
const label = "mb-1.5 block text-sm font-medium text-foreground";

function blocksToText(body: BlogBlock[]): string {
  return body
    .map((b) => (b.type === "h2" ? `## ${b.text}` : b.text))
    .join("\n\n");
}

function textToBlocks(text: string): BlogBlock[] {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("## ")
        ? { type: "h2" as const, text: chunk.slice(3).trim() }
        : { type: "p" as const, text: chunk },
    );
}

export function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? "Style");
  const [readTime, setReadTime] = useState(post?.readTime ?? "5 min read");
  const [image, setImage] = useState(post?.image ?? "");
  const [author, setAuthor] = useState(post?.author ?? "");
  const [date, setDate] = useState(post?.date ?? "");
  const [bodyText, setBodyText] = useState(
    post ? blocksToText(post.body) : "",
  );
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription ?? "",
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const draft: BlogDraft = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim(),
      category: category.trim() || "Style",
      readTime: readTime.trim() || "5 min read",
      image: image.trim(),
      author: author.trim() || "Regal Wears",
      date: date.trim() || new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      body: textToBlocks(bodyText),
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
    };

    startTransition(async () => {
      const res = await saveBlogAction(post?.slug ?? null, draft);
      if (!res.ok) {
        setError(res.error || "Something went wrong.");
        return;
      }
      router.push("/admin/blog");
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

      <div>
        <label className={label}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={input} placeholder="10 Summer Wedding Outfit Ideas" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Slug <span className="text-muted-foreground">(optional)</span></label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className={input} placeholder="auto from title" disabled={Boolean(post)} />
        </div>
        <div>
          <label className={label}>Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={input} placeholder="Occasion" />
        </div>
        <div>
          <label className={label}>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className={input} placeholder="Sarah Mitchell" />
        </div>
        <div>
          <label className={label}>Read time</label>
          <input value={readTime} onChange={(e) => setReadTime(e.target.value)} className={input} placeholder="6 min read" />
        </div>
        <div>
          <label className={label}>Date <span className="text-muted-foreground">(optional)</span></label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={input} placeholder="May 15, 2026" />
        </div>
      </div>

      <div>
        <label className={label}>Cover image</label>
        <ImageUploader
          value={image ? [image] : []}
          onChange={(urls) => setImage(urls[0] ?? "")}
          multiple={false}
        />
      </div>

      <div>
        <label className={label}>Excerpt</label>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={`${input} h-auto py-3`} placeholder="A short teaser shown on the blog grid." />
      </div>

      <div>
        <label className={label}>
          Body{" "}
          <span className="text-muted-foreground">
            (blank line between paragraphs, start a line with ## for a heading)
          </span>
        </label>
        <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} rows={12} className={`${input} h-auto py-3`} placeholder={"Your opening paragraph…\n\n## A section heading\n\nMore text…"} />
      </div>

      {/* SEO */}
      <div className="border-t border-border pt-6">
        <h2 className="font-heading text-lg text-foreground">
          Search &amp; social (SEO)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How this story appears in Google and when shared. Leave blank to use
          the title and excerpt.
        </p>
        <div className="mt-4 space-y-5">
          <div>
            <label className={label}>
              Meta title{" "}
              <span className="text-muted-foreground">(defaults to the title)</span>
            </label>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              maxLength={70}
              className={input}
              placeholder={title || "Post title"}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {metaTitle.length}/70
            </p>
          </div>
          <div>
            <label className={label}>
              Meta description{" "}
              <span className="text-muted-foreground">(defaults to the excerpt)</span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              maxLength={160}
              rows={2}
              className={`${input} h-auto py-3`}
              placeholder="A short summary shown in search results."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {metaDescription.length}/160
            </p>
          </div>
        </div>
        <div className="mt-5">
          <SeoPreview
            title={metaTitle || title}
            description={metaDescription || excerpt}
            path={`/blog/${slug.trim() || slugify(title)}`}
            image={image}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
        >
          {pending ? "Saving" : post ? "Save changes" : "Publish post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-burgundy"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
