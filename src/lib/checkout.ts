import type { CartLine } from "@/components/cart/cart-context";

export const SHIPPING_FLAT = 8;
export const FREE_SHIPPING_THRESHOLD = 100;

/** Flat-rate shipping, free once the bag passes the threshold. */
export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type PlacedOrder = {
  ref: string;
  email: string;
  name: string;
  address: ShippingAddress;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  placedAt: string;
};

const LAST_ORDER_KEY = "regal-last-order";
const ORDERS_KEY = "regal-orders";

/**
 * Generates a friendly order reference. This is a demo/mock value — when real
 * payments land, the order id will come from the persisted order instead.
 */
export function makeOrderRef(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `RW-${stamp}${rand}`;
}

export function saveLastOrder(order: PlacedOrder): void {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    // ignore storage errors (private mode, quota)
  }
}

export function readLastOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

/**
 * Appends an order to the local order history. Device-local for now — moves to
 * the database (per user) once orders are persisted server-side.
 */
export function appendOrder(order: PlacedOrder): void {
  try {
    const existing = readOrders();
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
  } catch {
    // ignore storage errors
  }
}

export function readOrders(): PlacedOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as PlacedOrder[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
