import { promises as fs } from "fs";
import path from "path";

import { blogPosts, type BlogPost } from "@/lib/placeholder-data";

/**
 * File-backed blog store (data/blog.json), seeded from the placeholder posts.
 * Slug is the identity. SERVER ONLY.
 */

const FILE = path.join(process.cwd(), "data", "blog.json");

async function save(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2), "utf8");
}

async function load(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as BlogPost[];
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // seed below
  }
  await save(blogPosts);
  return blogPosts;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return load();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await load()).find((p) => p.slug === slug) ?? null;
}

export async function getPreviews(limit = 3): Promise<BlogPost[]> {
  return (await load()).slice(0, limit);
}

export type BlogDraft = Omit<BlogPost, "slug"> & { slug?: string };

export async function createPost(draft: BlogDraft): Promise<BlogPost> {
  const all = await load();
  const baseSlug = draft.slug ? slugify(draft.slug) : slugify(draft.title);
  let slug = baseSlug || `post-${all.length + 1}`;
  let n = 2;
  while (all.some((p) => p.slug === slug)) slug = `${baseSlug}-${n++}`;

  const post: BlogPost = { ...draft, slug };
  await save([post, ...all]);
  return post;
}

export async function updatePost(
  originalSlug: string,
  draft: BlogDraft,
): Promise<BlogPost | null> {
  const all = await load();
  const idx = all.findIndex((p) => p.slug === originalSlug);
  if (idx === -1) return null;
  const updated: BlogPost = { ...all[idx], ...draft, slug: originalSlug };
  all[idx] = updated;
  await save(all);
  return updated;
}

export async function deletePost(slug: string): Promise<void> {
  const all = await load();
  await save(all.filter((p) => p.slug !== slug));
}
