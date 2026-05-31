"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { heroSlides } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = heroSlides[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-burgundy">
      {/* Background image per slide */}
      <AnimatePresence>
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/35 to-burgundy/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy/55 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-sm tracking-[0.3em] text-rosegold uppercase">
              {slide.eyebrow}
            </p>
            <h1 className="font-heading text-5xl leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cream/80">{slide.copy}</p>
            <Link
              href={slide.href}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-semibold tracking-wide text-burgundy transition-all hover:gap-3"
            >
              {slide.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="mt-12 flex gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-12 bg-cream" : "w-5 bg-cream/40 hover:bg-cream/70",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
