"use client";

import { getProjects, type Project } from "@/lib/projects";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

function urlFromMetric(p: Project): string | null {
  if (p.url) return p.url;
  const m = p.metric.match(/\b([a-z0-9-]+\.vercel\.app)/i);
  return m ? `https://${m[1]}` : null;
}

export function Work() {
  const { lang } = useLang();
  const t = dict[lang].work;
  const projects = getProjects(lang);
  const track = [...projects, ...projects];

  const STATUS_DOT: Record<Project["status"], string> = {
    prod: "dot-prod",
    internal: "dot-internal",
    wip: "dot-wip",
  };

  return (
    <section id="work" className="relative pb-24">
      <div className="mx-auto mb-10 max-w-[1280px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="display text-[clamp(40px,6vw,76px)]">
              {t.title[0]}
              <span className="display-italic text-[var(--accent)]">{t.title[1]}</span>
              {t.title[2]}
            </h2>
          </div>
          <div className="hidden items-center gap-2 font-mono text-[11px] text-[var(--ink-mute)] md:flex">
            <span>{t.count(projects.length)}</span>
            <span className="text-[var(--ink-faint)]">·</span>
            <span>{t.pause}</span>
          </div>
        </div>
      </div>

      <div className="marquee-cards-wrap relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(90deg, #000, transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(270deg, #000, transparent)" }}
        />

        <div className="marquee-cards px-6 md:px-10">
          {track.map((p, i) => (
            <Card
              key={`${p.slug}-${i}`}
              p={p}
              statusLabel={t.statuses[p.status]}
              statusDot={STATUS_DOT[p.status]}
              noUrl={t.noUrl}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1280px] px-6 md:px-10">
        <p className="font-mono text-[12px] text-[var(--ink-mute)]">
          {t.bottomA}{" "}
          <a href="#console" className="draw-under text-[var(--accent)]">
            console
          </a>{" "}
          {t.bottomB}{" "}
          <span className="kbd">cat &lt;{lang === "en" ? "project" : "projeto"}&gt;</span>.
        </p>
      </div>
    </section>
  );
}

function Card({
  p,
  statusLabel,
  statusDot,
  noUrl,
}: {
  p: Project;
  statusLabel: string;
  statusDot: string;
  noUrl: string;
}) {
  const url = urlFromMetric(p);

  const Inner = (
    <article className="card card-hover relative flex h-[280px] w-[320px] flex-col justify-between p-5 md:h-[300px] md:w-[360px]">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[14px] text-[var(--ink)]">
            {p.name}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
            <span className={`dot ${statusDot}`} />
            {statusLabel}
          </span>
        </div>
        <p className="mt-1 font-sans text-[12.5px] text-[var(--ink-soft)]">
          {p.role}
        </p>

        <p className="mt-4 line-clamp-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
          {p.blurb}
        </p>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-[11px] text-[var(--accent)]">{p.metric}</p>
        <div className="flex flex-wrap gap-1">
          {p.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded border border-[var(--rule)] bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-soft)]"
            >
              {s}
            </span>
          ))}
        </div>
        {url ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--accent)]">
            {url.replace(/^https?:\/\//, "")} <span aria-hidden>↗</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--ink-mute)]">
            {noUrl}
          </span>
        )}
      </div>
    </article>
  );

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {Inner}
    </a>
  ) : (
    <div className="shrink-0">{Inner}</div>
  );
}
