import type { Metadata } from "next";

import { CatalogView } from "@/components/shop/catalog-view";
import { categoryMeta } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Shop all pieces",
  description: categoryMeta.all.tagline,
};

export default function ShopPage() {
  return <CatalogView slug="all" />;
}
