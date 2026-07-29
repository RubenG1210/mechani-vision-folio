import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found — Ruben G." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Ruben G.` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-forest mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
        <time className="text-sm text-forest uppercase tracking-widest">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
          {post.title}
        </h1>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
          {post.content.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
