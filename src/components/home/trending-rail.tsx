import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { trendingProducts } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/home/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function TrendingRail() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Loved right now" title="Trending now" />

        <Stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {trendingProducts.slice(0, 8).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-14 flex justify-center">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-burgundy bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-burgundy transition-all hover:gap-3 hover:bg-burgundy hover:text-cream"
            >
              Shop all products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
