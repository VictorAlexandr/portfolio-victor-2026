"use client";

import { useEffect, useRef } from "react";

const STACK = [
  "Python",
  "TypeScript",
  "SQL",
  "PostgreSQL",
  "Supabase",
  "FastAPI",
  "Next.js 16",
  "Tailwind v4",
  "Vercel",
  "Cloudflare",
  "Docker",
  "Claude",
  "Voyage",
  "Bedrock",
  "Dify",
  "MCP",
  "RAG",
  "dbt",
  "DuckDB",
  "Polars",
  "pgvector",
  "Apache Arrow",
  "n8n",
  "Evolution API",
  "scikit-learn",
  "uv",
];

const SNIPPETS = [
  "def transform(df):",
  "from supabase import",
  "async def run():",
  "import polars as pl",
  "if score > 0.7:",
  "@dataclass",
  "class Agent:",
  "client.messages.create(",
  "embedding = voyage.embed(",
  "with conn.cursor() as cur:",
  "yield chunk",
  "lambda x: x.upper()",
  "model='claude-sonnet-4-6'",
  "SELECT * FROM events",
  "df = pl.read_parquet(",
  "for row in rows:",
  "raise ValueError(",
  "tools=[{...}]",
  "x: int | None = None",
  "match status:",
  "return {'ok': True}",
  "# auditor passes",
  "vector @> '<[...]>'",
  "WITH cte AS (",
  "self.__class__",
];

export function Marquee() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    let DPR = 1;

    type Particle = {
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      ttl: number;
      size: number;
    };

    let particles: Particle[] = [];

    function spawn(): Particle {
      const text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
      const size = 11 + Math.random() * 3;
      return {
        text,
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.05,
        life: 0,
        ttl: 7000 + Math.random() * 9000,
        size,
      };
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const target = Math.floor((W * H) / 14000);
      while (particles.length < target) particles.push(spawn());
      if (particles.length > target) particles.length = target;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let last = performance.now();
    let raf = 0;

    function step(now: number) {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.clearRect(0, 0, W, H);

      ctx.font = `400 12px var(--font-mono), ui-monospace, monospace`;
      for (const p of particles) {
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        // Fade
        const t = p.life / p.ttl;
        let a = 0;
        if (t < 0.15) a = t / 0.15;
        else if (t > 0.85) a = (1 - t) / 0.15;
        else a = 1;
        a = Math.max(0, Math.min(1, a));
        ctx.font = `400 ${p.size}px var(--font-mono), ui-monospace, monospace`;
        ctx.fillStyle = `rgba(167,139,250,${0.10 * a})`;
        ctx.fillText(p.text, p.x, p.y);

        if (p.life >= p.ttl || p.x < -200 || p.x > W + 200) {
          Object.assign(p, spawn(), { y: Math.random() * H });
        }
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const track = [...STACK, ...STACK];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden border-y border-[var(--rule)]"
      style={{ background: "#000" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background: "linear-gradient(90deg, #000, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background: "linear-gradient(270deg, #000, transparent)",
        }}
      />

      <div className="relative z-10 flex items-center py-3">
        <div className="marquee-track-tight overflow-hidden">
          {track.map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 whitespace-nowrap font-mono text-[12.5px] text-[var(--ink-soft)]"
            >
              <span>{s}</span>
              <span aria-hidden className="text-[var(--ink-faint)]">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
