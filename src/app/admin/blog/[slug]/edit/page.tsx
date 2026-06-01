import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getPostBySlug } from "@/lib/blog-store";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-burgundy"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>
      <h1 className="mt-4 font-heading text-3xl text-foreground">Edit post</h1>
      <div className="mt-6">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
