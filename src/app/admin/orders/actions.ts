"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { setOrderStatus, type OrderStatus } from "@/lib/orders-store";

export async function updateOrderStatusAction(
  ref: string,
  status: OrderStatus,
): Promise<{ ok: boolean }> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { ok: false };
  await setOrderStatus(ref, status);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { ok: true };
}
