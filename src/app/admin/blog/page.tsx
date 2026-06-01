import Link from "next/link";
import { Plus } from "lucide-react";

import { getAllPosts } from "@/lib/blog-store";
import { BlogList } from "@/components/admin/blog-list";

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  const rows = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: p.date,
    image: p.image,
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} post{posts.length === 1 ? "" : "s"} in the journal.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-burgundy/90"
        >
          <Plus className="size-4" />
          New post
        </Link>
      </div>

      <div className="mt-6">
        <BlogList posts={rows} />
      </div>
    </div>
  );
}
