import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/placeholder-data";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";

export function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Find your fit"
        title="Shop by category"
        link={{ label: "View all", href: "/shop" }}
      />

      <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((cat) => (
          <StaggerItem key={cat.href}>
            <Link
              href={cat.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-burgundy/15 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-xs tracking-wide text-cream/80">{cat.blurb}</p>
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-cream sm:text-2xl">
                    {cat.name}
                  </h3>
                  <ArrowUpRight className="size-5 text-cream opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
