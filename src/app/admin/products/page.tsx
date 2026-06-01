import Link from "next/link";
import { Plus } from "lucide-react";

import { getAllProducts } from "@/lib/catalog-store";
import { ProductsTable } from "@/components/admin/products-table";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    categorySlug: p.categorySlug,
    price: p.price,
    stock: p.stock ?? 0,
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} product{products.length === 1 ? "" : "s"} in the
            catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
        >
          <Plus className="size-4" />
          Add product
        </Link>
      </div>

      <div className="mt-6">
        <ProductsTable products={rows} />
      </div>
    </div>
  );
}
