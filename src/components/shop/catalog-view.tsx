import Image from "next/image";

import { categoryMeta, type CatalogSlug } from "@/lib/placeholder-data";
import { getProductsByCatalog } from "@/lib/catalog-store";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { ProductBrowser } from "@/components/shop/product-browser";
import { Reveal } from "@/components/motion/reveal";

export async function CatalogView({ slug }: { slug: CatalogSlug }) {
  const meta = categoryMeta[slug];
  const products = await getProductsByCatalog(slug);

  const crumbs: Crumb[] =
    slug === "all"
      ? [{ label: "Home", href: "/" }, { label: "Shop" }]
      : [
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: meta.name },
        ];

  return (
    <>
      {/* Category banner */}
      <section className="relative h-[40vh] min-h-[280px] w-full overflow-hidden bg-black">
        <Image
          src={meta.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6">
          <Reveal>
            <h1 className="font-heading text-4xl text-cream sm:text-5xl lg:text-6xl">
              {meta.name}
            </h1>
            <p className="mt-3 max-w-xl text-cream/80">{meta.tagline}</p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumb items={crumbs} />
        <div className="mt-10">
          <ProductBrowser products={products} />
        </div>
      </div>
    </>
  );
}
