"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { categories } from "@/lib/placeholder-data";
import { useCurrency } from "@/components/currency/currency-context";

const MAX_RESULTS = 8;

type SearchProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  categorySlug: string;
  colors: { name: string }[];
};

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { format } = useCurrency();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field when opened; reset when closed.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [open]);

  // Load the product list (from the catalog store) the first time we open.
  useEffect(() => {
    if (!open || products.length > 0) return;
    let active = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: SearchProduct[]) => {
        if (active && Array.isArray(data)) setProducts(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [open, products.length]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q)),
      )
      .slice(0, MAX_RESULTS);
  }, [query, products]);

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-burgundy/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-0 w-full bg-cream shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6">
              {/* Search field */}
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Search className="size-5 shrink-0 text-burgundy" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for dresses, tops, occasion wear…"
                  className="h-8 w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="text-muted-foreground transition-colors hover:text-burgundy"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Results / suggestions */}
              <div className="max-h-[60vh] overflow-y-auto py-4">
                {!hasQuery && (
                  <div>
                    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Popular categories
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={onClose}
                          className="rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-burgundy/50 hover:text-burgundy"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {hasQuery && results.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No matches for{" "}
                    <span className="font-medium text-foreground">
                      &ldquo;{query}&rdquo;
                    </span>
                    . Try another word.
                  </p>
                )}

                {results.length > 0 && (
                  <ul className="space-y-1">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-secondary"
                        >
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {p.name}
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {p.categorySlug}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-burgundy">
                            {format(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
