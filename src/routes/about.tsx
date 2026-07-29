import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ruben G." },
      {
        name: "description",
        content:
          "Sacramento student, Grant Union High School, aspiring mechatronics engineer. MESA competitor and founder of the school's FRC initiative.",
      },
      { property: "og:title", content: "About — Ruben G." },
      {
        property: "og:description",
        content: "Sacramento student engineer on the road to mechatronics.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const SKILLS = ["Embedded C++", "ESP32", "Sensors", "Robotics", "PCB Design", "Team Leadership"];

const TIMELINE = [
  { year: "2025", title: "Solar Car Build", body: "Competed in the MESA Sacramento solar car race." },
  { year: "2026", title: "MESA Coding — 1st Prelims, 3rd Regionals", body: "Team-based algorithmic problem solving under time pressure." },
  { year: "2026", title: "Home Harvest — State Finalist", body: "1st place MESA prelims and regionals; advanced to the California state finals." },
  { year: "2026", title: "Started Wake-A-Time", body: "Began development on a haptic wrist alarm device." },
  { year: "In progress", title: "Founding Grant Union FRC Team", body: "Currently working to establish the school's first FIRST Robotics Competition team." },
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-forest mb-4">About</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Sacramento kid, building toward something bigger.
          </h1>
        </div>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <p>
            I'm Ruben — a 916 native heading into Grant Union High School. I've spent the
            last few years turning after-school hours into hardware projects, MESA
            competitions, and a growing pile of half-finished PCBs I promise I'll clean up.
          </p>
          <p>
            My long-term goal is <span className="text-forest font-medium">mechatronics engineering</span> —
            specifically the kind of high-level robotics work happening at places like
            Boston Dynamics. To get there, I'm stacking real projects, learning to lead teams,
            and trying to build the kind of resources at Grant Union that I wish already existed.
          </p>
        </div>

        <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-display text-2xl font-semibold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s, i) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full border border-forest/30 text-sm text-forest bg-forest/5 transition-all hover:bg-forest/15 hover:border-forest hover:-translate-y-0.5 animate-fade-up"
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-8 animate-fade-up">Timeline</h2>
          <ol className="relative border-l-2 border-forest/20 space-y-8 pl-6">
            {TIMELINE.map((item, i) => (
              <li key={i} className="relative animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-forest ring-4 ring-background transition-transform hover:scale-125" />
                <div className="text-xs uppercase tracking-widest text-forest-muted">{item.year}</div>
                <h3 className="font-display text-xl font-semibold mt-1">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
