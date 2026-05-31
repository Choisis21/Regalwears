import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { blogPosts } from "@/lib/placeholder-data";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Style Stories",
  description:
    "Styling ideas, trend reports, and fashion notes from the Regal Wears journal.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <Reveal>
        <div className="mt-10 text-center">
          <p className="mb-3 text-xs tracking-[0.25em] text-rosegold uppercase">
            The journal
          </p>
          <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
            Style Stories
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Styling ideas, trend reports, and the occasional love letter to a
            really good dress. Pull up a chair and stay a while.
          </p>
        </div>
      </Reveal>

      {/* Featured post */}
      <Reveal>
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-burgundy backdrop-blur-sm">
              {featured.category}
            </span>
          </div>
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> {featured.readTime} · {featured.date}
            </p>
            <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground transition-colors group-hover:text-burgundy/70 sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy">
              Read the story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* The rest */}
      <Stagger className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-burgundy backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {post.readTime}
              </p>
              <h3 className="mt-2 font-heading text-xl leading-snug text-foreground transition-colors group-hover:text-burgundy/70">
                {post.title}
              </h3>
              <p className="mt-2.5 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
