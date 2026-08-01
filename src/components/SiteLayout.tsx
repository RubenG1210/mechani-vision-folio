import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Instagram } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/tools", label: "Tools" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight">
            Ruben<span className="text-forest">.</span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors hover:text-forest active:scale-95"
                activeProps={{ className: "text-sm text-forest font-medium" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <StatusBadge className="hidden md:inline-flex" />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="sm:hidden text-foreground active:scale-95 transition-transform"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-3 md:hidden">
          <StatusBadge />
        </div>
      </header>


      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background sm:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
            <Link to="/" onClick={() => setOpen(false)} className="font-display text-lg font-semibold">
              Ruben<span className="text-forest">.</span>
            </Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 py-8">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-3xl tracking-tight hover:text-forest"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex gap-4 px-6 py-8 border-t border-border/60">
            <a href="https://github.com/RubenG1210" target="_blank" rel="noreferrer" className="link-forest">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/orangutan_ruben" target="_blank" rel="noreferrer" className="link-forest">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 mt-24">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-display text-lg font-semibold">Ruben G.</div>
            <p className="text-sm text-muted-foreground mt-1">
              Sacramento · 916 · Building things that move.
            </p>
            <a href="mailto:nebur15028@gmail.com" className="text-sm link-forest mt-1 inline-block">
              nebur15028@gmail.com
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              Phone available upon request. 
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/RubenG1210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm link-forest"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://www.instagram.com/orangutan_ruben"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm link-forest"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Ruben G. — Built in Sacramento.</span>
            <Link
              to="/admin"
              className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
