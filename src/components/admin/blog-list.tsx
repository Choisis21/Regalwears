"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { deleteBlogAction } from "@/app/admin/blog/actions";

export type AdminBlogRow = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
};

export function BlogList({ posts }: { posts: AdminBlogRow[] }) {
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);

  const remove = (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setBusy(slug);
    startTransition(async () => {
      await deleteBlogAction(slug);
      setBusy(null);
    });
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No posts yet. Write your first story.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((p) => (
        <div
          key={p.slug}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
        >
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
            {p.image && (
              <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/blog/${p.slug}`}
              className="font-medium text-foreground transition-colors hover:text-burgundy"
            >
              {p.title}
            </Link>
            <p className="text-xs text-muted-foreground">
              {p.category} · {p.date}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href={`/admin/blog/${p.slug}/edit`}
              aria-label={`Edit ${p.title}`}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-burgundy"
            >
              <Pencil className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => remove(p.slug, p.title)}
              disabled={pending && busy === p.slug}
              aria-label={`Delete ${p.title}`}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive disabled:opacity-50"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
