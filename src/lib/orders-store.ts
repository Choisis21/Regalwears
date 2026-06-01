import { promises as fs } from "fs";
import path from "path";

import type { PlacedOrder } from "@/lib/checkout";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/order-status";

/**
 * File-backed orders store (data/orders.json). Records placed orders so the
 * account order history and the admin dashboard can read them server-side.
 * SERVER ONLY.
 */

export { ORDER_STATUSES };
export type { OrderStatus };

export type StoredOrder = PlacedOrder & { status: OrderStatus };

const FILE = path.join(process.cwd(), "data", "orders.json");

async function load(): Promise<StoredOrder[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredOrder[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // no orders yet
  }
  return [];
}

async function save(orders: StoredOrder[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2), "utf8");
}

export async function recordOrder(order: PlacedOrder): Promise<void> {
  const all = await load();
  await save([{ ...order, status: "PROCESSING" }, ...all]);
}

export async function getAllOrders(): Promise<StoredOrder[]> {
  return load();
}

export async function getOrdersByEmail(email: string): Promise<StoredOrder[]> {
  const target = email.trim().toLowerCase();
  return (await load()).filter((o) => o.email.toLowerCase() === target);
}

export async function setOrderStatus(
  ref: string,
  status: OrderStatus,
): Promise<void> {
  const all = await load();
  const idx = all.findIndex((o) => o.ref === ref);
  if (idx === -1) return;
  all[idx] = { ...all[idx], status };
  await save(all);
}
