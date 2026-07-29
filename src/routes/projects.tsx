import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Ruben G." },
      {
        name: "description",
        content:
          "Hardware and robotics projects by Ruben G. — Wake-A-Time, Home Harvest, MESA Coding, Solar Car, and founding Grant Union's FRC team.",
      },
      { property: "og:title", content: "Projects — Ruben G." },
      {
        property: "og:description",
        content: "Selected hardware, embedded, and robotics projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

type Project = {
  title: string;
  status?: string;
  description: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Wake-A-Time",
    status: "In progress",
    description:
      "A silent, haptic wrist alarm device designed to wake you without waking anyone else. Custom PCB, embedded firmware, and vibration motor tuning.",
    tags: ["Embedded C++", "Hardware", "PCB", "Wearables"],
  },
  {
    title: "Home Harvest",
    status: "1st place MESA prelims & regionals · State Finalist",
    description:
      "An ESP32-powered indoor grower that automates lighting, watering, and environmental sensing so anyone can grow food at home with zero guesswork.",
    tags: ["ESP32", "Sensors", "Automation", "MESA"],
  },
  {
    title: "MESA Coding Solutions",
    status: "1st place prelims · 3rd place regionals",
    description:
      "Team-based algorithmic problem solving under competition pressure. Fast iteration, clear communication, and a lot of whiteboarding.",
    tags: ["Algorithms", "Teamwork", "MESA"],
  },
  {
    title: "Solar Car",
    description:
      "Built for the MESA Sacramento solar car race — chassis design, motor selection, and dialing in efficiency for a full-sun sprint.",
    tags: ["Mechanical", "Solar", "MESA"],
  },
  {
    title: "Grant Union FRC Team",
    status: "Founding effort",
    description:
      "Actively working to establish Grant Union High School's first FIRST Robotics Competition team — sponsors, mentors, curriculum, and community.",
    tags: ["Leadership", "Robotics", "Community"],
  },
];

function Projects() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-forest mb-4">Projects</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Things I've built, broken, and rebuilt.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A mix of embedded hardware, robotics, and competition work. Most of these are
            still evolving — that's the point.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-forest hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1.5 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="font-display text-2xl font-semibold group-hover:text-forest transition-colors">
                  {p.title}
                </h2>
              </div>
              {p.status && (
                <p className="text-xs uppercase tracking-wider text-forest-muted mb-4">
                  {p.status}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
