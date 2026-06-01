"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** A saved product. Carries enough to render the wishlist grid without a DB. */
export type WishlistItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  color?: string;
  size?: string;
};

const STORAGE_KEY = "regal-wishlist";

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  ready: boolean;
  has: (productId: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load saved items on first mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  // Persist on change, once hydrated.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [items, ready]);

  const value = useMemo<WishlistContextValue>(() => {
    return {
      items,
      count: items.length,
      ready,
      has: (productId) => items.some((i) => i.productId === productId),
      toggle: (item) =>
        setItems((prev) =>
          prev.some((i) => i.productId === item.productId)
            ? prev.filter((i) => i.productId !== item.productId)
            : [...prev, item],
        ),
      remove: (productId) =>
        setItems((prev) => prev.filter((i) => i.productId !== productId)),
    };
  }, [items, ready]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
