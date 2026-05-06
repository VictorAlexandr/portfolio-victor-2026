"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BOOT_TEXT,
  COMMAND_LIST,
  QUICK_COMMANDS,
  runCommand,
} from "@/lib/commands";
import { useLang } from "@/lib/lang-context";
import { dict } from "@/lib/dict";

type Entry =
  | { kind: "in"; text: string }
  | { kind: "out" | "err" | "raw"; text: string };

export function Console() {
  const { lang } = useLang();
  const t = dict[lang].console;

  const initial: Entry[] = useMemo(
    () => [
      { kind: "raw", text: "victor@portfolio:~$ boot --silent" },
      { kind: "out", text: BOOT_TEXT[lang] },
    ],
    [lang],
  );

  const [entries, setEntries] = useState<Entry[]>(initial);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset boot when language changes
  useEffect(() => {
    setEntries(initial);
  }, [initial]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function execute(raw: string) {
    const next: Entry[] = [...entries, { kind: "in", text: raw }];
    const result = runCommand(raw, lang);
    if (result.clear) {
      setEntries([]);
      setHistory((h) => [...h, raw]);
      return;
    }
    for (const l of result.lines) next.push(l);
    setEntries(next);
    setHistory((h) => [...h, raw]);
    setHIdx(null);
    if (result.redirect) {
      setTimeout(() => window.open(result.redirect!, "_blank"), 240);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = hIdx == null ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx == null) return;
      const idx = hIdx + 1;
      if (idx >= history.length) {
        setHIdx(null);
        setInput("");
      } else {
        setHIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1] ?? "";
      const candidates = COMMAND_LIST.filter((c) => c.startsWith(last));
      if (candidates.length === 1) {
        parts[parts.length - 1] = candidates[0];
        setInput(parts.join(" "));
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setEntries([]);
    }
  }

  return (
    <section
      id="console"
      className="mx-auto max-w-[1280px] px-6 pb-20 md:px-10"
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="display text-[clamp(36px,5.5vw,68px)]">
            {t.title[0]}
            <span className="display-italic text-[var(--accent)]">{t.title[1]}</span>
            {t.title[2]}
          </h2>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[11px] text-[var(--ink-mute)] md:flex">
          <span className="kbd">{t.quickHint.tab}</span>
          <span className="text-[var(--ink-faint)]">·</span>
          <span className="kbd">{t.quickHint.hist}</span>
          <span className="text-[var(--ink-faint)]">·</span>
          <span className="kbd">{t.quickHint.clr}</span>
        </div>
      </div>

      <div className="console-frame relative overflow-hidden shadow-[0_24px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 border-b border-[var(--rule)] bg-[var(--paper-deep)] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] text-[var(--ink-mute)]">{t.chrome}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--rule)] px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            live
          </span>
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-[340px] overflow-y-auto px-5 py-4 text-[13px] leading-[1.55]"
        >
          <div className="console-output space-y-1.5">
            {entries.map((e, i) =>
              e.kind === "in" ? (
                <div key={i} className="flex gap-2">
                  <span className="text-[var(--accent)]">❯</span>
                  <span className="whitespace-pre-wrap text-[var(--ink)]">
                    {e.text}
                  </span>
                </div>
              ) : e.kind === "err" ? (
                <pre
                  key={i}
                  className="whitespace-pre-wrap text-[#f87171]"
                  dangerouslySetInnerHTML={{ __html: e.text }}
                />
              ) : (
                <pre
                  key={i}
                  className="whitespace-pre-wrap text-[var(--ink-soft)]"
                  dangerouslySetInnerHTML={{ __html: e.text }}
                />
              ),
            )}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[var(--accent)]">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                spellCheck={false}
                autoComplete="off"
                className="console-input"
                aria-label="Console input"
              />
              <span
                className="cursor-ink"
                style={{
                  width: "0.6em",
                  background: "var(--accent)",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-[var(--rule)] bg-[var(--paper-deep)] px-3 py-2">
          {QUICK_COMMANDS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                inputRef.current?.focus();
                execute(q);
              }}
              className="rounded-md border border-[var(--rule)] px-2 py-1 font-mono text-[11px] text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
