"use client";

import { useMemo, useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { Product } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/product/product-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

function sortList(list: Product[], sort: string): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

export function ProductBrowser({ products }: { products: Product[] }) {
  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [products]);

  const sizeOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const [selColors, setSelColors] = useState<string[]>([]);
  const [selSizes, setSelSizes] = useState<string[]>([]);
  const [priceIdx, setPriceIdx] = useState(0);
  const [sort, setSort] = useState("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIdx];
    const list = products.filter(
      (p) =>
        (selColors.length === 0 || p.colors.some((c) => selColors.includes(c.name))) &&
        (selSizes.length === 0 || p.sizes.some((s) => selSizes.includes(s))) &&
        p.price >= range.min &&
        p.price < range.max,
    );
    return sortList(list, sort);
  }, [products, selColors, selSizes, priceIdx, sort]);

  const filtersActive = selColors.length > 0 || selSizes.length > 0 || priceIdx !== 0;

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setSelColors([]);
    setSelSizes([]);
    setPriceIdx(0);
  };

  const filterPanel = (
    <div className="space-y-8">
      {/* Colour */}
      <div>
        <h3 className="font-heading text-base text-foreground">Colour</h3>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {colorOptions.map((c) => {
            const active = selColors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggle(c.name, selColors, setSelColors)}
                title={c.name}
                aria-pressed={active}
                className={cn(
                  "relative size-8 rounded-full border transition-all",
                  active ? "ring-2 ring-burgundy ring-offset-2 ring-offset-background" : "border-border",
                )}
                style={{ backgroundColor: c.hex }}
              >
                {active && (
                  <Check
                    className="absolute inset-0 m-auto size-4"
                    style={{ color: isLight(c.hex) ? "#401526" : "#faf8f5" }}
                  />
                )}
                <span className="sr-only">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-heading text-base text-foreground">Size</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {sizeOptions.map((s) => {
            const active = selSizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s, selSizes, setSelSizes)}
                aria-pressed={active}
                className={cn(
                  "min-w-10 rounded-lg border px-3 py-1.5 text-sm transition-colors",
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
      </div>

      {/* Price */}
      <div>
        <h3 className="font-heading text-base text-foreground">Price</h3>
        <div className="mt-4 space-y-2.5">
          {PRICE_RANGES.map((r, i) => (
            <label key={r.label} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
              <input
                type="radio"
                name="price"
                checked={priceIdx === i}
                onChange={() => setPriceIdx(i)}
                className="size-4 accent-burgundy"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      {filtersActive && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-burgundy underline-offset-4 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-32">{filterPanel}</div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filters
            </button>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-burgundy focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <Stagger
            key={`${selColors.join()}-${selSizes.join()}-${priceIdx}-${sort}`}
            className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3"
          >
            {filtered.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-20 text-center">
            <p className="font-heading text-xl text-foreground">Nothing matches just yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try loosening a filter or two and we'll find you something lovely.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 rounded-full border-2 border-burgundy px-6 py-2.5 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-burgundy/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-cream p-6 lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-xl text-foreground">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close filters"
                  className="text-foreground"
                >
                  <X className="size-6" />
                </button>
              </div>
              {filterPanel}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mt-10 w-full rounded-full bg-burgundy py-3 text-sm font-semibold text-cream"
              >
                Show {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Rough luminance check so the tick mark stays visible on light swatches.
function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
