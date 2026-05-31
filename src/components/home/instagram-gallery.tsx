import Image from "next/image";

import { galleryImages } from "@/lib/placeholder-data";
import { InstagramIcon } from "@/components/icons/social";
import { SectionHeading } from "@/components/home/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function InstagramGallery() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="@regalwears"
        title="Styled by you"
        link={{ label: "Follow along", href: "https://instagram.com" }}
      />

      <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {galleryImages.map((src, i) => (
          <StaggerItem key={i}>
            <a
              href="https://instagram.com"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-secondary"
            >
              <Image
                src={src}
                alt="Regal Wears on Instagram"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-burgundy/30 opacity-0 transition-opacity group-hover:opacity-100">
                <InstagramIcon className="size-6 text-cream" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
