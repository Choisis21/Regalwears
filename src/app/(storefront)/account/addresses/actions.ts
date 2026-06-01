"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type AddressInput = {
  id?: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
};

export type ActionResult = { ok: boolean; error?: string };

export type SavedAddress = {
  fullName: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  phone: string | null;
};

/** Returns the signed-in user's default address (or most recent), else null. */
export async function getDefaultAddress(): Promise<SavedAddress | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const addr = await prisma.address.findFirst({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { id: "desc" }],
  });
  if (!addr) return null;

  return {
    fullName: addr.fullName,
    line1: addr.line1,
    line2: addr.line2,
    city: addr.city,
    state: addr.state,
    postalCode: addr.postalCode,
    country: addr.country,
    phone: addr.phone,
  };
}

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not signed in");
  return session.user.id;
}

function clean(input: AddressInput) {
  const fullName = input.fullName?.trim() ?? "";
  const line1 = input.line1?.trim() ?? "";
  const city = input.city?.trim() ?? "";
  const postalCode = input.postalCode?.trim() ?? "";
  const country = input.country?.trim() ?? "";

  if (!fullName || !line1 || !city || !postalCode || !country) {
    return null;
  }

  return {
    fullName,
    line1,
    line2: input.line2?.trim() || null,
    city,
    state: input.state?.trim() || null,
    postalCode,
    country,
    phone: input.phone?.trim() || null,
  };
}

export async function saveAddress(input: AddressInput): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const data = clean(input);
    if (!data) {
      return { ok: false, error: "Please fill in all the required fields." };
    }

    const existingCount = await prisma.address.count({ where: { userId } });
    const makeDefault = input.isDefault || existingCount === 0;

    if (input.id) {
      // Update — make sure the address belongs to this user.
      const owned = await prisma.address.findFirst({
        where: { id: input.id, userId },
        select: { id: true },
      });
      if (!owned) return { ok: false, error: "Address not found." };

      await prisma.$transaction(async (tx) => {
        if (makeDefault) {
          await tx.address.updateMany({
            where: { userId },
            data: { isDefault: false },
          });
        }
        await tx.address.update({
          where: { id: input.id },
          data: { ...data, isDefault: makeDefault },
        });
      });
    } else {
      await prisma.$transaction(async (tx) => {
        if (makeDefault) {
          await tx.address.updateMany({
            where: { userId },
            data: { isDefault: false },
          });
        }
        await tx.address.create({
          data: { ...data, isDefault: makeDefault, userId },
        });
      });
    }

    revalidatePath("/account/addresses");
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const owned = await prisma.address.findFirst({
      where: { id, userId },
      select: { id: true, isDefault: true },
    });
    if (!owned) return { ok: false, error: "Address not found." };

    await prisma.address.delete({ where: { id } });

    // If we removed the default, promote the most recent remaining address.
    if (owned.isDefault) {
      const next = await prisma.address.findFirst({
        where: { userId },
        orderBy: { id: "desc" },
        select: { id: true },
      });
      if (next) {
        await prisma.address.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }

    revalidatePath("/account/addresses");
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't remove that address. Please try again." };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  try {
    const userId = await requireUserId();
    const owned = await prisma.address.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!owned) return { ok: false, error: "Address not found." };

    await prisma.$transaction([
      prisma.address.updateMany({ where: { userId }, data: { isDefault: false } }),
      prisma.address.update({ where: { id }, data: { isDefault: true } }),
    ]);

    revalidatePath("/account/addresses");
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't update your default. Please try again." };
  }
}
