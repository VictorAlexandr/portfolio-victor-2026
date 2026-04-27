export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 w-full overflow-x-hidden">
      {/* Aurora ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
        <div className="aurora-blob aurora-4" />
        <div className="aurora-blob aurora-5" />
        {/* Subtle vignette to anchor content */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(7, 6, 14, 0.4) 20%, rgba(7, 6, 14, 0.85) 100%)",
          }}
        />
      </div>

      <Nav />

      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Experience />
        <ResearchLab />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ───────────────────────────── NAV ───────────────────────────── */

function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#research", label: "Research" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-[11px] font-semibold">
            VA
          </span>
          <span className="text-white/70">victor@systems</span>
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </a>

        <ul className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="transition-colors hover:text-white">
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10 md:inline-block"
        >
          Let&apos;s talk →
        </a>
      </nav>
    </header>
  );
}

/* ───────────────────────────── HERO ───────────────────────────── */

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24 md:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left: copy */}
        <div className="text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/60 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            BI & Data Strategy Coordinator · AI Solutions
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient">Victor</span>
            <br />
            <span className="text-gradient">Alexandre</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl text-white/65 md:text-2xl">
            Arquiteto de IA & Engenheiro de Dados
          </p>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Transformo regras de negócio em pipelines determinísticos. Da query
            SQL ao agente LLM em produção — entrego{" "}
            <span className="text-white">BI as Code</span>: dashboards
            versionados, auditáveis e acoplados à operação.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-white/90 hover:shadow-emerald-500/30"
            >
              Iniciar projeto
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#research"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-emerald-300/30 hover:bg-white/[0.06]"
            >
              Ver research lab
            </a>
          </div>
        </div>

        {/* Right: code window */}
        <div className="relative">
          <CodeWindow />
        </div>
      </div>

    </section>
  );
}

function CodeWindow() {
  // Each line gets a stagger delay (ms) for the type-in effect
  const L = (children: React.ReactNode, delay: number, indent = 0) => (
    <div
      className="animate-fade-in-up"
      style={{
        paddingLeft: `${indent * 16}px`,
        animationDelay: `${delay}ms`,
        animationDuration: "0.5s",
      }}
    >
      {children}
    </div>
  );

  const k = "text-sky-300";
  const s = "text-emerald-300";
  const p = "text-white/40";
  const c = "text-white/35";

  return (
    <div className="code-window-glow relative rounded-2xl">
      <div className="code-window relative overflow-hidden rounded-2xl border border-white/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[11px] text-white/40">
            ~/capabilities.json
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            live
          </span>
        </div>

        {/* Code */}
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7">
          {L(<span className={p}>{"{"}</span>, 0, 0)}

          {L(
            <>
              <span className={k}>&quot;architect&quot;</span>
              <span className={p}>: </span>
              <span className={s}>&quot;Victor Alexandre&quot;</span>
              <span className={p}>,</span>
            </>,
            120,
            1,
          )}
          {L(
            <>
              <span className={k}>&quot;role&quot;</span>
              <span className={p}>: </span>
              <span className={s}>
                &quot;BI &amp; Data Strategy · AI Solutions&quot;
              </span>
              <span className={p}>,</span>
            </>,
            220,
            1,
          )}
          {L(
            <>
              <span className={k}>&quot;education&quot;</span>
              <span className={p}>: </span>
              <span className={s}>&quot;Post-Grad: Cloud &amp; Edge&quot;</span>
              <span className={p}>,</span>
            </>,
            320,
            1,
          )}

          {L(
            <>
              <span className={k}>&quot;stack&quot;</span>
              <span className={p}>: [</span>
            </>,
            420,
            1,
          )}
          {L(
            <>
              <span className={s}>&quot;n8n&quot;</span>
              <span className={p}>, </span>
              <span className={s}>&quot;Supabase&quot;</span>
              <span className={p}>, </span>
              <span className={s}>&quot;DuckDB&quot;</span>
              <span className={p}>,</span>
            </>,
            500,
            2,
          )}
          {L(
            <>
              <span className={s}>&quot;dbt&quot;</span>
              <span className={p}>, </span>
              <span className={s}>&quot;Claude&quot;</span>
              <span className={p}>, </span>
              <span className={s}>&quot;Voyage&quot;</span>
              <span className={p}>, </span>
              <span className={s}>&quot;Next.js&quot;</span>
            </>,
            580,
            2,
          )}
          {L(
            <>
              <span className={p}>],</span>
            </>,
            660,
            1,
          )}

          {L(
            <>
              <span className={k}>&quot;focus&quot;</span>
              <span className={p}>: [</span>
            </>,
            760,
            1,
          )}
          {L(
            <>
              <span className={s}>&quot;AI Agent Orchestration&quot;</span>
              <span className={p}>,</span>
            </>,
            840,
            2,
          )}
          {L(
            <>
              <span className={s}>&quot;LLM Engineering &amp; RAG&quot;</span>
              <span className={p}>,</span>
            </>,
            900,
            2,
          )}
          {L(
            <>
              <span className={s}>&quot;Data Engineering&quot;</span>
              <span className={p}>,</span>
            </>,
            960,
            2,
          )}
          {L(
            <>
              <span className={s}>&quot;BI as Code&quot;</span>
            </>,
            1020,
            2,
          )}
          {L(
            <>
              <span className={p}>],</span>
            </>,
            1080,
            1,
          )}

          {L(
            <>
              <span className={k}>&quot;experience_years&quot;</span>
              <span className={p}>: </span>
              <span className="text-amber-300">5</span>
            </>,
            1180,
            1,
          )}

          {L(
            <span className={p}>
              {"}"}
              <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-emerald-300 cursor-blink" />
            </span>,
            1280,
            0,
          )}

          {/* Bottom comment */}
          {L(
            <span className={c}>
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              // currently shipping in prod
            </span>,
            1400,
            0,
          )}
        </pre>
      </div>
    </div>
  );
}

