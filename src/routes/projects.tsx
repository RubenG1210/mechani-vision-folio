import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { WakeInspector } from "@/components/WakeInspector";
import { Cpu, Clock, MonitorSmartphone, CircleDot, Zap, Vibrate, Users, HandHeart } from "lucide-react";

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
    title: "Home Harvest",
    status: "1st place MESA prelims & regionals · State Finalist",
    description:
      "An ESP32-powered indoor grower that automates lighting, watering, and environmental sensing so anyone can grow food at home with zero guesswork.",
    tags: ["ESP32", "Embedded C++", "Sensors", "Automation", "CAD", "MESA"],
  },
  {
    title: "MESA Coding Solutions",
    status: "1st place prelims · 3rd place regionals",
    description:
      "Team-based algorithmic problem solving under competition pressure. Fast iteration, clear communication, and a lot of whiteboarding.",
    tags: ["Algorithms", "Python", "Teamwork", "MESA"],
  },
  {
    title: "Solar Car",
    status: "MESA Sacramento · 2025",
    description:
      "Built for the MESA Sacramento solar car race — chassis design, motor selection, and dialing in efficiency for a full-sun sprint.",
    tags: ["Mechanical", "Solar", "CAD", "MESA"],
  },
];

const WAKE_TAGS = ["ESP32-C3", "Embedded C++", "PCB", "Haptics", "CAD", "Wearables"];


function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-border/50"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const WAKE_COMPONENTS = [
  { icon: Cpu, name: "Microcontroller", part: "Seeed XIAO ESP32-C3" },
  { icon: Clock, name: "Real-Time Clock", part: "DS3231 Precision RTC" },
  { icon: MonitorSmartphone, name: "Display", part: '0.96" Monochrome OLED' },
  { icon: CircleDot, name: "User Controls", part: "3× Micro Tactile Buttons" },
  { icon: Zap, name: "Haptic Engine", part: "Dedicated Motor Driver" },
  { icon: Vibrate, name: "Actuators", part: "2× 12mm Coin ERM Motors" },
];

function WakeSchematic() {
  return (
    <div
      className="relative mt-6 overflow-hidden rounded-xl border border-forest/30 bg-[#0a1410] p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,197,120,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,120,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* corner brackets */}
      <div className="pointer-events-none absolute inset-3">
        <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-forest/60" />
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-forest/60" />
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-forest/60" />
        <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-forest/60" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-forest animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-forest">
            System Schematic · REV.A
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-forest/60 font-mono">
          WAKE-A-TIME
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {WAKE_COMPONENTS.map(({ icon: Icon, name, part }, i) => (
          <div
            key={name}
            className="group flex items-start gap-3 rounded-md border border-forest/25 bg-black/30 p-3 hover:border-forest/70 hover:bg-forest/5 transition"
          >
            <div className="rounded border border-forest/40 bg-forest/10 p-2">
              <Icon className="h-4 w-4 text-forest" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-forest/70 font-mono">
                <span>U{i + 1}</span>
                <span className="h-px flex-1 bg-forest/20" />
                <span>{name}</span>
              </div>
              <div className="mt-1 text-sm text-foreground font-mono truncate">
                {part}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {WAKE_TAGS.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-sm bg-forest/10 text-forest border border-forest/30 font-mono uppercase tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

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

        {/* Featured: Wake-A-Time */}
        <article className="mt-16 rounded-2xl border border-border bg-card p-8 animate-fade-up">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-forest-muted mb-2">
                Featured build · In progress
              </p>
              <h2 className="font-display text-3xl font-semibold">Wake-A-Time</h2>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-sm bg-forest/10 text-forest border border-forest/30">
              Hardware
            </span>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
            A silent, haptic wrist alarm designed to wake you without waking anyone else.
            Custom PCB, embedded firmware, and tuned vibration profiles.
          </p>

          <WakeSchematic />
          <WakeInspector />
          <ProjectTags tags={WAKE_TAGS} />
        </article>

        {/* Other projects */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-forest hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1.5 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <h2 className="font-display text-2xl font-semibold group-hover:text-forest transition-colors">
                {p.title}
              </h2>
              {p.status && (
                <p className="text-xs uppercase tracking-wider text-forest-muted mt-2 mb-4">
                  {p.status}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              <PlaceholderSlots />
              <ProjectTags tags={p.tags} />
            </article>
          ))}

          {/* FRC Team card */}
          <article className="md:col-span-2 rounded-2xl border border-forest/40 bg-gradient-to-br from-card to-forest/5 p-8 animate-fade-up">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-forest mb-2">
                  Founding effort · In progress
                </p>
                <h2 className="font-display text-2xl font-semibold">Grant Union FRC Team</h2>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
              Actively working to establish Grant Union High School's first FIRST Robotics
              Competition team — sponsors, mentors, curriculum, and community.
            </p>

            <div className="mt-6 rounded-xl border border-forest/40 bg-background/60 p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-2">
                Get Involved
              </p>
              <h3 className="font-display text-xl font-semibold">
                Help us build Sacramento's next robotics team.
              </h3>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link to="/frc" className="btn-forest">
                  <Users className="h-4 w-4" />
                  Students: Join the Team
                </Link>
                <Link to="/frc" className="btn-outline-forest">
                  <HandHeart className="h-4 w-4" />
                  Mentors &amp; Sponsors: Support Us
                </Link>
              </div>
            </div>

            <ProjectTags tags={["Leadership", "Robotics", "FRC", "Community"]} />
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
