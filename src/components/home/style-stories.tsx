import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { getPreviews } from "@/lib/blog-store";
import { SectionHeading } from "@/components/home/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export async function StyleStories() {
  const blogPreviews = await getPreviews();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="From the journal"
        title="Style stories"
        link={{ label: "Read the journal", href: "/blog" }}
      />

      <Stagger className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {blogPreviews.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-burgundy backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="mt-5">
                <p className="mb-2.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> {post.readTime}
                </p>
                <h3 className="font-heading text-xl leading-snug text-foreground transition-colors group-hover:text-burgundy/70">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
