import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categoryMeta, getReviewsForProduct } from "@/lib/placeholder-data";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog-store";
import { getApprovedReviews } from "@/lib/reviews-store";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductCard } from "@/components/product/product-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = product.metaTitle || product.name;
  const description =
    product.metaDescription || product.description.slice(0, 160);
  const alt = product.imageAlt || product.name;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Regal Wears`,
      description,
      type: "website",
      images: [{ url: product.images[0], width: 1200, height: 1600, alt }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const approved = await getApprovedReviews(product.id);
  const reviews = [
    ...approved.map((r) => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      date: r.date,
      title: r.title,
      body: r.body,
    })),
    ...getReviewsForProduct(product),
  ];
  const categoryName = categoryMeta[product.categorySlug].name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: "Regal Wears" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: categoryName, href: `/shop/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      <ProductReviews product={product} initialReviews={reviews} />

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            You may also like
          </h2>
          <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </div>
  );
}
