import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Instagram, Send, Check, Mail, Lock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ruben G." },
      {
        name: "description",
        content:
          "Get in touch with Ruben G. — collaborations, FRC sponsorships, mentorship, and project questions welcome.",
      },
      { property: "og:title", content: "Contact — Ruben G." },
      {
        property: "og:description",
        content: "Get in touch about projects, FRC sponsorships, or mentorship.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xpqvnzbe", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setError("Network error. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <p className="text-sm uppercase tracking-widest text-forest mb-4">Contact</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
          Let's build something.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Whether you're a sponsor interested in the Grant Union FRC effort, a mentor,
          or just want to talk about hardware — send a note.
        </p>

        {sent ? (
          <div className="mt-12 rounded-2xl border border-forest bg-forest/10 p-8 animate-scale-in">
            <div className="flex items-center gap-3 text-forest">
              <div className="rounded-full bg-forest/20 p-2">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Message received.
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-sm link-forest"
            >
              Send another message →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-5">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                required
                className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition resize-none"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div>
              <button type="submit" className="btn-forest" disabled={submitting}>
                {submitting ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 pt-10 border-t border-border grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:nebur15028@gmail.com"
            className="flex items-start gap-3 rounded-xl border border-border p-4 hover:border-forest transition"
          >
            <Mail className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <div className="font-medium">Email</div>
              <div className="text-sm text-muted-foreground">nebur15028@gmail.com</div>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <Lock className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">Available upon request</div>
              <div className="text-xs text-muted-foreground mt-1">
                Reach out via email first and I'll share my number.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Elsewhere</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/RubenG1210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-forest transition"
            >
              <Github className="h-5 w-5 text-forest" />
              <div>
                <div className="font-medium">GitHub</div>
                <div className="text-sm text-muted-foreground">@RubenG1210</div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/orangutan_ruben"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-forest transition"
            >
              <Instagram className="h-5 w-5 text-forest" />
              <div>
                <div className="font-medium">Instagram</div>
                <div className="text-sm text-muted-foreground">@orangutan_ruben</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
