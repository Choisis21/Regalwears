import { promises as fs } from "fs";
import path from "path";

/**
 * File-backed reviews store (data/reviews.json). Submitted reviews start as
 * PENDING and only appear on the storefront once an admin approves them.
 * SERVER ONLY.
 */

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export type StoredReview = {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  status: ReviewStatus;
};

const FILE = path.join(process.cwd(), "data", "reviews.json");

async function load(): Promise<StoredReview[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredReview[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // none yet
  }
  return [];
}

async function save(reviews: StoredReview[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(reviews, null, 2), "utf8");
}

export type ReviewDraft = {
  productId: string;
  productSlug: string;
  productName: string;
  author: string;
  rating: number;
  title: string;
  body: string;
};

export async function addReview(draft: ReviewDraft): Promise<void> {
  const all = await load();
  const review: StoredReview = {
    id: `rv_${Date.now().toString(36)}`,
    ...draft,
    rating: Math.min(5, Math.max(1, Math.round(draft.rating))),
    date: new Date().toISOString(),
    status: "PENDING",
  };
  await save([review, ...all]);
}

export async function getApprovedReviews(
  productId: string,
): Promise<StoredReview[]> {
  return (await load()).filter(
    (r) => r.productId === productId && r.status === "APPROVED",
  );
}

export async function getPendingReviews(): Promise<StoredReview[]> {
  return (await load()).filter((r) => r.status === "PENDING");
}

export async function getAllReviews(): Promise<StoredReview[]> {
  return load();
}

export async function setReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<void> {
  const all = await load();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], status };
  await save(all);
}
