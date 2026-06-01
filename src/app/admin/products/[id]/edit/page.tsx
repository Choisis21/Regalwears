import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getProductById } from "@/lib/catalog-store";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-burgundy"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>
      <h1 className="mt-4 font-heading text-3xl text-foreground">
        Edit product
      </h1>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
