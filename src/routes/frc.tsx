import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Loader2, Users, HandHeart } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/frc")({
  head: () => ({
    meta: [
      { title: "Grant Union FRC Team Launch — Ruben G." },
      {
        name: "description",
        content:
          "The four-phase roadmap to founding Grant Union High School's first FIRST Robotics Competition team in Sacramento — plus student and sponsor inquiries.",
      },
      { property: "og:title", content: "Grant Union FRC Team Launch" },
      {
        property: "og:description",
        content: "Roadmap and inquiry form for Sacramento's next FIRST Robotics team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FrcPage,
});

const PHASES = [
  {
    n: 1,
    title: "Charter Proposal & School Approval",
    state: "active" as const,
    detail:
      "Writing the team charter, safety plan, and budget, then getting sign-off from Grant Union administration and a faculty advisor.",
  },
  {
    n: 2,
    title: "Grants & Sponsor Outreach",
    state: "upcoming" as const,
    detail:
      "FIRST rookie grants, regional STEM funds, and local Sacramento manufacturing sponsors to cover registration, tooling, and travel.",
  },
  {
    n: 3,
    title: "Student Recruitment & C++/CAD Workshops",
    state: "upcoming" as const,
    detail:
      "Open workshops in embedded C++, Onshape/Fusion CAD, and shop safety so rookies show up to kickoff already able to contribute.",
  },
  {
    n: 4,
    title: "FIRST Competition Build Season",
    state: "upcoming" as const,
    detail:
      "Six weeks: strategy, prototyping, fabrication, drive practice, and a robot that survives a full regional.",
  },
];

function Roadmap() {
  const [open, setOpen] = useState(1);
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-4">
      {PHASES.map((p, i) => {
        const isOpen = open === p.n;
        const isActive = p.state === "active";
        return (
          <button
            key={p.n}
            type="button"
            onClick={() => setOpen(p.n)}
            className={`text-left rounded-2xl border p-6 transition-all duration-300 animate-fade-up ${
              isOpen
                ? "border-forest bg-forest/10 shadow-xl shadow-forest/10 -translate-y-1"
                : "border-border bg-card hover:border-forest/60"
            }`}
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-forest font-mono">
              Phase {p.n}
              {isActive ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Circle className="h-3 w-3 opacity-50" />
              )}
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
            <span
              className={`mt-3 inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm border font-mono ${
                isActive
                  ? "border-forest/50 bg-forest/15 text-forest"
                  : "border-border text-muted-foreground"
              }`}
            >
              {isActive ? "Active" : "Upcoming"}
            </span>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-sm text-muted-foreground leading-relaxed">
                {p.detail}
              </p>
            </div>
            <div className="mt-5 h-1 w-full rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-forest transition-all duration-500"
                style={{ width: isActive ? "35%" : "0%" }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

function InquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-6 rounded-xl border border-forest/50 bg-forest/10 p-8 text-center animate-scale-in">
        <CheckCircle2 className="mx-auto h-8 w-8 text-forest" />
        <h3 className="mt-4 font-display text-xl font-semibold">Message sent.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        try {
          await fetch("https://formspree.io/f/xpqvnzbe", {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });
        } catch {
          /* still confirm to the visitor */
        }
        setSent(true);
      }}
      className="mt-6 space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Name</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-forest"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-forest"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">I'm reaching out as</span>
        <select
          name="role"
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-forest"
        >
          <option>Student interested in joining</option>
          <option>Parent / guardian</option>
          <option>Mentor</option>
          <option>Sponsor / company</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-1 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-forest"
        />
      </label>
      <input type="hidden" name="_subject" value="Grant Union FRC inquiry" />
      <button type="submit" className="btn-forest w-full justify-center">
        Send inquiry
      </button>
    </form>
  );
}

function FrcPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-forest mb-4">Founding effort</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Grant Union FRC Team launch roadmap.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Kids in North Sac deserve the same shot at engineering that kids in the suburbs get by
            default. Here's exactly how the team gets built.
          </p>
        </div>

        <Roadmap />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-forest/40 bg-gradient-to-br from-card to-forest/5 p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-2">Get Involved</p>
            <h2 className="font-display text-2xl font-semibold">
              Student Interest & Sponsor Inquiry
            </h2>
            <p className="mt-3 text-muted-foreground">
              Whether you want to build, mentor, or fund — this is the fastest way to reach me.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <span className="btn-outline-forest pointer-events-none">
                <Users className="h-4 w-4" /> Students
              </span>
              <span className="btn-outline-forest pointer-events-none">
                <HandHeart className="h-4 w-4" /> Mentors &amp; Sponsors
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <InquiryForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