/* ───────────────────────────── ABOUT ───────────────────────────── */

function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <SectionHeading eyebrow="// 01 · profile" title="Obsessed with Efficiency." />

      <div className="mt-10 max-w-3xl">
        <p className="text-lg leading-relaxed text-white/75 md:text-xl">
          Não escrevo apenas código — construo sistemas que sobrevivem ao
          tempo. Uno a precisão matemática da Ciência de Dados com a robustez
          da Engenharia de Software para entregar infraestrutura que o C-Level
          pode confiar.
        </p>
        <p className="mt-5 text-base leading-relaxed text-white/55">
          Acredito que a IA não veio para substituir engenheiros — veio para
          elevar o nível dos problemas que podemos resolver. Minha prática
          cruza orquestração de agentes LLM, engenharia de dados relacional e
          hardening de segurança em pipelines de produção.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Principle
          accent="amber"
          title="Determinismo > intuição"
          body="LLM onde a regra é fluida. Código onde ela existe. Determinismo importa mais do que inteligência aparente."
        />
        <Principle
          accent="cyan"
          title="BI as Code"
          body="Dashboard que não passa por code review é dívida técnica disfarçada. Versionado, auditável, acoplado ao release."
        />
        <Principle
          accent="emerald"
          title="Auditoria por padrão"
          body="Nenhum agente toca CRM ou pipeline crítico sem gate explícito. Confiança é build — não default."
        />
      </div>
    </section>
  );
}

function Principle({
  accent,
  title,
  body,
}: {
  accent: "amber" | "cyan" | "emerald";
  title: string;
  body: string;
}) {
  const t = {
    amber: {
      dot: "bg-amber-300",
      border: "hover:border-amber-300/30",
      glow: "from-amber-400/10",
    },
    cyan: {
      dot: "bg-cyan-300",
      border: "hover:border-cyan-300/30",
      glow: "from-cyan-400/10",
    },
    emerald: {
      dot: "bg-emerald-300",
      border: "hover:border-emerald-300/30",
      glow: "from-emerald-400/10",
    },
  }[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-0.5 ${t.border}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${t.glow} to-transparent blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-90`}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${t.dot} shadow-[0_0_8px_currentColor]`}
          />
          <h4 className="text-base font-semibold tracking-tight text-white">
            {title}
          </h4>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/55">{body}</p>
      </div>
    </div>
  );
}

/* ───────────────────────────── EXPERIENCE ───────────────────────────── */

