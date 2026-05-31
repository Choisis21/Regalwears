"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

/**
 * A single line in the bag. Identity is product + colour + size, so the same
 * dress in two sizes is two lines. `key` is the stable composite id we use for
 * updates and removal.
 */
export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
};

export type AddToCartInput = Omit<CartLine, "key" | "quantity"> & {
  quantity?: number;
};

const STORAGE_KEY = "regal-cart";
const MAX_QTY = 99;

function lineKey(productId: string, color?: string, size?: string): string {
  return `${productId}::${color ?? ""}::${size ?? ""}`;
}

type CartState = { lines: CartLine[] };

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; input: AddToCartInput }
  | { type: "setQty"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };

    case "add": {
      const { input } = action;
      const key = lineKey(input.productId, input.color, input.size);
      const qty = Math.min(MAX_QTY, Math.max(1, input.quantity ?? 1));
      const existing = state.lines.find((l) => l.key === key);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.key === key
              ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + qty) }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, { ...input, key, quantity: qty }] };
    }

    case "setQty": {
      const quantity = Math.min(MAX_QTY, Math.max(1, action.quantity));
      return {
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity } : l,
        ),
      };
    }

    case "remove":
      return { lines: state.lines.filter((l) => l.key !== action.key) };

    case "clear":
      return { lines: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  ready: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  // `ready` flips true once we've read localStorage, so we never persist the
  // empty initial state over a saved cart before hydration.
  const [ready, setReady] = useState(false);

  // Load any saved cart on first mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: parsed });
      }
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  // Persist on every change, once hydrated.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [state.lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = state.lines.reduce((s, l) => s + l.price * l.quantity, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      isOpen,
      ready,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (input) => {
        dispatch({ type: "add", input });
        setIsOpen(true);
      },
      setQuantity: (key, quantity) => dispatch({ type: "setQty", key, quantity }),
      removeItem: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.lines, isOpen, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
