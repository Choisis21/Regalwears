"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { updateSettings, type SiteSettings } from "@/lib/settings-store";

export async function saveSettingsAction(
  settings: SiteSettings,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return { ok: false, error: "Forbidden" };
  if (!settings.siteTitle.trim()) {
    return { ok: false, error: "A site title is required." };
  }
  await updateSettings(settings);
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true };
}
