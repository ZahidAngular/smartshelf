"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Factory, Activity, LayoutPanelTop, Handshake, Bot,
  CheckCircle2, ArrowRight, type LucideIcon,
} from "lucide-react";

type Mod = {
  icon: LucideIcon;
  num: string;
  title: string;
  desc: string;
  points: string[];
  featured?: boolean;
  tall?: boolean;
};

const modules: Mod[] = [
  {
    icon: Factory,
    num: "05",
    title: "Manufacturing Purchase Orders",
    desc: "Automated procurement, cost & waste reduction and supplier management in one seamless flow.",
    points: ["Automated procurement", "Cost & waste reduction", "Supplier management"],
    featured: true,
  },
  {
    icon: Activity,
    num: "06",
    title: "In-Store Performance Analytics",
    desc: "Real-time data feeds that pinpoint exactly which stores, products and promotions are winning.",
    points: ["Real-time monitoring", "Competitor benchmarking"],
    tall: true,
  },
  {
    icon: LayoutPanelTop,
    num: "07",
    title: "Category Planogram Tools",
    desc: "Optimise every shelf — substantiated placements that lift visibility and protect promo space.",
    points: ["Greater shelf visibility", "Optimised profitability"],
  },
  {
    icon: Handshake,
    num: "08",
    title: "Supplier Collaboration",
    desc: "One collaborative hub — shared forecasts, order visibility and faster supplier responses.",
    points: ["Shared dashboards", "Faster turnaround"],
  },
  {
    icon: Bot,
    num: "09",
    title: "AI-Powered Chatbot",
    desc: "Instant answers on stock, pricing and orders — trained on your own product catalogue.",
    points: ["24/7 field support", "Trained on your data"],
  },
];

function ModCard({ m, delay }: { m: Mod; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // ── 3D tilt on mouse move ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });
  // glare position
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.65, 0.22, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-7 transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-brand)] hover:shadow-[var(--shadow-lift)]"
    >
      {/* Moving glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(0,201,122,0.10), transparent 55%)`
          ),
        }}
      />

      {/* Featured top accent */}
      {m.featured && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--brand)]" style={{ transform: "translateZ(40px)" }} />
      )}

      {/* Icon — lifted in 3D */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className={`mb-5 flex items-center justify-center rounded-xl ${m.featured ? "h-14 w-14" : "h-12 w-12"} ${
          m.featured
            ? "bg-[var(--brand)] shadow-[0_8px_24px_-4px_rgba(0,201,122,0.55)]"
            : "border border-[var(--border)] bg-[var(--bg-3)]"
        }`}
      >
        <m.icon
          className={`${m.featured ? "h-7 w-7 text-black" : "h-6 w-6 text-[var(--brand)]"}`}
          strokeWidth={2.2}
        />
      </div>

      {/* Ghost number */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="absolute right-5 top-5 font-display text-5xl font-extrabold text-[var(--text)] opacity-[0.03]"
      >
        {m.num}
      </div>

      {/* Content — lifted */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-1 flex-col">
        {m.featured && (
          <span className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[var(--brand)]">
            Featured Module
          </span>
        )}
        <h3 className={`font-display font-extrabold leading-tight tracking-tight text-[var(--text)] ${m.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {m.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed text-[var(--text-2)] ${m.featured ? "max-w-xl" : ""}`}>{m.desc}</p>

        <ul className={`mt-5 ${m.featured ? "grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2.5"}`}>
          {m.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-[var(--text-2)]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--brand)]" strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>

        {/* Hover CTA — pinned to bottom */}
        <div className="mt-auto flex items-center gap-1.5 pt-6 text-xs font-bold text-[var(--brand)] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
          Learn more
          <ArrowRight className="h-3.5 w-3.5 text-[var(--brand)]" />
        </div>
      </div>
    </motion.div>
  );
}

export function Modules() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="platform" className="relative px-6 py-24 md:px-12 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div ref={ref} className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.21, 0.65, 0.22, 1] }}
              className="tag inline-flex"
            >
              Advanced Modules
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.21, 0.65, 0.22, 1] }}
              className="mt-5 font-display text-5xl font-extrabold leading-tight tracking-tight text-[var(--text)] md:text-6xl"
            >
              More Power on<br />
              <span className="text-[var(--brand)]">Every Shelf</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="max-w-xs text-sm leading-relaxed text-[var(--text-2)]"
          >
            Purpose-built modules that turn FMCG complexity into a competitive edge.
          </motion.p>
        </div>

        {/* Balanced grid — featured spans 2 cols, equal-height rows */}
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1: Featured (2 cols) + 1 */}
          <div className="md:col-span-2">
            <ModCard m={modules[0]} delay={0} />
          </div>
          <div>
            <ModCard m={modules[1]} delay={0.08} />
          </div>

          {/* Row 2: 3 equal cards */}
          <div>
            <ModCard m={modules[2]} delay={0.16} />
          </div>
          <div>
            <ModCard m={modules[3]} delay={0.24} />
          </div>
          <div>
            <ModCard m={modules[4]} delay={0.32} />
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="relative mt-5 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-8 sm:flex-row"
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,201,122,0.1)_0%,transparent_70%)]" />

          <div className="relative">
            <p className="font-display text-xl font-extrabold tracking-tight text-[var(--text)] md:text-2xl">
              Ready to see all modules in action?
            </p>
            <p className="mt-2 text-sm text-[var(--text-2)]">
              Book a live demo and we&apos;ll walk you through the full platform — tailored to your operation.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary relative shrink-0 px-7 py-3.5">
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
