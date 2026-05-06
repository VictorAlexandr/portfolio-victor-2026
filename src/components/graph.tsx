"use client";

import { useEffect, useRef } from "react";

type Kind = "project" | "tech" | "concept";
type Node = {
  id: string;
  label: string;
  kind: Kind;
  weight: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
};

const NODES: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  { id: "dash", label: "dashboard-oficial", kind: "project", weight: 1.35 },
  { id: "agents", label: "agents-console", kind: "project", weight: 1.15 },
  { id: "monday", label: "monday-agent", kind: "project", weight: 1.1 },
  { id: "ga4", label: "ga4-agent", kind: "project", weight: 1.05 },
  { id: "hub", label: "ai-hub", kind: "project", weight: 1.05 },
  { id: "topo", label: "spark-topologies", kind: "project", weight: 1.0 },
  { id: "lab", label: "ds-lab", kind: "project", weight: 1.0 },
  { id: "ml", label: "spark-ml", kind: "project", weight: 1.0 },
  { id: "growth", label: "spark-growth", kind: "project", weight: 0.95 },

  { id: "claude", label: "claude", kind: "tech", weight: 0.85 },
  { id: "supabase", label: "supabase", kind: "tech", weight: 0.85 },
  { id: "next", label: "next.js", kind: "tech", weight: 0.85 },
  { id: "n8n", label: "n8n", kind: "tech", weight: 0.78 },
  { id: "voyage", label: "voyage", kind: "tech", weight: 0.78 },
  { id: "bedrock", label: "bedrock", kind: "tech", weight: 0.72 },
  { id: "dbt", label: "dbt", kind: "tech", weight: 0.7 },

  { id: "rag", label: "rag", kind: "concept", weight: 0.72 },
  { id: "bi", label: "bi-as-code", kind: "concept", weight: 0.8 },
  { id: "audit", label: "auditor-llm", kind: "concept", weight: 0.78 },
];

const EDGES: [string, string][] = [
  ["dash", "next"],
  ["dash", "supabase"],
  ["dash", "bi"],
  ["dash", "dbt"],
  ["dash", "claude"],
  ["agents", "next"],
  ["agents", "supabase"],
  ["agents", "claude"],
  ["agents", "audit"],
  ["agents", "n8n"],
  ["agents", "bedrock"],
  ["monday", "next"],
  ["monday", "claude"],
  ["monday", "voyage"],
  ["monday", "rag"],
  ["ga4", "next"],
  ["ga4", "claude"],
  ["topo", "voyage"],
  ["topo", "next"],
  ["hub", "voyage"],
  ["hub", "rag"],
  ["hub", "claude"],
  ["hub", "supabase"],
  ["lab", "next"],
  ["ml", "supabase"],
  ["ml", "dbt"],
  ["growth", "next"],
  ["growth", "supabase"],
];

