import { promises as fs } from "fs";
import path from "path";

import {
  allProducts,
  type CatalogSlug,
  type CategorySlug,
  type Product,
} from "@/lib/placeholder-data";

/**
 * File-backed catalog store. Acts as the database for now: products live in
 * data/catalog.json, seeded from the placeholder catalog on first read. The
 * admin reads and writes through here, and the storefront reads from it too.
 * Swapping this module to Supabase/Prisma later is a drop-in change.
 *
 * SERVER ONLY — never import this from a client component (it uses fs).
 */

const FILE = path.join(process.cwd(), "data", "catalog.json");

const DEFAULT_STOCK = 12;

function withDefaults(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    stock: typeof p.stock === "number" ? p.stock : DEFAULT_STOCK,
  }));
}

async function save(products: Product[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(products, null, 2), "utf8");
}

async function load(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Product[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // file missing or unreadable — fall through to seed
  }
  const seed = withDefaults(allProducts);
  await save(seed);
  return seed;
}

// --- Reads -----------------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {
  return load();
}

export async function getProductById(id: string): Promise<Product | null> {
  return (await load()).find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return (await load()).find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCatalog(
  slug: CatalogSlug,
): Promise<Product[]> {
  const all = await load();
  if (slug === "all") return all;
  if (slug === "new") return all.filter((p) => p.isNew);
  return all.filter((p) => p.categorySlug === slug);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await load();
  return all
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export async function getTrending(limit = 8): Promise<Product[]> {
  const all = await load();
  return [...all].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export async function getNewArrivals(limit = 4): Promise<Product[]> {
  const all = await load();
  const fresh = all.filter((p) => p.isNew);
  return (fresh.length ? fresh : all).slice(0, limit);
}

// --- Writes (admin) --------------------------------------------------------

export type ProductDraft = {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  categorySlug: CategorySlug;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  badge?: string;
  isNew?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  imageAlt?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProduct(draft: ProductDraft): Promise<Product> {
  const all = await load();
  const baseSlug = draft.slug ? slugify(draft.slug) : slugify(draft.name);
  let slug = baseSlug || `product-${all.length + 1}`;
  let n = 2;
  while (all.some((p) => p.slug === slug)) slug = `${baseSlug}-${n++}`;

  const product: Product = {
    id: `p_${Date.now().toString(36)}`,
    name: draft.name,
    slug,
    price: draft.price,
    compareAtPrice: draft.compareAtPrice,
    badge: draft.badge,
    rating: 0,
    reviewCount: 0,
    image: draft.image || draft.images[0] || "",
    images: draft.images.length ? draft.images : [draft.image].filter(Boolean),
    colors: draft.colors,
    sizes: draft.sizes,
    description: draft.description,
    categorySlug: draft.categorySlug,
    isNew: draft.isNew,
    stock: draft.stock,
    metaTitle: draft.metaTitle,
    metaDescription: draft.metaDescription,
    imageAlt: draft.imageAlt,
  };

  await save([product, ...all]);
  return product;
}

export async function updateProduct(
  id: string,
  draft: ProductDraft,
): Promise<Product | null> {
  const all = await load();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const updated: Product = {
    ...all[idx],
    name: draft.name,
    price: draft.price,
    compareAtPrice: draft.compareAtPrice,
    badge: draft.badge,
    image: draft.image || draft.images[0] || all[idx].image,
    images: draft.images.length ? draft.images : all[idx].images,
    colors: draft.colors,
    sizes: draft.sizes,
    description: draft.description,
    categorySlug: draft.categorySlug,
    isNew: draft.isNew,
    stock: draft.stock,
    metaTitle: draft.metaTitle,
    metaDescription: draft.metaDescription,
    imageAlt: draft.imageAlt,
  };

  all[idx] = updated;
  await save(all);
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  const all = await load();
  await save(all.filter((p) => p.id !== id));
}

export async function setStock(id: string, stock: number): Promise<void> {
  const all = await load();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], stock };
  await save(all);
}
