"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { setReviewStatus } from "@/lib/reviews-store";

async function moderate(
  id: string,
  slug: string,
  status: "APPROVED" | "REJECTED",
): Promise<{ ok: boolean }> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { ok: false };
  await setReviewStatus(id, status);
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath(`/product/${slug}`);
  return { ok: true };
}

export async function approveReviewAction(id: string, slug: string) {
  return moderate(id, slug, "APPROVED");
}

export async function rejectReviewAction(id: string, slug: string) {
  return moderate(id, slug, "REJECTED");
}
