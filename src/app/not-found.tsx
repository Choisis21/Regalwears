import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="flex min-h-[88vh] w-full items-center justify-center bg-cream px-4 pt-32 pb-20 text-center sm:px-6">
          <Reveal>
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <p className="mb-4 text-sm tracking-[0.3em] text-rosegold uppercase">
                Error 404
              </p>
              <h1 className="font-heading text-5xl leading-[1.05] text-burgundy sm:text-6xl lg:text-7xl">
                This page slipped off the rail
              </h1>
              <p className="mt-6 max-w-md text-lg text-foreground/70">
                The page you're after may have moved, sold out, or never quite
                existed. Let's get you back to something lovely.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-sm font-semibold tracking-wide text-cream transition-all hover:gap-3 hover:bg-burgundy/90"
                >
                  <Home className="size-4" />
                  Back to home
                </Link>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-8 py-4 text-sm font-semibold tracking-wide text-burgundy transition-all hover:gap-3 hover:border-burgundy"
                >
                  Browse the shop
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
