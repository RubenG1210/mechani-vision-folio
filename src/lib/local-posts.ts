import type { BlogPost } from "./blog-posts";
import { BLOG_POSTS } from "./blog-posts";

export const PUBLISHED_KEY = "ruben.publishedPosts";
export const DRAFT_KEY = "ruben.postDraft";
export const ADMIN_UNLOCK_KEY = "ruben.adminUnlocked";
export const GROK_KEY = "ruben.grokApiKey";
export const ADMIN_PASSCODE = "1980";

export type Draft = {
  title: string;
  raw: string;
  markdown: string;
};

export function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || `post-${Date.now()}`
  );
}

export function readPublished(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PUBLISHED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export function writePublished(posts: BlogPost[]) {
  window.localStorage.setItem(PUBLISHED_KEY, JSON.stringify(posts));
}

export function publishPost(post: BlogPost) {
  const existing = readPublished().filter((p) => p.slug !== post.slug);
  writePublished([post, ...existing]);
}

export function allPosts(local: BlogPost[]): BlogPost[] {
  const seen = new Set(local.map((p) => p.slug));
  return [...local, ...BLOG_POSTS.filter((p) => !seen.has(p.slug))].sort(
    (a, b) => b.date.localeCompare(a.date),
  );
}
