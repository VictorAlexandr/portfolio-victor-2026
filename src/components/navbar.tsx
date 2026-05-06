"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

export function Navbar() {
  const { lang, toggle, ready } = useLang();
  const items = dict[lang].nav.items;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--rule)] bg-black/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between px-6 md:px-10">
        <a
          href="#"
          aria-label="home"
          className="flex items-center gap-2 font-mono text-[12px] text-[var(--ink)]"
        >
          <span className="grid h-6 w-6 place-items-center rounded-sm border border-[var(--rule)] bg-[var(--paper-card)] text-[10px] tracking-wider text-[var(--accent)]">
            VA
          </span>
          <span className="hidden text-[var(--ink-soft)] md:inline">
            victor@portfolio
          </span>
          <span className="ml-1 hidden h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(167,139,250,0.8)] md:inline-block" />
        </a>

        <ul className="hidden items-center gap-7 font-mono text-[12px] md:flex">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggle}
          aria-label={lang === "en" ? "switch to portuguese" : "switch to english"}
          className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)] transition-colors hover:text-[var(--accent)]"
        >
          <span
            className={
              lang === "en"
                ? "text-[var(--accent)]"
                : "text-[var(--ink-mute)]"
            }
          >
            EN
          </span>
          <span className="text-[var(--ink-faint)]">/</span>
          <span
            className={
              lang === "pt"
                ? "text-[var(--accent)]"
                : "text-[var(--ink-mute)]"
            }
          >
            PT
          </span>
        </button>
      </div>
    </nav>
  );
}
