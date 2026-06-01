import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-burgundy"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>
      <h1 className="mt-4 font-heading text-3xl text-foreground">New post</h1>
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
