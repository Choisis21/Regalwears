import type { Metadata } from "next";
import { Heart, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Design System",
  description: "The Regal Wears visual language: colour, type, and motion.",
};

const palette = [
  { name: "Burgundy", role: "Primary", hex: "#401526", className: "bg-burgundy", text: "text-offwhite" },
  { name: "Wine", role: "Secondary", hex: "#321927", className: "bg-wine", text: "text-offwhite" },
  { name: "Rose Gold", role: "Accent", hex: "#C29F93", className: "bg-rosegold", text: "text-burgundy" },
  { name: "Mauve Brown", role: "Supporting", hex: "#866F76", className: "bg-mauve", text: "text-offwhite" },
  { name: "Dusty Plum", role: "Secondary accent", hex: "#634348", className: "bg-plum", text: "text-offwhite" },
  { name: "Off White", role: "Text light", hex: "#F8F6F7", className: "bg-offwhite", text: "text-burgundy" },
  { name: "Charcoal", role: "Dark UI", hex: "#1E2528", className: "bg-charcoal", text: "text-offwhite" },
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20">
      {/* Header */}
      <Reveal>
        <p className="mb-3 inline-flex items-center gap-2 text-sm tracking-[0.2em] text-rosegold uppercase">
          <Sparkles className="size-4" /> Regal Wears
        </p>
        <h1 className="font-heading text-5xl leading-tight text-offwhite sm:text-6xl">
          The design system
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Everything that makes the storefront feel like itself, the colour, the
          type, and the way things come alive as you scroll.
        </p>
      </Reveal>

      {/* Colour palette */}
      <section className="mt-20">
        <Reveal direction="left">
          <h2 className="font-heading text-3xl text-offwhite">Colour</h2>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {palette.map((c) => (
            <StaggerItem key={c.name}>
              <div className="overflow-hidden rounded-xl border border-border">
                <div className={`flex h-28 items-end p-4 ${c.className} ${c.text}`}>
                  <span className="text-sm font-medium">{c.hex}</span>
                </div>
                <div className="bg-card p-4">
                  <p className="font-medium text-card-foreground">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Typography */}
      <section className="mt-20">
        <Reveal direction="left">
          <h2 className="font-heading text-3xl text-offwhite">Typography</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-6 rounded-xl border border-border bg-card p-8">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Headings — Playfair Display
              </p>
              <p className="font-heading text-5xl text-offwhite">Timeless elegance</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Body — Inter
              </p>
              <p className="max-w-2xl text-lg text-offwhite/90">
                This dress was made for twirling at summer weddings. The fabric
                breathes, the fit flatters, and the colour? Absolutely dreamy.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Buttons */}
      <section className="mt-20">
        <Reveal direction="left">
          <h2 className="font-heading text-3xl text-offwhite">Buttons</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-8">
            <Button size="lg">
              <ShoppingBag /> Add to cart
            </Button>
            <Button variant="secondary" size="lg">
              <Heart /> Add to wishlist
            </Button>
            <Button variant="outline" size="lg">
              Size guide
            </Button>
            <Button variant="ghost" size="lg">
              Keep shopping
            </Button>
            <Button variant="link">View details</Button>
          </div>
        </Reveal>
      </section>

      {/* Sample product card */}
      <section className="mt-20">
        <Reveal direction="left">
          <h2 className="font-heading text-3xl text-offwhite">In context</h2>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { name: "Silk Maxi Dress", price: "$189", note: "Only 3 left" },
            { name: "Wrap Midi Dress", price: "$124", note: "New in" },
            { name: "Tailored Blazer", price: "$210", note: "Bestseller" },
          ].map((p) => (
            <StaggerItem key={p.name}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-black/20">
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-plum to-wine">
                  <ShoppingBag className="size-10 text-rosegold/60" />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1 text-rosegold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-heading text-xl text-card-foreground">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-semibold text-rosegold">{p.price}</span>
                    <span className="rounded-full bg-rosegold px-2.5 py-0.5 text-xs font-medium text-burgundy">
                      {p.note}
                    </span>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Trust row */}
      <Reveal>
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-10 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Truck className="size-5 text-rosegold" /> Free shipping over $100
          </span>
          <span className="inline-flex items-center gap-2">
            <Heart className="size-5 text-rosegold" /> Easy 30-day returns
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-5 text-rosegold" /> Secure checkout
          </span>
        </div>
      </Reveal>
    </main>
  );
}
