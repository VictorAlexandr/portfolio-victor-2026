import { getProjects, getExperience, getEducation } from "./projects";
import type { Lang } from "./lang-context";

type Line = { kind: "out" | "in" | "err" | "raw"; text: string };

export const COMMAND_LIST = [
  "help",
  "whoami",
  "ls",
  "cat",
  "stack",
  "now",
  "experience",
  "education",
  "principles",
  "contact",
  "open",
  "clear",
];

const HELP = {
  en: `commands:
  whoami            who's the guy
  ls                list projects
  cat <project>     details (e.g. cat dashboard-oficial)
  open <project>    opens the link in a new tab
  stack             real stack
  now               what i'm doing right now
  experience        current and previous
  education         studies
  principles        how i decide tradeoffs
  contact           channels
  clear             clears the console
  help              this`,
  pt: `comandos:
  whoami            quem é o cara
  ls                lista projetos
  cat <projeto>     detalhes (ex: cat dashboard-oficial)
  open <projeto>    abre o link em nova aba
  stack             stack real
  now               o que estou fazendo agora
  experience        atuação atual e anterior
  education         formação
  principles        como decido tradeoffs
  contact           canais
  clear             limpa o console
  help              isso aqui`,
};

const WHOAMI = {
  en: `victor alexandre fernandes
data strategy & analytics · ai architect · brazil

i like systems that decide with little supervision and audit
what they decide. i move manual flows onto a versioned stack
with ai in the loop.`,
  pt: `victor alexandre fernandes
data strategy & analytics · arquiteto de ia · brasil

gosto de sistemas que decidem com pouca supervisão e auditam
o que decidem. levo fluxos manuais pra um stack versionado,
com ia no loop.`,
};

const STACK_TXT = {
  en: `engineering    typescript · python · sql · postgres · supabase · fastapi
ai             claude (api, sdk, agent sdk, code) · voyage · bedrock · dify · mcp
data           dbt · duckdb · polars · pgvector · arrow
automation     n8n · evolution api · event-driven webhooks
ui & infra     next.js 16 · tailwind v4 · vercel · cloudflare · docker`,
  pt: `engineering    typescript · python · sql · postgres · supabase · fastapi
ai             claude (api, sdk, agent sdk, code) · voyage · bedrock · dify · mcp
data           dbt · duckdb · polars · pgvector · arrow
automation     n8n · evolution api · webhooks event-driven
ui & infra     next.js 16 · tailwind v4 · vercel · cloudflare · docker`,
};

const NOW_TXT = {
  en: `2026-05-06 — wednesday

· polishing the official dashboard (media, projection, closings tabs)
· building ai-hub — rag memory layer exposed via mcp
· first model in spark-ml landing in ci (lead scoring)
· studying spark-topologies — hand-tracking + voyage embeddings
· taking the postgrad in cloud & edge computing at anhembi`,
  pt: `2026-05-06 — quarta-feira

· polindo o dashboard oficial (tabs midia, projeção, fechamentos)
· construindo ai-hub — camada de memória rag exposta via mcp
· primeiro modelo do spark-ml entrando em ci (lead scoring)
· estudando spark-topologies — hand-tracking + voyage embeddings
· cursando pós em cloud & edge computing na anhembi`,
};

const PRINCIPLES_TXT = {
  en: `01  determinism > intuition
    llm where the rule is fluid; code where it exists.
    never the other way.

02  bi as code
    a dashboard with no code review is hidden tech debt.
    versioned, auditable, tied to the release cycle.

03  independent auditor
    no agent touches a crm without a gate from another model.
    trust is built, not default.

04  density > volume
    one real number beats ten adjectives.`,
  pt: `01  determinismo > intuição
    llm onde a regra é fluida; código onde ela existe.
    nunca o contrário.

02  bi as code
    dashboard sem code review é dívida disfarçada.
    versionado, auditável, acoplado ao release.

03  auditor independente
    nenhum agente toca crm sem gate de outro modelo.
    confiança é build, não default.

04  densidade > volume
    1 número real vale mais que 10 adjetivos.`,
};

const CONTACT_TXT = {
  en: `linkedin     <a href="https://www.linkedin.com/in/victor-alexandre-fernandes" target="_blank" rel="noopener">linkedin.com/in/victor-alexandre-fernandes</a>
github       <a href="https://github.com/VictorAlexandr" target="_blank" rel="noopener">github.com/VictorAlexandr</a>
email        <em>victor.fernandes@spark.com.br</em>`,
  pt: `linkedin     <a href="https://www.linkedin.com/in/victor-alexandre-fernandes" target="_blank" rel="noopener">linkedin.com/in/victor-alexandre-fernandes</a>
github       <a href="https://github.com/VictorAlexandr" target="_blank" rel="noopener">github.com/VictorAlexandr</a>
email        <em>victor.fernandes@spark.com.br</em>`,
};

function formatExperience(lang: Lang) {
  const exp = getExperience(lang);
  return exp
    .map((e) => {
      const tag =
        lang === "en"
          ? e.current
            ? "current"
            : "previous"
          : e.current
            ? "atual"
            : "antes";
      const head = `[${tag}]   ${e.period}    <strong>${e.company}</strong>
        ${e.role}
        ${e.summary}`;
      const pillars = e.pillars
        .map((p) => `          · ${p.title}\n            ${p.body}`)
        .join("\n");
      return `${head}\n${pillars}`;
    })
    .join("\n\n");
}