export function Graph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Mulberry32 seeded RNG so layout is stable across reloads
    const rng = (() => {
      let s = 0x9e3779b9;
      return () => {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })();

    let W = 0;
    let H = 0;
    let DPR = 1;

    const nodes: Node[] = NODES.map((n, i) => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }));

    const idToIdx = new Map(nodes.map((n, i) => [n.id, i] as const));
    const adj: Record<string, Set<string>> = {};
    nodes.forEach((n) => (adj[n.id] = new Set()));
    EDGES.forEach(([a, b]) => {
      adj[a].add(b);
      adj[b].add(a);
    });

    const edges = EDGES.map(([a, b]) => [idToIdx.get(a)!, idToIdx.get(b)!] as const);

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
    }

    function seed() {
      // Initial radial scatter, projects pulled inward, tech outward
      nodes.forEach((n, i) => {
        const r = (n.kind === "project" ? 0.3 : 0.45) * Math.min(W, H);
        const a = (i / nodes.length) * Math.PI * 2 + rng() * 0.4;
        n.x = W / 2 + Math.cos(a) * r + (rng() - 0.5) * 30;
        n.y = H / 2 + Math.sin(a) * r + (rng() - 0.5) * 30;
        n.vx = 0;
        n.vy = 0;
      });
    }

    resize();
    seed();
    const ro = new ResizeObserver(() => {
      const oldW = W;
      const oldH = H;
      resize();
      // re-center proportionally
      if (oldW > 0 && oldH > 0) {
        const sx = W / oldW;
        const sy = H / oldH;
        nodes.forEach((n) => {
          n.x *= sx;
          n.y *= sy;
        });
      }
    });
    ro.observe(wrap);

    // Pointer state
    let hovered: number | null = null;
    let dragging: number | null = null;
    let mx = -9999;
    let my = -9999;
    let mInside = false;

    function clientToCanvas(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }

    function nearestNode(): number | null {
      let best: number | null = null;
      let bestD = 60 * 60;
      nodes.forEach((n, i) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        const d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    }

    function onMove(e: PointerEvent) {
      mInside = true;
      clientToCanvas(e);
      if (dragging != null) {
        const n = nodes[dragging];
        n.fx = mx;
        n.fy = my;
      } else {
        hovered = nearestNode();
        canvas.style.cursor = hovered != null ? "grab" : "default";
      }
    }
    function onLeave() {
      mInside = false;
      hovered = null;
      mx = -9999;
      my = -9999;
    }
    function onDown(e: PointerEvent) {
      clientToCanvas(e);
      const idx = nearestNode();
      if (idx != null) {
        dragging = idx;
        nodes[idx].fx = mx;
        nodes[idx].fy = my;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      }
    }
    function onUp(e: PointerEvent) {
      if (dragging != null) {
        const n = nodes[dragging];
        n.fx = undefined;
        n.fy = undefined;
        dragging = null;
        canvas.releasePointerCapture(e.pointerId);
        canvas.style.cursor = hovered != null ? "grab" : "default";
      }
    }

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // Physics constants
    const REPULSE = 9000;
    const SPRING_LEN = 130;
    const SPRING_K = 0.012;
    const CENTER_K = 0.0035;
    const DAMP = 0.86;
    const HOVER_GLOW_K = 0.04;

    let raf = 0;

    function step() {
      // Forces
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // Coulomb repulsion
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          const d2 = dx * dx + dy * dy + 0.01;
          const inv = REPULSE / d2;
          const d = Math.sqrt(d2);
          const fx = (dx / d) * inv;
          const fy = (dy / d) * inv;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
        // Mild pull toward center
        a.vx += (W / 2 - a.x) * CENTER_K;
        a.vy += (H / 2 - a.y) * CENTER_K;
      }

      // Spring on edges
      edges.forEach(([ia, ib]) => {
        const a = nodes[ia];
        const b = nodes[ib];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const f = (d - SPRING_LEN) * SPRING_K;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      });

      // Repulsion from cursor when inside
      if (mInside && dragging == null) {
        for (const n of nodes) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d2 = dx * dx + dy * dy + 0.01;
          if (d2 < 14000) {
            const inv = 5500 / d2;
            const d = Math.sqrt(d2);
            n.vx += (dx / d) * inv;
            n.vy += (dy / d) * inv;
          }
        }
      }

      // Integrate
      for (const n of nodes) {
        if (n.fx != null && n.fy != null) {
          n.x = n.fx;
          n.y = n.fy;
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.vx *= DAMP;
        n.vy *= DAMP;
        n.x += n.vx * 0.016;
        n.y += n.vy * 0.016;
        // Soft walls
        const pad = 28;
        if (n.x < pad) {
          n.x = pad;
          n.vx *= -0.5;
        }
        if (n.x > W - pad) {
          n.x = W - pad;
          n.vx *= -0.5;
        }
        if (n.y < pad) {
          n.y = pad;
          n.vy *= -0.5;
        }
        if (n.y > H - pad) {
          n.y = H - pad;
          n.vy *= -0.5;
        }
      }

      // Render
      ctx.clearRect(0, 0, W, H);

      // Hovered + neighbors
      const hoveredId = hovered != null ? nodes[hovered].id : null;
      const litIds = new Set<string>();
      if (hoveredId) {
        litIds.add(hoveredId);
        for (const id of adj[hoveredId]) litIds.add(id);
      }

      // Edges
      edges.forEach(([ia, ib]) => {
        const a = nodes[ia];
        const b = nodes[ib];
        const lit = litIds.has(a.id) && litIds.has(b.id);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = lit ? 1.4 : 0.6;
        ctx.strokeStyle = lit ? "#a78bfa" : "rgba(237,229,210,0.12)";
        ctx.stroke();
      });

      // Nodes
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (const n of nodes) {
        const lit = litIds.has(n.id);
        const isProject = n.kind === "project";
        const isConcept = n.kind === "concept";
        const size =
          (isProject ? 15 : isConcept ? 12 : 13) * (lit ? 1.05 : 1) * n.weight;

        // Background pad (paper) so text isn't crossed by edges
        ctx.font = `${isProject ? "500" : "400"} ${size}px var(--font-mono), ui-monospace, monospace`;
        const tw = ctx.measureText(n.label).width;
        const padX = 6;
        const padY = 4;
        ctx.fillStyle = "rgba(8,7,12,0.88)";
        roundRect(
          ctx,
          n.x - tw / 2 - padX,
          n.y - size / 2 - padY,
          tw + padX * 2,
          size + padY * 2,
          4,
        );
        ctx.fill();

        // Subtle border for hovered chip
        if (lit) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(167,139,250,0.55)";
          roundRect(
            ctx,
            n.x - tw / 2 - padX,
            n.y - size / 2 - padY,
            tw + padX * 2,
            size + padY * 2,
            4,
          );
          ctx.stroke();
        }

        // Text
        if (lit) {
          ctx.fillStyle = "#a78bfa";
        } else if (isProject) {
          ctx.fillStyle = "#ede5d2";
        } else if (isConcept) {
          ctx.fillStyle = "#a8a2b8";
        } else {
          ctx.fillStyle = "#7a7585";
        }
        ctx.fillText(n.label, n.x, n.y);

        // Tiny accent dot for projects
        if (isProject) {
          ctx.beginPath();
          ctx.arc(
            n.x + tw / 2 + padX + 6,
            n.y - size / 2 + 2,
            2.2,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#a78bfa";
          ctx.globalAlpha = lit ? 1 : 0.65;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 select-none">
      <canvas ref={canvasRef} aria-label="Mapa de sistemas e tecnologias" />
      <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] text-[var(--ink-mute)]">
        <span>// arraste qualquer palavra</span>
        <span className="flex items-center gap-1.5">
          <span className="dot dot-prod" /> em produção
        </span>
      </div>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
