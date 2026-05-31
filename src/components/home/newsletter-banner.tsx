"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-burgundy">
      <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
            Join the list
          </p>
          <h2 className="mx-auto max-w-2xl font-heading text-4xl text-cream sm:text-5xl">
            Be first to the good stuff
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/75">
            New arrivals, styling ideas, and the occasional treat just for
            subscribers. No noise, we promise.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="h-12 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 text-sm text-cream placeholder:text-cream/50 focus:border-rosegold focus:ring-2 focus:ring-rosegold/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-cream px-7 text-sm font-semibold text-burgundy transition-opacity hover:opacity-90"
            >
              Subscribe <Send className="size-4" />
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-sm text-rosegold">
              You're in. Keep an eye on your inbox for a little welcome.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
