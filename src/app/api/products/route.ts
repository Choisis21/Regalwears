import { NextResponse } from "next/server";

import { getAllProducts } from "@/lib/catalog-store";

/** Lightweight product list for the client-side search overlay. */
export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      image: p.image,
      categorySlug: p.categorySlug,
      colors: p.colors.map((c) => ({ name: c.name })),
    })),
  );
}
