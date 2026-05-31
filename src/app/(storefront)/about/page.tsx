import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Leaf, Scissors, Sparkles } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Regal Wears: beautifully made ladies' wear, designed with care and made to be loved for years.",
};

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const values = [
  {
    icon: Scissors,
    title: "Thoughtfully made",
    copy: "Every piece starts with a fabric we'd want to live in and a fit we've checked on real bodies, not just a mannequin.",
  },
  {
    icon: Leaf,
    title: "Made to last",
    copy: "We design for your wardrobe in five years, not just this weekend. Better materials, considered details, fewer regrets.",
  },
  {
    icon: Heart,
    title: "You, first",
    copy: "From the first scroll to the moment it arrives, we want the whole thing to feel personal, warm, and genuinely easy.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-black">
        <Image
          src={u("1490481651871-ab68de25d43d", 1600)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6">
          <Reveal>
            <p className="mb-4 text-sm tracking-[0.3em] text-rosegold uppercase">
              Our story
            </p>
            <h1 className="max-w-2xl font-heading text-5xl leading-tight text-cream sm:text-6xl">
              Clothes made for the woman wearing them
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <p className="text-lg leading-relaxed text-foreground/80">
            Regal Wears began with a simple frustration. Beautiful clothes too
            often came with a catch, a fabric that didn't last, a fit that
            flattered no one, or a price that asked you to choose between quality
            and joy. We thought women deserved better, so we set out to make it.
          </p>
        </Reveal>
      </section>

      {/* Story with image */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
            <Image
              src={u("1485462537746-965f33f7f6a7", 1200)}
              alt="A Regal Wears piece styled simply"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal direction="left">
          <div>
            <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
              What we believe
            </p>
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              Luxury should feel like ease, not effort
            </h2>
            <p className="mt-5 leading-relaxed text-foreground/80">
              We design the kind of pieces you reach for without thinking, the
              dress that always works, the blazer that pulls everything together,
              the top that makes getting ready the easy part of your day.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              Rich colour, fabric that moves, and cuts that celebrate real
              shapes. That's the whole idea, and we're a little obsessed with
              getting it right.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <p className="mb-3 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-rosegold uppercase">
                <Sparkles className="size-4" /> What guides us
              </p>
              <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
                The promises we make
              </h2>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="rounded-2xl border border-border bg-card p-8 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rosegold/15 text-rosegold">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Come find something you'll love
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Have a wander through the new season. We have a feeling you'll find a
            piece or two worth keeping.
          </p>
          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-sm font-semibold tracking-wide text-cream transition-all hover:gap-3 hover:bg-burgundy/90"
          >
            Explore the collection
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
