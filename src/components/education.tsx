"use client";

import { getEducation } from "@/lib/projects";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

export function Education() {
  const { lang } = useLang();
  const t = dict[lang].education;
  const education = getEducation(lang);

  return (
    <section
      id="education"
      className="mx-auto max-w-[1280px] px-6 pb-24 md:px-10"
    >
      <div className="mb-10">
        <h2 className="display text-[clamp(36px,5vw,64px)]">
          {t.title[0]}
          <span className="display-italic text-[var(--accent)]">{t.title[1]}</span>
          {t.title[2]}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e, i) => (
          <div key={e.institution} className="card p-6">
            <div className="numtag mb-3 flex items-center gap-2">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[var(--ink-faint)]">·</span>
              <span
                className={
                  e.ongoing ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"
                }
              >
                {e.period}
              </span>
            </div>
            <h3 className="text-[18px] font-medium leading-snug text-[var(--ink)]">
              {e.course}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-[var(--ink-mute)]">
              {e.institution}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--ink-soft)]">
              {e.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
