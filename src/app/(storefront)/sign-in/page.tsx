"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError("That email or password doesn't look right. Give it another go.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl") || "/account";
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
          Welcome back
        </p>
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          Sign in to your account
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Lovely to see you again. Pick up right where you left off.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

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

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-burgundy underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="h-12 w-full rounded-lg border border-border bg-card px-4 pr-12 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-burgundy focus:ring-2 focus:ring-burgundy/30 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-burgundy"
            >
              {showPw ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-burgundy text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90 disabled:opacity-70"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href="/register" className="font-medium text-burgundy underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
