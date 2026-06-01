import { getPendingReviews } from "@/lib/reviews-store";
import { ReviewModeration } from "@/components/admin/review-moderation";

export default async function AdminReviewsPage() {
  const pending = await getPendingReviews();

  const rows = pending.map((r) => ({
    id: r.id,
    productSlug: r.productSlug,
    productName: r.productName,
    author: r.author,
    rating: r.rating,
    title: r.title,
    body: r.body,
    date: r.date,
  }));

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground">Reviews</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {pending.length} review{pending.length === 1 ? "" : "s"} awaiting your
        approval. Approved reviews appear on the product page.
      </p>
      <div className="mt-6">
        <ReviewModeration reviews={rows} />
      </div>
    </div>
  );
}
