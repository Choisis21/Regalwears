"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import {
  createProduct,
  deleteProduct,
  setStock,
  updateProduct,
  type ProductDraft,
} from "@/lib/catalog-store";

export type ActionResult = { ok: boolean; error?: string };

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Forbidden");
}

function revalidateCatalog(): void {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function saveProductAction(
  id: string | null,
  draft: ProductDraft,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!draft.name.trim() || draft.price <= 0) {
      return { ok: false, error: "A name and a price above zero are required." };
    }
    if (!draft.images.length && !draft.image) {
      return { ok: false, error: "Please add at least one image URL." };
    }
    if (id) {
      await updateProduct(id, draft);
    } else {
      await createProduct(draft);
    }
    revalidateCatalog();
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't save the product. Please try again." };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await deleteProduct(id);
    revalidateCatalog();
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't delete that product." };
  }
}

export async function setStockAction(
  id: string,
  stock: number,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await setStock(id, Math.max(0, Math.floor(stock)));
    revalidateCatalog();
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't update stock." };
  }
}
