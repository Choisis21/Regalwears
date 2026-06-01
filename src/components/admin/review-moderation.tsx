"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Check, Star, X } from "lucide-react";

import {
  approveReviewAction,
  rejectReviewAction,
} from "@/app/admin/reviews/actions";

export type PendingReview = {
  id: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReviewModeration({ reviews }: { reviews: PendingReview[] }) {
  const [pending, startTransition] = useTransition();

  const act = (fn: () => Promise<unknown>) => {
    startTransition(async () => {
      await fn();
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        Nothing waiting for approval. You're all caught up.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-rosegold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < r.rating ? "fill-current" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(r.date)}
                </span>
              </div>
              <p className="mt-2 font-medium text-foreground">{r.title}</p>
            </div>
            <Link
              href={`/product/${r.productSlug}`}
              className="text-xs text-burgundy underline-offset-4 hover:underline"
            >
              {r.productName}
            </Link>
          </div>

          <p className="mt-2 leading-relaxed text-foreground/80">{r.body}</p>
          <p className="mt-2 text-sm text-muted-foreground">by {r.author}</p>

          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
            <button
              type="button"
              disabled={pending}
              onClick={() => act(() => approveReviewAction(r.id, r.productSlug))}
              className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-60"
            >
              <Check className="size-4" />
              Approve
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => act(() => rejectReviewAction(r.id, r.productSlug))}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-60"
            >
              <X className="size-4" />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
