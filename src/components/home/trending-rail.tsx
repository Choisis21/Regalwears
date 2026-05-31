import { trendingProducts } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/home/section-heading";

export function TrendingRail() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Loved right now"
          title="Trending now"
          link={{ label: "Shop trending", href: "/shop/new" }}
        />
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-60 shrink-0 snap-start sm:w-72"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
