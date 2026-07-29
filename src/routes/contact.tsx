import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Instagram, Send, Check, Mail, Phone } from "lucide-react";
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 grid gap-5"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              required
              className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              required
              rows={6}
              className="rounded-lg border border-border bg-card px-4 py-3 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition resize-none"
            />
          </div>
          <div>
            <button type="submit" className="btn-forest" disabled={sent}>
              {sent ? (<><Check className="h-4 w-4" /> Message sent</>) : (<>Send message <Send className="h-4 w-4" /></>)}
            </button>
          </div>
        </form>

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
          <a
            href="tel:+19169042415"
            className="flex items-start gap-3 rounded-xl border border-border p-4 hover:border-forest transition"
          >
            <Phone className="h-5 w-5 text-forest mt-0.5" />
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">(916) 904-2415</div>
              <div className="text-xs text-muted-foreground mt-1">
                Text preferred — expect a delayed response if calling.
              </div>
            </div>
          </a>
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
