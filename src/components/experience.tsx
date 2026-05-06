"use client";

import { useEffect, useRef, useState } from "react";
import { getExperience, type RoleBlock } from "@/lib/projects";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

export function Experience() {
  const { lang } = useLang();
  const t = dict[lang].experience;
  const experience = getExperience(lang);
  const labelCurrent = lang === "en" ? "current" : "atual";

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1280px] px-6 pt-20 pb-24 md:px-10 md:pt-28"
    >
      <div className="mb-12">
        <h2 className="display text-[clamp(40px,6vw,76px)]">
          {t.title[0]}
          <span className="display-italic text-[var(--accent)]">{t.title[1]}</span>
          {t.title[2]}
        </h2>
      </div>

      <div className="space-y-12">
        {experience.map((e, i) => (
          <RoleBlock key={e.company} role={e} index={i} labelCurrent={labelCurrent} />
        ))}
      </div>
    </section>
  );
}

function RoleBlock({
  role,
  index,
  labelCurrent,
}: {
  role: RoleBlock;
  index: number;
  labelCurrent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${revealed ? "reveal-in" : ""} relative pl-8 md:pl-12`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-3 bottom-3 w-px"
        style={{
          background: role.current
            ? "linear-gradient(180deg, var(--accent) 0%, transparent 100%)"
            : "linear-gradient(180deg, var(--ink-mute) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-[3px] top-3 h-[7px] w-[7px] rounded-full"
        style={{
          background: role.current ? "var(--accent)" : "var(--ink-soft)",
          boxShadow: role.current ? "0 0 0 4px var(--accent-glow)" : "none",
        }}
      />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="numtag mb-2 flex items-center gap-2">
            {role.current ? (
              <>
                <span className="dot dot-prod" />
                <span className="text-[var(--accent)]">{labelCurrent}</span>
                <span className="text-[var(--ink-faint)]">·</span>
                <span>{role.period.toLowerCase()}</span>
              </>
            ) : (
              <span>{role.period.toLowerCase()}</span>
            )}
          </div>
          <h3 className="display text-[clamp(30px,4.5vw,52px)]">
            {role.company.toLowerCase()}
          </h3>
          <p className="mt-1 font-mono text-[13px] text-[var(--ink-soft)]">
            {role.role.toLowerCase()}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
        {role.summary}
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {role.pillars.map((p, i) => (
          <Pillar key={p.slug} title={p.title} body={p.body} idx={i} />
        ))}
      </div>
    </div>
  );
}

function Pillar({
  title,
  body,
  idx,
}: {
  title: string;
  body: string;
  idx: number;
}) {
  return (
    <div className="card p-5">
      <div className="numtag mb-3 flex items-center gap-2 text-[var(--accent)]">
        <span>{String(idx + 1).padStart(2, "0")}</span>
      </div>
      <h4 className="text-[16px] font-medium tracking-tight text-[var(--ink)] md:text-[17px]">
        {title}
      </h4>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)]">
        {body}
      </p>
    </div>
  );
}
