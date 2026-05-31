"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { galleryImages } from "@/lib/placeholder-data";
import { InstagramIcon } from "@/components/icons/social";
import { Reveal } from "@/components/motion/reveal";

// Render several copies so the row loops seamlessly. We keep the centred card
// inside the middle copies and quietly shift the scroll position by one full
// copy whenever it drifts into an outer copy. Because every copy is identical,
// that shift is invisible, and there is always a full set of images buffering
// each edge so the physical end is never reached.
const SETS = 5;
const loopImages = Array.from({ length: SETS }, () => galleryImages).flat();
const setCount = galleryImages.length;
const START_COPY = 2; // 0-based copy to begin centred on

export function InstagramGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const centeredIndex = useRef(START_COPY * setCount);
  const reduce = useReducedMotion();

  const oneCopyWidth = () => {
    const cards = scrollerRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards || cards.length <= setCount) return 0;
    return cards[setCount].offsetLeft - cards[0].offsetLeft;
  };

  // Coverflow: tilt + scale each card by its distance from the viewport centre,
  // and record which card is currently centred.
  const update = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    let best = 0;
    let bestDist = Infinity;
    scroller.querySelectorAll<HTMLElement>("[data-card]").forEach((card, idx) => {
      const cr = card.getBoundingClientRect();
      const cardCenter = cr.left + cr.width / 2;
      const dist = Math.abs(cardCenter - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
      const d = Math.max(-1, Math.min(1, ((cardCenter - mid) / rect.width) * 1.7));
      if (reduce) {
        card.style.transform = "none";
        card.style.opacity = "1";
        card.style.zIndex = "1";
        return;
      }
      const rotateY = d * -26;
      const scale = 1 - Math.min(Math.abs(d), 1) * 0.2;
      const ty = Math.abs(d) * 14;
      card.style.transform = `rotateY(${rotateY}deg) scale(${scale}) translateY(${ty}px)`;
      card.style.opacity = String(1 - Math.min(Math.abs(d), 1) * 0.35);
      card.style.zIndex = String(100 - Math.round(Math.abs(d) * 100));
    });
    centeredIndex.current = best;
  }, [reduce]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = scroller.querySelectorAll<HTMLElement>("[data-card]");
    const start = cards[START_COPY * setCount];
    if (start) {
      scroller.scrollLeft =
        start.offsetLeft - (scroller.clientWidth - start.clientWidth) / 2;
    }
    update();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        const w = oneCopyWidth();
        const idx = centeredIndex.current;
        // Keep the centred card within the inner copies; outer copies are buffer.
        if (w > 0) {
          if (idx < setCount) scroller.scrollLeft += w;
          else if (idx >= (SETS - 1) * setCount) scroller.scrollLeft -= w;
        }
        ticking = false;
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="mb-2.5 text-xs tracking-[0.25em] text-rosegold uppercase">
            @regalwears
          </p>
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Styled by you
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Tag us in your looks for a chance to be featured. We love seeing how
            you make Regal Wears your own.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div
          ref={scrollerRef}
          className="flex scroll-auto gap-4 overflow-x-auto overscroll-x-contain px-[18vw] py-10 sm:gap-6 sm:px-[38vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ perspective: "1200px" }}
        >
          {loopImages.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              data-card
              className="group relative aspect-[3/4] w-[64vw] shrink-0 overflow-hidden rounded-2xl bg-secondary shadow-2xl shadow-burgundy/15 will-change-transform sm:w-72"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={src}
                alt="Regal Wears styled on Instagram"
                fill
                sizes="(max-width: 640px) 64vw, 18rem"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-burgundy/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <InstagramIcon className="size-7 text-cream" />
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Drag or scroll to explore
      </p>
    </section>
  );
}
