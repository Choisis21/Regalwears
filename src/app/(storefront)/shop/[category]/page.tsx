import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogView } from "@/components/shop/catalog-view";
import { categoryMeta, type CatalogSlug } from "@/lib/placeholder-data";

const VALID: CatalogSlug[] = ["new", "dresses", "tops", "occasion"];

export function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category as CatalogSlug];
  if (!meta) return {};
  return { title: meta.name, description: meta.tagline };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as CatalogSlug)) notFound();
  return <CatalogView slug={category as CatalogSlug} />;
}
