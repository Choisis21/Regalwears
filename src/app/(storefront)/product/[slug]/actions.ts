"use server";

import { auth } from "@/auth";
import { addReview } from "@/lib/reviews-store";

export type SubmitReviewInput = {
  productId: string;
  productSlug: string;
  productName: string;
  rating: number;
  title: string;
  body: string;
};

export async function submitReviewAction(
  input: SubmitReviewInput,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Please sign in to write a review." };
  }
  if (!input.body.trim()) {
    return { ok: false, error: "Please write a little something." };
  }

  await addReview({
    productId: input.productId,
    productSlug: input.productSlug,
    productName: input.productName,
    author: session.user.name || "Verified buyer",
    rating: input.rating,
    title: input.title.trim() || "My review",
    body: input.body.trim(),
  });

  return { ok: true };
}
