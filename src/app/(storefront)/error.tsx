"use client";

import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function StorefrontError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="mb-3 text-xs tracking-[0.3em] text-rosegold uppercase">
        Something went wrong
      </p>
      <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
        That didn't go to plan
      </h1>
      <p className="mt-4 max-w-sm text-muted-foreground">
        We hit an unexpected snag loading this page. Give it another try, and if
        it keeps happening, do let us know.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:gap-3 hover:bg-burgundy/90"
        >
          <RotateCcw className="size-4" />
          Try again
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-8 py-3.5 text-sm font-semibold text-burgundy transition-all hover:gap-3 hover:border-burgundy"
        >
          <Home className="size-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
