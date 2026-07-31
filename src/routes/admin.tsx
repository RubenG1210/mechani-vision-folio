import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Lock, Sparkles, Save, Send, KeyRound, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Markdown } from "@/components/Markdown";
import {
  ADMIN_PASSCODE,
  ADMIN_UNLOCK_KEY,
  DRAFT_KEY,
  GROK_KEY,
  publishPost,
  slugify,
  type Draft,
} from "@/lib/local-posts";
import { callGrok, formatPrompt, refinePrompt } from "@/lib/grok";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Master Admin Panel — Ruben G." },
      { name: "description", content: "Private control panel for drafting and publishing build logs." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Master Admin Panel" },
      { property: "og:description", content: "Private control panel for build logs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value === ADMIN_PASSCODE) {
            window.localStorage.setItem(ADMIN_UNLOCK_KEY, "1");
            onUnlock();
          } else {
            setError(true);
          }
        }}
        className="w-full max-w-sm rounded-2xl border border-forest/40 bg-card p-8 animate-scale-in"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-forest/40 bg-forest/10 p-2">
            <Lock className="h-5 w-5 text-forest" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-forest">Restricted</p>
            <h1 className="font-display text-xl font-semibold">Master Admin Panel</h1>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Enter passcode to unlock the console.</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="••••"
          className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-3 font-mono tracking-[0.4em] text-center outline-none focus:border-forest"
        />
        {error && (
          <p className="mt-3 flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" /> Incorrect passcode.
          </p>
        )}
        <button type="submit" className="btn-forest mt-6 w-full justify-center">
          Unlock
        </button>
      </form>
    </div>
  );
}

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  const [apiKey, setApiKey] = useState("");
  const [title, setTitle] = useState("");
  const [raw, setRaw] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [tweak, setTweak] = useState("");
  const [busy, setBusy] = useState<"format" | "refine" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(ADMIN_UNLOCK_KEY) === "1");
    setApiKey(window.localStorage.getItem(GROK_KEY) ?? "");
    try {
      const d = window.localStorage.getItem(DRAFT_KEY);
      if (d) {
        const parsed = JSON.parse(d) as Draft & { title?: string };
        setTitle(parsed.title ?? "");
        setRaw(parsed.raw ?? "");
        setMarkdown(parsed.markdown ?? "");
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const excerpt = useMemo(() => {
    const plain = markdown
      .split("\n")
      .find((l) => l.trim() && !l.trim().startsWith("#") && !l.trim().startsWith("|"));
    return (plain ?? raw).replace(/[*`#]/g, "").slice(0, 180);
  }, [markdown, raw]);

  async function run(kind: "format" | "refine") {
    setError(null);
    setStatus(null);
    if (!apiKey.trim()) return setError("Add your Grok API key first.");
    if (kind === "format" && !raw.trim()) return setError("Add some raw notes first.");
    if (kind === "refine" && (!markdown.trim() || !tweak.trim()))
      return setError("Generate a post and enter a refinement instruction.");

    setBusy(kind);
    try {
      const prompt = kind === "format" ? formatPrompt(raw) : refinePrompt(markdown, tweak);
      const out = await callGrok(apiKey.trim(), prompt);
      setMarkdown(out);
      if (kind === "refine") setTweak("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed.");
    } finally {
      setBusy(null);
    }
  }

  function saveDraft() {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, raw, markdown }));
    setStatus("Draft saved locally.");
  }

  function publish() {
    if (!title.trim() || !markdown.trim()) {
      setError("A title and generated post are required to publish.");
      return;
    }
    publishPost({
      slug: slugify(title),
      title: title.trim(),
      date: new Date().toISOString().slice(0, 10),
      excerpt,
      content: [],
      markdown,
    });
    setStatus("Published to the live blog feed.");
    setError(null);
  }

  if (!ready) return null;

  return (
    <SiteLayout>
      {!unlocked && <PasscodeGate onUnlock={() => setUnlocked(true)} />}
      <section className={`mx-auto max-w-7xl px-6 pt-12 pb-24 ${unlocked ? "" : "pointer-events-none blur-md select-none"}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-forest">Admin</p>
            <h1 className="font-display text-4xl font-semibold mt-2">Build Log Console</h1>
          </div>
          {unlocked && (
            <button
              onClick={() => {
                window.localStorage.removeItem(ADMIN_UNLOCK_KEY);
                setUnlocked(false);
              }}
              className="btn-outline-forest"
            >
              <Lock className="h-4 w-4" /> Lock panel
            </button>
          )}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-3 flex items-center gap-2">
                <KeyRound className="h-3.5 w-3.5" /> API Settings
              </p>
              <label className="text-sm text-muted-foreground" htmlFor="grokKey">
                Grok API Key (stored in this browser only)
              </label>
              <input
                id="grokKey"
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  window.localStorage.setItem(GROK_KEY, e.target.value);
                }}
                placeholder="xai-..."
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-forest"
              />
              <p className="mt-2 text-xs text-muted-foreground font-mono">
                model: grok-beta (fallback: grok-2-1212) · endpoint: api.x.ai/v1/chat/completions
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-3">Raw Notes</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-forest"
              />
              <textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                rows={16}
                placeholder="Dump the messy notes here — parts used, current draw, what broke, what you fixed..."
                className="mt-3 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-forest"
              />
              <button
                onClick={() => run("format")}
                disabled={busy !== null}
                className="btn-forest mt-4 w-full justify-center disabled:opacity-60"
              >
                {busy === "format" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Format with Grok
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-forest/30 bg-card p-6 min-h-[300px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-4">Live Post Preview</p>
              {markdown ? (
                <>
                  {title && <h2 className="font-display text-2xl font-semibold mb-4">{title}</h2>}
                  <Markdown source={markdown} />
                </>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Formatted output will appear here.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-forest mb-3">
                Refine Post with Grok
              </p>
              <input
                value={tweak}
                onChange={(e) => setTweak(e.target.value)}
                placeholder='e.g. "Make tone less playful", "Add more detail about power draw", "Make concise"'
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest"
              />
              <button
                onClick={() => run("refine")}
                disabled={busy !== null}
                className="btn-outline-forest mt-3 w-full justify-center disabled:opacity-60"
              >
                {busy === "refine" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Apply Tweaks
              </button>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" /> {error}
              </p>
            )}
            {status && (
              <p className="flex items-center gap-2 rounded-lg border border-forest/40 bg-forest/10 px-4 py-3 text-sm text-forest">
                <CheckCircle2 className="h-4 w-4" /> {status}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={saveDraft} className="btn-outline-forest flex-1 justify-center">
                <Save className="h-4 w-4" /> Save Draft
              </button>
              <button onClick={publish} className="btn-forest flex-1 justify-center">
                <Send className="h-4 w-4" /> Publish to Live Blog
              </button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
