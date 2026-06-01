import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { getAllPosts, getPostBySlug } from "@/lib/blog-store";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Regal Wears`,
      description,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Regal Wears",
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover */}
      <section className="relative h-[52vh] min-h-[340px] w-full overflow-hidden bg-burgundy">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/45 to-burgundy/20" />
        <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col justify-end px-4 pb-12 sm:px-6">
          <Reveal>
            <span className="mb-4 inline-block w-fit rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-burgundy">
              {post.category}
            </span>
            <h1 className="font-heading text-4xl leading-tight text-cream sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-cream/80">
              By {post.author}
              <span className="text-cream/40">·</span>
              <Clock className="size-3.5" /> {post.readTime}
              <span className="text-cream/40">·</span>
              {post.date}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="mt-10">
          {post.body.map((block, i) =>
            block.type === "h2" ? (
              <h2
                key={i}
                className="mt-10 mb-4 font-heading text-2xl text-foreground sm:text-3xl"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="mb-6 text-lg leading-relaxed text-foreground/80">
                {block.text}
              </p>
            ),
          )}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-burgundy"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to all stories
          </Link>
        </div>
      </div>
    </article>
  );
}
