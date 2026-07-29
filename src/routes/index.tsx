import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruben G. — Aspiring Mechatronics Engineer" },
      {
        name: "description",
        content:
          "Grant Union High School student from Sacramento building hardware, robotics, and embedded projects on the road to mechatronics engineering.",
      },
      { property: "og:title", content: "Ruben G. — Aspiring Mechatronics Engineer" },
      {
        property: "og:description",
        content:
          "Sacramento-based student engineer. Robotics, embedded systems, and the road to Boston Dynamics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className="inline-block h-2 w-2 rounded-full bg-forest animate-pulse" />
          <MapPin className="h-3.5 w-3.5" />
          Sacramento, CA · 916
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95]">
          Hi, I'm Ruben. <br />
          I build things that <span className="text-forest italic">move</span>.
        </h1>

        <p className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Grant Union High School student and 916 native. Aspiring{" "}
          <span className="text-foreground font-medium">mechatronics engineer</span>{" "}
          chasing the kind of high-level robotics that comes out of places like Boston
          Dynamics — one soldered board and MESA competition at a time.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/projects" className="btn-forest">
            See my projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-outline-forest">
            Get in touch
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
