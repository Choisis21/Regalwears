"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createPost, deletePost, updatePost, type BlogDraft } from "@/lib/blog-store";

export type ActionResult = { ok: boolean; error?: string };

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Forbidden");
}

function revalidateBlog(slug?: string): void {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function saveBlogAction(
  originalSlug: string | null,
  draft: BlogDraft,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!draft.title.trim() || draft.body.length === 0) {
      return { ok: false, error: "A title and some body content are required." };
    }
    if (originalSlug) {
      await updatePost(originalSlug, draft);
      revalidateBlog(originalSlug);
    } else {
      const post = await createPost(draft);
      revalidateBlog(post.slug);
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't save the post. Please try again." };
  }
}

export async function deleteBlogAction(slug: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await deletePost(slug);
    revalidateBlog(slug);
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn't delete that post." };
  }
}
