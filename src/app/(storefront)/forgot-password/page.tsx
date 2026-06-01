"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // NOTE: email delivery is not wired yet — this is pending the Resend
    // integration. Once /api/forgot-password sends a real reset link, call it
    // here. For now we always show the same confirmation so we never reveal
    // whether an email is registered.
    await new Promise((r) => window.setTimeout(r, 500));

    setLoading(false);
    setSent(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-16 sm:px-6 sm:py-24">
      {sent ? (
        <div className="text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
            <MailCheck className="size-7" />
          </div>
          <h1 className="mt-6 font-heading text-3xl text-foreground sm:text-4xl">
            Check your inbox
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{email}</span>, we've
            sent a link to reset your password. It may take a minute to arrive.
          </p>
          <Link
            href="/sign-in"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-burgundy underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center">
            <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
              No worries
            </p>
            <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
              Reset your password
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Pop in your email and we'll send you a link to set a new one.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-burgundy text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Sending" : "Send reset link"}
            </button>
          </form>

          <Link
            href="/sign-in"
            className="mt-8 inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-burgundy"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        </>
      )}
    </div>
  );
}