function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <SectionHeading
        eyebrow="// 02 · engineering"
        title="Engineering em produção."
      />

      {/* Featured: Spark MAXX */}
      <div className="relative mt-12 pl-8 md:pl-12">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-3 bottom-0 w-px bg-gradient-to-b from-emerald-400/80 via-emerald-400/25 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[3px] top-3 h-[7px] w-[7px] rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]"
        />
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 left-1/3 h-44 w-2/3 -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Current · March 2026 — now
            </div>
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Spark MAXX
            </h3>
            <p className="mt-1 text-sm text-white/50">
              BI & Data Strategy Coordinator · AI Solutions
            </p>
          </div>
        </div>

        <p className="relative mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
          Lidero a área de{" "}
          <span className="text-white">
            orquestração de dados e infraestrutura de automação
          </span>
          . Traduzo regras de negócio complexas em pipelines determinísticos,
          conectando bancos relacionais a modelos de IA para otimizar operação
          de SDRs e sustentar decisões de C-Level em tempo real.
        </p>

        <div className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Capability
            index="01"
            icon={<IconAgents />}
            title="Agentes LLM em produção"
            body="Orquestração de agentes com governança estrita — otimização de tokens, guardrails e auditoria anti-alucinação."
            stack={["Claude", "Dify", "Bedrock"]}
          />
          <Capability
            index="02"
            icon={<IconData />}
            title="Data Engineering"
            body="Modelagem relacional em Supabase, DuckDB para analytics local-first e dbt como camada de transformação versionada."
            stack={["Supabase", "DuckDB", "dbt", "PostgreSQL"]}
          />
          <Capability
            index="03"
            icon={<IconAutomation />}
            title="Automação iPaaS"
            body="Pipelines críticos em n8n conectando CRMs, canais e webhooks com retry, dead-letter e observabilidade."
            stack={["n8n", "RD Station", "Pipedrive"]}
          />
          <Capability
            index="04"
            icon={<IconBiCode />}
            title="BI as Code"
            body="Dashboards executivos migrados para Next.js — versionados, auditáveis, acoplados ao ciclo de release."
            stack={["Next.js", "TypeScript", "Vercel"]}
          />
        </div>
      </div>

      {/* Previous role: GLA */}
      <div className="relative mt-20 pl-8 md:pl-12">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-3 bottom-0 w-px bg-gradient-to-b from-cyan-400/65 via-cyan-400/20 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[3px] top-3 h-[7px] w-[7px] rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.75)]"
        />
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 left-1/3 h-40 w-2/3 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/50">
              Jun 2025 — Oct 2025
            </div>
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              GLA
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Full-Stack Automation Developer · Growth Leaders Academy
            </p>
          </div>
        </div>

        <p className="relative mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
          Desenvolvimento de ecossistemas de automação para{" "}
          <span className="text-white">Growth Ops</span>: integração de APIs,
          ETL, análise de dados e otimização de conversão em escala. Fluxos
          event-driven com recuperação de receita em tempo real.
        </p>

        {/* Stack groups */}
        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          <StackGroup
            label="Engineering & Backend"
            items={["Python", "Java", "Postman", "Supabase", "SQL"]}
          />
          <StackGroup
            label="Automation & Intelligence"
            items={["n8n", "Merlin", "Lovable", "AI Agents"]}
          />
          <StackGroup
            label="Web, BI & Infra"
            items={[
              "Metabase",
              "Avalon",
              "HubSpot",
              "WordPress",
              "Cloudflare",
            ]}
          />
        </div>

        {/* Featured architectures */}
        <div className="relative mt-12">
          <div className="mb-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
            Featured architectures
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ArchCard
              index="01"
              title="Event Registration Orchestrator"
              context="Community Ops"
              challenge="Gerenciar alto volume de inscrições com confirmação imediata."
              solution="Fluxo n8n com Webhook Listener + Validação de Base + Feedback Loop síncrono."
            />
            <ArchCard
              index="02"
              title="Real-Time Revenue Recovery"
              context="Growth Ops"
              challenge="Alta taxa de abandono de checkout."
              solution="Arquitetura Event-Driven. Monitoramento de Gateway → Lógica de Wait Inteligente → Disparo de WhatsApp personalizado."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StackGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md p-5 transition-all duration-300 hover:border-cyan-300/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/10 to-transparent blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_currentColor]" />
          <span className="text-cyan-200/85">{label}</span>
        </span>
        <span className="font-mono text-[10px] text-white/25">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <div className="relative flex flex-wrap gap-1.5">
        {items.map((i) => (
          <span
            key={i}
            className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-white/75 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-100"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchCard({
  index,
  title,
  context,
  challenge,
  solution,
}: {
  index: string;
  title: string;
  context: string;
  challenge: string;
  solution: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/35">
          {index}
        </span>
        <span className="rounded-full border border-cyan-400/25 bg-cyan-400/5 px-2.5 py-0.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-cyan-200/85">
          {context}
        </span>
      </div>
      <h4 className="relative mt-4 text-lg font-semibold tracking-tight text-white">
        {title}
      </h4>
      <div className="relative mt-5 space-y-4">
        <ArchRow label="Challenge" body={challenge} />
        <div className="h-px bg-white/5" />
        <ArchRow label="Solution" body={solution} />
      </div>
    </div>
  );
}

function ArchRow({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/40">
        {label}
      </div>
      <p className="text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  );
}

function Capability({
  index,
  icon,
  title,
  body,
  stack,
}: {
  index: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  stack: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-90"
      />
      <div className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/15 to-cyan-500/5 text-emerald-200 transition-colors duration-300 group-hover:border-emerald-300/40 group-hover:text-emerald-100">
          {icon}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
          {index}
        </span>
      </div>
      <h4 className="relative mt-6 text-base font-semibold text-white">
        {title}
      </h4>
      <p className="relative mt-2 text-sm leading-relaxed text-white/55">
        {body}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/65"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Capability icons (lucide-style monoline) ── */

function IconAgents() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="6" cy="6" r="1.6" />
      <circle cx="18" cy="6" r="1.6" />
      <circle cx="6" cy="18" r="1.6" />
      <circle cx="18" cy="18" r="1.6" />
      <path d="M9.5 9.5 7.2 7.2M14.5 9.5l2.3-2.3M9.5 14.5l-2.3 2.3M14.5 14.5l2.3 2.3" />
    </svg>
  );
}

function IconData() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v14c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
    </svg>
  );
}

