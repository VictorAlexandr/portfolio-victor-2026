import type { Lang } from "./lang-context";

type L<T> = { en: T; pt: T };

export const dict: Record<Lang, {
  nav: { items: { href: string; label: string }[] };
  hero: {
    topbar: string;
    vol: string;
    subtitle: string;
    cta: { console: string; exp: string; work: string };
    meta: {
      currently: { label: string; value: string };
      stack: { label: string; value: string };
      live: { label: string; value: string };
      studying: { label: string; value: string };
    };
  };
  experience: { title: [string, string, string] };
  console: { title: [string, string, string]; hint: string; quickHint: { tab: string; hist: string; clr: string }; chrome: string };
  work: { title: [string, string, string]; count: (n: number) => string; pause: string; bottomA: string; bottomB: string; statuses: { prod: string; internal: string; wip: string }; noUrl: string };
  education: { title: [string, string, string] };
}> = {
  en: {
    nav: {
      items: [
        { href: "#experience", label: "experience" },
        { href: "#console", label: "console" },
        { href: "#work", label: "systems" },
        { href: "#education", label: "education" },
        { href: "#contact", label: "contact" },
      ],
    },
    hero: {
      topbar: "DATA STRATEGY · AI ARCHITECTURE · BRAZIL · 2026",
      vol: "VOL. 01 / Nº 06",
      subtitle:
        "I work at the boundary between fluid rule (LLM) and hard rule (SQL, code, schema). I build dashboards, agents and pipelines that decide with little supervision and audit what they decide.",
      cta: {
        console: "open interactive console",
        exp: "view experience",
        work: "live systems",
      },
      meta: {
        currently: { label: "Currently", value: "Data Strategy & Analytics · Spark" },
        stack: { label: "Core stack", value: "Postgres · Next.js · Python · Claude" },
        live: { label: "Live", value: "9 systems running today" },
        studying: { label: "Studying", value: "Postgrad · Cloud & Edge · Anhembi" },
      },
    },
    experience: { title: ["experie", "nce", "."] },
    console: {
      title: ["interactive ", "console", "."],
      hint: "real terminal · ↑↓ history · tab autocomplete · ⌘L clear",
      quickHint: { tab: "tab", hist: "↑↓", clr: "⌘L" },
      chrome: "~/portfolio · zsh",
    },
    work: {
      title: ["what's ", "live", " today."],
      count: (n) => `${n} systems`,
      pause: "hover to pause",
      bottomA: "want technical detail? open the",
      bottomB: "and run",
      statuses: { prod: "in production", internal: "internal", wip: "in progress" },
      noUrl: "no public url",
    },
    education: { title: ["edu", "cation", "."] },
  },
  pt: {
    nav: {
      items: [
        { href: "#experience", label: "experiência" },
        { href: "#console", label: "console" },
        { href: "#work", label: "sistemas" },
        { href: "#education", label: "formação" },
        { href: "#contact", label: "contato" },
      ],
    },
    hero: {
      topbar: "DATA STRATEGY · ARQUITETURA DE IA · BRASIL · 2026",
      vol: "VOL. 01 / Nº 06",
      subtitle:
        "Trabalho na fronteira entre regra fluida (LLM) e regra dura (SQL, código, schema). Construo dashboards, agentes e pipelines que decidem com pouca supervisão e auditam o que decidem.",
      cta: {
        console: "abrir console interativo",
        exp: "ver atuação",
        work: "sistemas em produção",
      },
      meta: {
        currently: { label: "Atualmente", value: "Data Strategy & Analytics · Spark" },
        stack: { label: "Stack core", value: "Postgres · Next.js · Python · Claude" },
        live: { label: "Em produção", value: "9 sistemas vivos hoje" },
        studying: { label: "Estudando", value: "Pós em Cloud & Edge · Anhembi" },
      },
    },
    experience: { title: ["experi", "ência", "."] },
    console: {
      title: ["console ", "interativo", "."],
      hint: "terminal real · ↑↓ histórico · tab autocomplete · ⌘L limpa",
      quickHint: { tab: "tab", hist: "↑↓", clr: "⌘L" },
      chrome: "~/portfolio · zsh",
    },
    work: {
      title: ["o que está ", "vivo", " hoje."],
      count: (n) => `${n} sistemas`,
      pause: "passe o mouse pra pausar",
      bottomA: "quer detalhe técnico? abre o",
      bottomB: "e digite",
      statuses: { prod: "em produção", internal: "interno", wip: "em construção" },
      noUrl: "sem url pública",
    },
    education: { title: ["forma", "ção", "."] },
  },
};
