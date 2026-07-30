import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { allPosts, readPublished } from "@/lib/local-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Ruben G." },
      {
        name: "description",
        content:
          "Notes on hardware, robotics, and building an FRC team in Sacramento — by Ruben G.",
      },
      { property: "og:title", content: "Blog — Ruben G." },
      {
        property: "og:description",
        content: "Notes on hardware, robotics, and building an FRC team in Sacramento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/blog/$slug");
  if (isChild) return <Outlet />;
  return <BlogIndex />;
}

function BlogIndex() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  useEffect(() => {
    setPosts(allPosts(readPublished()));
  }, []);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-forest mb-4">Blog</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Logs from the workbench.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Short writeups on what I'm building, learning, and trying to change.
          </p>
        </div>

        <ul className="mt-16 divide-y divide-border">
          {posts.map((post, i) => (
            <li key={post.slug} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-2 py-8 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-6 transition-colors hover:pl-2"
              >
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div>
                  <h2 className="font-display text-2xl font-semibold group-hover:text-forest transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                </div>
                <ArrowUpRight className="hidden md:block h-5 w-5 text-muted-foreground group-hover:text-forest transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
