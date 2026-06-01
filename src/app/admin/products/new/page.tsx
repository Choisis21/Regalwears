import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
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
        Add a product
      </h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
