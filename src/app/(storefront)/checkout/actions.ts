"use server";

import type { PlacedOrder } from "@/lib/checkout";
import { recordOrder } from "@/lib/orders-store";

export async function recordOrderAction(order: PlacedOrder): Promise<void> {
  await recordOrder(order);
}