function formatEducation(lang: Lang) {
  const edu = getEducation(lang);
  return edu
    .map(
      (e) =>
        `[${e.period.padEnd(10)}]  <strong>${e.course}</strong>\n              ${e.institution}\n              ${e.note}`,
    )
    .join("\n\n");
}

function ls(lang: Lang): string {
  const projects = getProjects(lang);
  const tail =
    lang === "en"
      ? `${projects.length} projects · use 'cat <project>' for details`
      : `${projects.length} projetos · use 'cat <projeto>' pra detalhes`;
  const rows = projects
    .map((p) => {
      const status =
        p.status === "prod"
          ? "[ prod ]"
          : p.status === "internal"
            ? "[intern]"
            : "[ wip  ]";
      return `  ${status}  ${p.name.padEnd(20)}  ${p.role}`;
    })
    .join("\n");
  return `${rows}\n\n${tail}`;
}

function cat(slug: string, lang: Lang): string {
  const projects = getProjects(lang);
  const p = projects.find((x) => x.name === slug || x.slug === slug);
  if (!p) {
    return lang === "en"
      ? `cat: ${slug}: project not found. try 'ls' for the list.`
      : `cat: ${slug}: projeto não encontrado. tenta 'ls' pra ver a lista.`;
  }
  const url = p.url
    ? `\n<a href="${p.url}" target="_blank" rel="noopener">${p.url}</a>`
    : "";
  const labelStatus = lang === "en" ? "status" : "status";
  const labelStack = lang === "en" ? "stack " : "stack ";
  return `${p.name}  <strong>${p.role}</strong>
${labelStatus}   ${p.status}
${labelStack}   ${p.stack.join(" · ")}

${p.blurb}

<em>${p.metric}</em>${url}`;
}

function open(slug: string, lang: Lang): { redirect?: string; text: string } {
  const projects = getProjects(lang);
  const p = projects.find((x) => x.name === slug || x.slug === slug);
  if (!p)
    return { text: lang === "en" ? `open: ${slug}: not found` : `open: ${slug}: não encontrado` };
  const matchUrl =
    p.url || p.metric.match(/\b([a-z0-9-]+\.[a-z0-9.-]+\.[a-z]{2,})/i)?.[1];
  if (!matchUrl)
    return {
      text:
        lang === "en"
          ? `open: ${slug}: no public url (likely internal)`
          : `open: ${slug}: sem url pública (provavelmente interno)`,
    };
  const full = matchUrl.startsWith("http") ? matchUrl : `https://${matchUrl}`;
  return {
    redirect: full,
    text: lang === "en" ? `opening ${full} ...` : `abrindo ${full} ...`,
  };
}

export function runCommand(
  raw: string,
  lang: Lang,
): {
  lines: Line[];
  redirect?: string;
  clear?: boolean;
} {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };
  const [cmd, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ").trim();

  switch (cmd) {
    case "help":
      return { lines: [{ kind: "out", text: HELP[lang] }] };
    case "whoami":
      return { lines: [{ kind: "out", text: WHOAMI[lang] }] };
    case "ls":
      return { lines: [{ kind: "out", text: ls(lang) }] };
    case "cat":
      if (!arg)
        return {
          lines: [
            {
              kind: "err",
              text:
                lang === "en"
                  ? "cat: missing argument. e.g. cat dashboard-oficial"
                  : "cat: faltando argumento. ex: cat dashboard-oficial",
            },
          ],
        };
      return { lines: [{ kind: "out", text: cat(arg, lang) }] };
    case "stack":
      return { lines: [{ kind: "out", text: STACK_TXT[lang] }] };
    case "now":
      return { lines: [{ kind: "out", text: NOW_TXT[lang] }] };
    case "experience":
    case "exp":
      return { lines: [{ kind: "out", text: formatExperience(lang) }] };
    case "education":
    case "edu":
      return { lines: [{ kind: "out", text: formatEducation(lang) }] };
    case "principles":
      return { lines: [{ kind: "out", text: PRINCIPLES_TXT[lang] }] };
    case "contact":
      return { lines: [{ kind: "out", text: CONTACT_TXT[lang] }] };
    case "open":
      if (!arg)
        return {
          lines: [
            {
              kind: "err",
              text: lang === "en" ? "open: missing argument" : "open: faltando argumento",
            },
          ],
        };
      const r = open(arg, lang);
      return { lines: [{ kind: "out", text: r.text }], redirect: r.redirect };
    case "clear":
      return { lines: [], clear: true };
    case "sudo":
      return {
        lines: [
          {
            kind: "err",
            text:
              lang === "en"
                ? "sudo: you already have full permission. relax."
                : "sudo: já está com permissão total. relaxa.",
          },
        ],
      };
    case "rm":
      return {
        lines: [
          {
            kind: "err",
            text: lang === "en" ? "rm: nothing here is disposable." : "rm: nada aqui é descartável.",
          },
        ],
      };
    default:
      return {
        lines: [
          {
            kind: "err",
            text:
              lang === "en"
                ? `${cmd}: unknown command. try 'help'.`
                : `${cmd}: comando desconhecido. tenta 'help'.`,
          },
        ],
      };
  }
}

export const QUICK_COMMANDS = [
  "whoami",
  "ls",
  "cat dashboard-oficial",
  "now",
  "experience",
  "education",
  "principles",
];

export const BOOT_TEXT = {
  en: `\nwelcome. this is a real console.\ntype '<strong>help</strong>' to see the commands.\n`,
  pt: `\nbem-vindo. isto é um console de verdade.\ndigite '<strong>help</strong>' pra ver os comandos.\n`,
};