function IconAutomation() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function IconBiCode() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21V13M9 21V8M15 21V11M21 21V5" />
      <path d="M5 5l-2 2 2 2M19 5l2 2-2 2" strokeOpacity="0.6" />
    </svg>
  );
}


/* ───────────────────────────── RESEARCH LAB ───────────────────────────── */

type Status = "live" | "in-dev" | "concept" | "roadmap";
type Variant =
  | "bridge"
  | "silk"
  | "tendril"
  | "fingertip"
  | "glyph"
  | "voice"
  | "palace"
  | "dna";

type Experiment = {
  slug: string;
  variant: Variant;
  status: Status;
  family: string;
  title: string;
  pitch: string;
  stack: string[];
  videoSrc?: string;
  imageSrc?: string;
};

const experiments: Experiment[] = [
  {
    slug: "bridge-building",
    variant: "bridge",
    status: "in-dev",
    family: "Linhas dos dedos",
    title: "Bridge Building com IA",
    pitch:
      "Mão esquerda aponta para um nó · mão direita para outro · linha de luz estica entre eles. Após 1.5s, Claude gera a nota intermediária explicando a conexão semântica e ela vira nó novo no vault.",
    stack: ["MediaPipe", "R3F", "Voyage", "Claude API"],
  },
  {
    slug: "silk-trail",
    variant: "silk",
    status: "roadmap",
    family: "Linhas dos dedos",
    title: "Silk Trail Memory",
    pitch:
      "Linhas etéreas saem dos dedos e persistem 3-5s desvanecendo. Coreografias no espaço — ao envolver dois nós com a mesma trilha, cria conexão visualizada com partícula correndo entre eles.",
    stack: ["MediaPipe", "R3F", "GPU Trails"],
  },
  {
    slug: "tendril",
    variant: "tendril",
    status: "concept",
    family: "Linhas dos dedos",
    title: "Tendril Sculpture",
    pitch:
      "Cada dedo lança um tentáculo de luz no espaço 3D. Comprimento responde à abertura entre dedos. Cada tendril detecta o nó mais próximo e cria conexão temporária.",
    stack: ["MediaPipe", "R3F", "Catenária"],
  },
  {
    slug: "fingertip-rag",
    variant: "fingertip",
    status: "concept",
    family: "IA aplicada à mão",
    title: "Fingertip RAG",
    pitch:
      "Cada um dos 5 dedos é um slot de contexto. Aponta para nós para colá-los nas pontas. Junta os dedos no centro = Claude sintetiza insight novo combinando os 5 contextos como hologram.",
    stack: ["Voyage", "Claude Streaming", "MediaPipe"],
  },
  {
    slug: "glyph-casting",
    variant: "glyph",
    status: "concept",
    family: "IA aplicada à mão",
    title: "Glyph Casting",
    pitch:
      "Desenha símbolos no ar (○ ⚡ ∞). $1-unistroke reconhece e cada glyph dispara uma query semântica diferente sobre o vault — vibe Harry Potter pra pensamento.",
    stack: ["$1-unistroke", "MediaPipe", "Claude"],
  },
  {
    slug: "voice-conjuring",
    variant: "voice",
    status: "concept",
    family: "Performance multi-modal",
    title: "Voice + Hand Conjuring",
    pitch:
      "Web Speech ouve e palavras-chave viram partículas saindo da boca em direção à mão. Mão captura → embedding → busca → 3-5 nós relevantes voam até a palma.",
    stack: ["Web Speech", "Voyage", "R3F"],
  },
  {
    slug: "mind-palace",
    variant: "palace",
    status: "concept",
    family: "Performance multi-modal",
    title: "Mind Palace Walking",
    pitch:
      "Modo VR-like sem VR. Mão controla direção e velocidade pelo espaço 3D. Nós são salas. Ambient binaural muda por cluster — entrar em ds/causal soa frio, projeto/hermes soa quente.",
    stack: ["R3F", "Web Audio", "MediaPipe"],
  },
  {
    slug: "gesture-dna",
    variant: "dna",
    status: "concept",
    family: "Generativo",
    title: "Gesture DNA",
    pitch:
      "Pose da mão (21 landmarks) vira vetor seed que alimenta shader procedural. Bonus: passa o vetor pelo Voyage como embedding sintético — sua mão descobre afinidades semânticas no vault.",
    stack: ["GLSL", "Voyage", "MediaPipe"],
  },
];

