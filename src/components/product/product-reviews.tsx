"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";

import type { Product, Review } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { submitReviewAction } from "@/app/(storefront)/product/[slug]/actions";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5 text-rosegold", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < Math.round(value) ? "fill-current" : "text-border",
          )}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ProductReviews({
  product,
  initialReviews,
}: {
  product: Product;
  initialReviews: Review[];
}) {
  const { data: session } = useSession();
  const authed = Boolean(session?.user);

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  // Only approved reviews are shown publicly. Submitted reviews wait for admin
  // approval (persisted + moderated once reviews move to the database).
  const reviews = initialReviews;

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      const idx = Math.min(5, Math.max(1, Math.round(r.rating))) - 1;
      counts[idx] += 1;
    });
    return counts;
  }, [reviews]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authed || !body.trim()) return;
    setError("");
    startTransition(async () => {
      const res = await submitReviewAction({
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        rating,
        title,
        body,
      });
      if (!res.ok) {
        setError(res.error || "Something went wrong.");
        return;
      }
      setTitle("");
      setBody("");
      setRating(5);
      setShowForm(false);
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 6000);
    });
  };

  return (
    <section className="mt-24 border-t border-border pt-14">
      <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
        Reviews
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
        {/* Summary */}
        <div>
          <div className="flex items-end gap-3">
            <span className="font-heading text-5xl text-foreground">
              {product.rating.toFixed(1)}
            </span>
            <div className="pb-1.5">
              <Stars value={product.rating} />
              <p className="mt-1 text-sm text-muted-foreground">
                {product.reviewCount} reviews
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star - 1];
              const shown = reviews.length || 1;
              const pct = Math.round((count / shown) * 100);
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-muted-foreground">{star}</span>
                  <Star className="size-3.5 fill-rosegold text-rosegold" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-rosegold"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {authed ? (
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="mt-7 w-full rounded-full border border-burgundy px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
            >
              {showForm ? "Close" : "Write a review"}
            </button>
          ) : (
            <div className="mt-7 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-center text-sm text-foreground/80">
              <Link
                href={`/sign-in?callbackUrl=/product/${product.slug}`}
                className="font-medium text-burgundy underline-offset-4 hover:underline"
              >
                Sign in
              </Link>{" "}
              to write a review.
            </div>
          )}

          {submitted && (
            <p className="mt-3 rounded-lg bg-rosegold/15 px-4 py-3 text-center text-sm text-burgundy">
              Thank you! Your review has been submitted and will appear once our
              team approves it.
            </p>
          )}
        </div>

        {/* Form + list */}
        <div>
          {authed && showForm && (
            <form
              onSubmit={submit}
              className="mb-8 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-lg text-foreground">
                  Share your thoughts
                </h3>
                <span className="text-xs text-muted-foreground">
                  Posting as {session?.user?.name || "you"}
                </span>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Your rating
                </label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const val = i + 1;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(val)}
                        onMouseEnter={() => setHover(val)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`${val} star${val === 1 ? "" : "s"}`}
                        className="text-rosegold"
                      >
                        <Star
                          className={cn(
                            "size-6 transition-transform hover:scale-110",
                            (hover || rating) >= val
                              ? "fill-current"
                              : "text-border",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (optional)"
                  className="h-11 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none"
                />
              </div>

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={4}
                placeholder="Tell others what you loved (or didn't)…"
                className="mt-4 w-full rounded-lg border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none"
              />

              {error && (
                <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-burgundy px-7 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
                >
                  {pending ? "Submitting" : "Submit for review"}
                </button>
                <span className="text-xs text-muted-foreground">
                  Reviews are checked before they go live
                </span>
              </div>
            </form>
          )}

          <ul className="space-y-8">
            {reviews.map((r) => (
              <li key={r.id} className="border-b border-border pb-8 last:border-0">
                <div className="flex items-center justify-between gap-4">
                  <Stars value={r.rating} />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(r.date)}
                  </span>
                </div>
                <h4 className="mt-3 font-medium text-foreground">{r.title}</h4>
                <p className="mt-1.5 leading-relaxed text-foreground/80">
                  {r.body}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{r.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
