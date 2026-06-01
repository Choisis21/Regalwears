"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2, ShoppingBag, X } from "lucide-react";

import { useWishlist } from "@/components/wishlist/wishlist-context";
import { useCart } from "@/components/cart/cart-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { useCurrency } from "@/components/currency/currency-context";

export default function WishlistPage() {
  const { items, ready, remove } = useWishlist();
  const { addItem } = useCart();
  const { format } = useCurrency();

  if (!ready) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-32 sm:px-6">
        <Loader2 className="size-6 animate-spin text-burgundy" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

      <h1 className="mt-8 font-heading text-3xl text-foreground sm:text-4xl">
        Your wishlist
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-burgundy">
            <Heart className="size-7" />
          </div>
          <h2 className="mt-6 font-heading text-2xl text-foreground">
            Nothing saved yet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Tap the heart on any piece you love and it'll wait for you right
            here.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "piece" : "pieces"} saved
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {items.map((item) => (
              <article key={item.productId} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                  <Link href={`/product/${item.slug}`} className="block size-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(item.productId)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-cream/90 text-burgundy shadow-sm backdrop-blur-sm transition-colors hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-heading text-base leading-snug text-foreground">
                    <Link
                      href={`/product/${item.slug}`}
                      className="hover:text-burgundy/70"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-medium text-burgundy">
                      {format(item.price)}
                    </span>
                    {item.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {format(item.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: item.productId,
                        slug: item.slug,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        color: item.color,
                        size: item.size,
                        quantity: 1,
                      })
                    }
                    className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-burgundy text-sm font-medium text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
                  >
                    <ShoppingBag className="size-4" /> Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