function ResearchLab() {
  const featured = experiments.slice(0, 2);
  const gallery = experiments.slice(2);

  return (
    <section
      id="research"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <SectionHeading
        eyebrow="// 03 · research lab"
        title="Hand-Tracking + IA. Linhas que saem dos dedos."
      />

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
        Backbone:{" "}
        <span className="text-white/80">MediaPipe Tasks Vision</span> ·{" "}
        <span className="text-white/80">R3F</span> ·{" "}
        <span className="text-white/80">Voyage embeddings</span> ·{" "}
        <span className="text-white/80">Claude API</span>. Oito experimentos em
        pipeline, construídos sobre{" "}
        <a
          href="https://spark-topologies.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline-offset-4 hover:underline"
        >
          spark-topologies.vercel.app
        </a>{" "}
        — meu mapa 3D do segundo cérebro{" "}
        <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          live in prod
        </span>
        .
      </p>

      {/* Featured pair (Bridge Building + Silk Trail) */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {featured.map((e) => (
          <ExperimentCard key={e.slug} experiment={e} featured />
        ))}
      </div>

      {/* Gallery */}
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {gallery.map((e) => (
          <ExperimentCard key={e.slug} experiment={e} />
        ))}
      </div>
    </section>
  );
}

function ExperimentCard({
  experiment: e,
  featured,
}: {
  experiment: Experiment;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 ${
        featured ? "lg:rounded-3xl" : ""
      }`}
    >
      {/* Media */}
      <div
        className={`relative aspect-video overflow-hidden border-b border-white/10 exp-card-bg-${e.variant}`}
      >
        {/* Status + family chips */}
        <div className="absolute left-3 top-3 z-20">
          <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
            {e.family}
          </span>
        </div>
        <div className="absolute right-3 top-3 z-20">
          <StatusBadge status={e.status} />
        </div>

        {/* Animated CSS/SVG preview (always shown) */}
        <ExperimentVisual variant={e.variant} />

        {/* Optional video overlay — drop /public/videos/<slug>.webm and add videoSrc */}
        {e.videoSrc && (
          <video
            className="absolute inset-0 z-10 h-full w-full object-cover"
            src={e.videoSrc}
            poster={e.imageSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {!e.videoSrc && e.imageSrc && (
          <img
            src={e.imageSrc}
            alt={e.title}
            className="absolute inset-0 z-10 h-full w-full object-cover"
          />
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <h3
          className={`font-semibold tracking-tight text-white ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {e.title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-white/60 ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {e.pitch}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {e.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string; dot: string }> = {
    live: {
      label: "live",
      cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    },
    "in-dev": {
      label: "in dev",
      cls: "border-sky-400/30 bg-sky-400/10 text-sky-200",
      dot: "bg-sky-300 animate-pulse",
    },
    concept: {
      label: "r&d",
      cls: "border-white/15 bg-white/5 text-white/70",
      dot: "bg-white/40",
    },
    roadmap: {
      label: "roadmap",
      cls: "border-amber-400/25 bg-amber-400/5 text-amber-200",
      dot: "bg-amber-300/80",
    },
  };
  const m = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm ${m.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function ExperimentVisual({ variant }: { variant: Variant }) {
  switch (variant) {
    case "bridge":
      return (
        <svg
          viewBox="0 0 320 180"
          className="exp-svg absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="brNode" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="brLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#c4b5fd" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Two nodes */}
          <circle cx="80" cy="90" r="28" fill="url(#brNode)" />
          <circle cx="240" cy="90" r="28" fill="url(#brNode)" />
          <circle cx="80" cy="90" r="5" fill="#fff" style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }} />
          <circle cx="240" cy="90" r="5" fill="#fff" style={{ animation: "pulse-soft 2.4s ease-in-out infinite", animationDelay: "0.4s" }} />
          {/* Bridge line */}
          <path
            d="M 80 90 Q 160 60 240 90"
            stroke="url(#brLine)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.9"
          />
          {/* Traveling spark */}
          <circle r="3" fill="#fff" style={{ offsetPath: "path('M 80 90 Q 160 60 240 90')", animation: "spark-travel 2.6s ease-in-out infinite" } as React.CSSProperties} />
          {/* Generated middle node */}
          <circle cx="160" cy="68" r="14" fill="url(#brNode)" opacity="0.6" style={{ animation: "pulse-soft 2.6s ease-in-out infinite", animationDelay: "1s" }} />
          <circle cx="160" cy="68" r="3" fill="#fff" style={{ animation: "pulse-soft 2.6s ease-in-out infinite", animationDelay: "1s" }} />
        </svg>
      );

    case "silk":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="silkG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0" />
              <stop offset="50%" stopColor="#fbcfe8" stopOpacity="1" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M ${-20 + i * 10} ${60 + i * 10} Q 100 ${20 + i * 30} 200 ${100 - i * 10} T 360 ${80 + i * 5}`}
              stroke="url(#silkG)"
              strokeWidth={1.5 - i * 0.2}
              fill="none"
              strokeDasharray="200 200"
              style={{
                animation: `silk-flow ${3 + i * 0.7}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </svg>
      );

    case "tendril":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="tendG" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="160" r="6" fill="#93c5fd" style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }} />
          {[
            "M 160 160 Q 80 120 60 30",
            "M 160 160 Q 110 110 130 20",
            "M 160 160 Q 200 110 200 25",
            "M 160 160 Q 240 120 270 35",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="url(#tendG)"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="180 60"
              style={{
                animation: `silk-flow ${2.5 + i * 0.4}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </svg>
      );

    case "fingertip":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="fipG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fipPalm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Palm / synthesis hub at bottom-center */}
          <circle cx="160" cy="148" r="34" fill="url(#fipPalm)" opacity="0.55" style={{ animation: "pulse-soft 2.2s ease-in-out infinite" }} />
          <circle cx="160" cy="148" r="7" fill="#fff" />
          {/* 5 fingers fanning up */}
          {[
            { x: 50, y: 110 },
            { x: 95, y: 50 },
            { x: 160, y: 25 },
            { x: 225, y: 50 },
            { x: 270, y: 110 },
          ].map((p, i) => (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2="160" y2="148" stroke="#67e8f9" strokeWidth="0.9" opacity="0.45" />
              <circle cx={p.x} cy={p.y} r="9" fill="url(#fipG)" opacity="0.75" />
              <circle cx={p.x} cy={p.y} r="3" fill="#fff" style={{ animation: "pulse-soft 1.8s ease-in-out infinite", animationDelay: `${i * 0.18}s` }} />
            </g>
          ))}
          {/* Synthesis particles converging */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              r="2"
              fill="#a5f3fc"
              style={{
                offsetPath: `path('M ${[50, 95, 225][i]} ${[110, 50, 50][i]} Q ${[105, 130, 195][i]} ${[130, 100, 100][i]} 160 148')`,
                animation: `spark-travel ${3 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              } as React.CSSProperties}
            />
          ))}
        </svg>
      );

    case "glyph":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          {/* Infinity glyph */}
          <path
            d="M 100 90 C 100 60, 140 60, 160 90 C 180 120, 220 120, 220 90 C 220 60, 180 60, 160 90 C 140 120, 100 120, 100 90 Z"
            stroke="#fbbf24"
            strokeWidth="2"
            fill="none"
            strokeDasharray="600"
            style={{ animation: "draw-stroke 4s ease-in-out infinite" }}
          />
          <circle cx="100" cy="90" r="3" fill="#fbbf24" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
        </svg>
      );

    case "voice":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          {/* Wave on left */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={20 + i * 12}
              y={90 - 10 - (i % 3) * 6}
              width="4"
              height={20 + (i % 3) * 12}
              rx="2"
              fill="#a78bfa"
              opacity="0.7"
              style={{
                animation: `pulse-soft ${0.8 + (i % 4) * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
          {/* Particles flying right */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={130 + i * 35}
              cy={70 + i * 8}
              r="2"
              fill="#fff"
              style={{
                animation: `float-up ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
          {/* Hand target */}
          <circle cx="270" cy="90" r="22" fill="#a78bfa" opacity="0.15" />
          <circle cx="270" cy="90" r="6" fill="#c4b5fd" style={{ animation: "pulse-soft 2s ease-in-out infinite" }} />
        </svg>
      );

    case "palace":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx="160"
              cy="90"
              r="20"
              stroke="#34d399"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
              style={{
                transformOrigin: "160px 90px",
                animation: `tunnel-zoom ${4}s ease-out infinite`,
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}
          <circle cx="160" cy="90" r="4" fill="#6ee7b7" />
        </svg>
      );

    case "dna":
      return (
        <svg viewBox="0 0 320 180" className="exp-svg absolute inset-0 h-full w-full">
          <path
            d="M 20 90 Q 60 30 100 90 T 180 90 T 260 90 T 340 90"
            stroke="#fb7185"
            strokeWidth="1.5"
            fill="none"
            opacity="0.85"
            strokeDasharray="240 80"
            style={{ animation: "silk-flow 3s linear infinite" }}
          />
          <path
            d="M 20 90 Q 60 150 100 90 T 180 90 T 260 90 T 340 90"
            stroke="#f472b6"
            strokeWidth="1.5"
            fill="none"
            opacity="0.85"
            strokeDasharray="240 80"
            style={{ animation: "silk-flow 3s linear infinite", animationDelay: "1.5s" }}
          />
          {/* Connecting rungs */}
          {[60, 100, 140, 180, 220, 260].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={70}
              x2={x}
              y2={110}
              stroke="#fbcfe8"
              strokeWidth="0.8"
              opacity="0.4"
              style={{ animation: "pulse-soft 2s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>
      );

    default:
      return null;
  }
}

/* ───────────────────────────── STACK ───────────────────────────── */

function Stack() {
  const groups: {
    label: string;
    items: string[];
    accent: "indigo" | "cyan" | "amber" | "emerald";
  }[] = [
    {
      label: "Engineering & Backend",
      accent: "indigo",
      items: [
        "Python",
        "TypeScript",
        "SQL",
        "FastAPI",
        "PostgreSQL",
        "Supabase",
      ],
    },
    {
      label: "AI & Automation",
      accent: "cyan",
      items: ["Claude", "LangChain", "RAG", "n8n", "Dify", "Google AI Studio"],
    },
    {
      label: "Data & BI",
      accent: "amber",
      items: ["DuckDB", "dbt", "Polars", "Apache Arrow", "Retool", "Metabase"],
    },
    {
      label: "Infra & Cloud",
      accent: "emerald",
      items: [
        "AWS",
        "Vercel",
        "Docker",
        "Kubernetes",
        "Cloudflare",
        "Terraform",
      ],
    },
  ];

  const tone: Record<
    "indigo" | "cyan" | "amber" | "emerald",
    {
      label: string;
      dot: string;
      hoverBorder: string;
      glow: string;
      pillHover: string;
    }
  > = {
    indigo: {
      label: "text-indigo-200/90",
      dot: "bg-indigo-400",
      hoverBorder: "hover:border-indigo-300/30",
      glow: "from-indigo-500/15",
      pillHover: "hover:border-indigo-300/40 hover:text-indigo-100",
    },
    cyan: {
      label: "text-cyan-200/90",
      dot: "bg-cyan-300",
      hoverBorder: "hover:border-cyan-300/30",
      glow: "from-cyan-400/15",
      pillHover: "hover:border-cyan-300/40 hover:text-cyan-100",
    },
    amber: {
      label: "text-amber-200/90",
      dot: "bg-amber-300",
      hoverBorder: "hover:border-amber-300/30",
      glow: "from-amber-400/15",
      pillHover: "hover:border-amber-300/40 hover:text-amber-100",
    },
    emerald: {
      label: "text-emerald-200/90",
      dot: "bg-emerald-300",
      hoverBorder: "hover:border-emerald-300/30",
      glow: "from-emerald-400/15",
      pillHover: "hover:border-emerald-300/40 hover:text-emerald-100",
    },
  };

  return (
    <section
      id="stack"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <SectionHeading
        eyebrow="// 04 · stack"
        title="Powering the machine economy."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {groups.map((g) => {
          const t = tone[g.accent];
          return (
            <div
              key={g.label}
              className={`card-border relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-6 transition-all duration-300 ${t.hoverBorder}`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${t.glow} to-transparent blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${t.dot} shadow-[0_0_8px_currentColor]`}
                  />
                  <span className={t.label}>{g.label}</span>
                </span>
                <span className="font-mono text-[11px] text-white/30">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-xs text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.04] ${t.pillHover}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────────── CONTACT ───────────────────────────── */

function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24"
    >
      <div className="card-border relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/95 backdrop-blur-md p-10 text-center md:p-16">
        <div className="mb-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
          // 05 · let&apos;s build
        </div>
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="text-gradient">Let&apos;s build together.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/60">
          Disponível para projetos de alto impacto em Arquitetura de IA,
          Engenharia de Dados e Automação em escala.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://www.linkedin.com/in/victoralexandre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/90"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href="https://github.com/victoralexandre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/90 transition hover:bg-white/[0.08]"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── FOOTER ───────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 text-xs text-white/40 md:flex-row md:items-center">
        <div className="font-mono">
          © {new Date().getFullYear()} Victor Alexandre · Neural Boreal Architect
        </div>
        <div className="font-mono">Crafted with precision & AI-acceleration.</div>
      </div>
    </footer>
  );
}

/* ───────────────────────────── SHARED ───────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <div className="mb-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
        {eyebrow}
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.73.5.67 5.57.67 11.84c0 5.01 3.24 9.26 7.74 10.76.57.1.78-.25.78-.55v-2.12c-3.15.69-3.81-1.35-3.81-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.94.1-.74.4-1.24.72-1.52-2.51-.29-5.16-1.26-5.16-5.59 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.45.11-3.01 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.11-1.16 3.11-1.16.62 1.56.23 2.72.11 3.01.72.79 1.16 1.8 1.16 3.03 0 4.34-2.66 5.3-5.19 5.58.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55 4.5-1.5 7.73-5.75 7.73-10.76C23.33 5.57 18.27.5 12 .5z" />
    </svg>
  );
}
