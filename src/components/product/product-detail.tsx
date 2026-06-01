"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import type { Product } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";
import { useWishlist } from "@/components/wishlist/wishlist-context";
import { useCurrency } from "@/components/currency/currency-context";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { format } = useCurrency();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const wished = has(product.id);

  const toggleWishlist = () => {
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.image,
      color,
      size: size ?? product.sizes[0],
    });
  };

  const onSale = Boolean(product.compareAtPrice);
  const savePct = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const addToBag = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      color,
      size,
      quantity: qty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex gap-3 sm:flex-col">
          {product.images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImg(i)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg border transition-colors sm:size-20",
                activeImg === i ? "border-burgundy" : "border-border hover:border-burgundy/50",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={product.images[activeImg]}
            alt={product.imageAlt || product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          {product.badge && (
            <span
              className={cn(
                "absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium",
                onSale ? "bg-rosegold text-burgundy" : "bg-cream/90 text-burgundy backdrop-blur-sm",
              )}
            >
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="lg:py-2">
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{product.name}</h1>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-rosegold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("size-4", i < Math.round(product.rating) ? "fill-current" : "text-border")}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-2xl font-medium text-burgundy">{format(product.price)}</span>
          {onSale && (
            <span className="text-lg text-muted-foreground line-through">
              {format(product.compareAtPrice!)}
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-rosegold/20 px-2.5 py-1 text-xs font-medium text-burgundy">
              Save {savePct}%
            </span>
          )}
        </div>

        <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

        {/* Colour */}
        <div className="mt-8">
          <p className="text-sm font-medium text-foreground">
            Colour: <span className="text-muted-foreground">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.colors.map((c) => {
              const active = color === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  aria-pressed={active}
                  className={cn(
                    "size-9 rounded-full border transition-all",
                    active ? "ring-2 ring-burgundy ring-offset-2 ring-offset-background" : "border-border",
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="sr-only">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Size</p>
            <button
              type="button"
              className="text-sm text-burgundy underline-offset-4 hover:underline"
            >
              Size guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "min-w-11 rounded-lg border px-3.5 py-2 text-sm transition-colors",
                    active
                      ? "border-burgundy bg-burgundy text-cream"
                      : "border-border text-foreground hover:border-burgundy/50",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {sizeError && (
            <p className="mt-2 text-sm text-destructive">Please choose a size first.</p>
          )}
        </div>

        {/* Quantity + actions */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-burgundy"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-burgundy"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={addToBag}
            className={cn(
              "flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors",
              added ? "bg-rosegold text-burgundy" : "bg-burgundy text-cream hover:bg-burgundy/90",
            )}
          >
            {added ? (
              <>
                <Check className="size-4" /> Added to bag
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" /> Add to bag
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className="flex size-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-burgundy/50 hover:text-burgundy"
          >
            <Heart className={cn("size-5", wished && "fill-burgundy text-burgundy")} />
          </button>
        </div>

        {/* Reassurance */}
        <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <p className="flex items-center gap-2.5">
            <Truck className="size-4 text-rosegold" /> Free shipping on orders over $100
          </p>
          <p className="flex items-center gap-2.5">
            <RefreshCw className="size-4 text-rosegold" /> Easy 30-day returns
          </p>
          <p className="flex items-center gap-2.5">
            <ShieldCheck className="size-4 text-rosegold" /> Secure, encrypted checkout
          </p>
        </div>
      </div>
    </div>
  );
}
