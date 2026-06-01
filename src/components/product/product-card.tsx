"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

import type { Product } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { useCurrency } from "@/components/currency/currency-context";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { format } = useCurrency();
  const onSale = Boolean(product.compareAtPrice);
  const wished = has(product.id);

  const toggleWishlist = () => {
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.image,
      color: product.colors[0]?.name,
      size: product.sizes[0],
    });
  };

  const quickAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0]?.name,
      size: product.sizes[0],
      quantity: 1,
    });
  };

  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
        <Link href={`/product/${product.slug}`} className="block size-full">
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium",
              onSale
                ? "bg-rosegold text-burgundy"
                : "bg-cream/90 text-burgundy backdrop-blur-sm",
            )}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={cn(
            "absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-cream/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:text-rosegold group-hover:opacity-100",
            wished ? "text-rosegold opacity-100" : "text-burgundy opacity-0",
          )}
        >
          <Heart className={cn("size-4", wished && "fill-current")} />
        </button>

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-burgundy text-sm font-medium text-cream transition-colors hover:bg-burgundy/90"
          >
            <ShoppingBag className="size-4" /> Quick add
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4">
        <h3 className="font-heading text-base leading-snug text-foreground">
          <Link href={`/product/${product.slug}`} className="hover:text-burgundy/70">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-medium text-burgundy">
            {format(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {format(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
