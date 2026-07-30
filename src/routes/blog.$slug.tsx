import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Markdown } from "@/components/Markdown";
import { getPost, type BlogPost } from "@/lib/blog-posts";
import { readPublished } from "@/lib/local-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug) ?? null;
    return { post, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: "Build log — Ruben G." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
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
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: staticPost, slug } = Route.useLoaderData();
  const [post, setPost] = useState<BlogPost | null>(staticPost);
  const [checked, setChecked] = useState(Boolean(staticPost));

  useEffect(() => {
    if (staticPost) return;
    setPost(readPublished().find((p) => p.slug === slug) ?? null);
    setChecked(true);
  }, [slug, staticPost]);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-forest mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>

        {!post ? (
          <p className="text-muted-foreground">
            {checked ? "That post doesn't exist." : "Loading post…"}
          </p>
        ) : (
          <>
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
              {post.markdown ? (
                <Markdown source={post.markdown} />
              ) : (
                post.content.map((p: string, i: number) => <p key={i}>{p}</p>)
              )}
            </div>
          </>
        )}
      </article>
    </SiteLayout>
  );
}

