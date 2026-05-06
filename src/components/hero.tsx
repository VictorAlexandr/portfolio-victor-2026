"use client";

import { Graph } from "./graph";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

export function Hero() {
  const { lang } = useLang();
  const t = dict[lang].hero;

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 pt-6 pb-24 md:px-10 md:pt-10 md:pb-32">
      <div className="mb-8 flex items-center justify-between">
        <span className="numtag flex items-center gap-2">
          <span className="dot dot-prod" />
          {t.topbar}
        </span>
        <span className="numtag hidden md:inline">{t.vol}</span>
      </div>

      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="display text-[clamp(56px,9vw,148px)] tracking-tight">
            Victor
            <br />
            <span className="display-italic text-[var(--accent)]">Alexandre</span>
          </h1>

          <p className="mt-8 max-w-[460px] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            {t.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
            <a
              href="#console"
              className="draw-under inline-flex items-center gap-1.5 text-[var(--ink)]"
            >
              {t.cta.console}
              <span aria-hidden>↓</span>
            </a>
            <a
              href="#experience"
              className="draw-under inline-flex items-center gap-1.5 text-[var(--ink-soft)]"
            >
              {t.cta.exp}
              <span aria-hidden>↓</span>
            </a>
            <a
              href="#work"
              className="draw-under inline-flex items-center gap-1.5 text-[var(--ink-mute)]"
            >
              {t.cta.work}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <div className="relative h-[420px] w-full lg:h-[520px]">
          <Graph />
        </div>
      </div>

      <div className="mt-20">
        <div className="rule" />
        <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-4">
          <Meta label={t.meta.currently.label} value={t.meta.currently.value} />
          <Meta label={t.meta.stack.label} value={t.meta.stack.value} />
          <Meta label={t.meta.live.label} value={t.meta.live.value} />
          <Meta label={t.meta.studying.label} value={t.meta.studying.value} />
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="numtag mb-1.5">{label}</div>
      <div className="text-[14px] leading-snug text-[var(--ink)]">{value}</div>
    </div>
  );
}
