import { getNewArrivals } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/home/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Fresh off the rail"
        title="New arrivals"
        link={{ label: "See everything new", href: "/shop/new" }}
      />

      <Stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
