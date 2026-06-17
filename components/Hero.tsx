"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, TrendingUp, ShoppingCart, BarChart2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useIntroDone } from "./Preloader";
import { useRef } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

function SparkChart() {
  return (
    <svg viewBox="0 0 220 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00C97A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00C97A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      <path
        d="M0 52 L28 44 L56 38 L84 42 L112 28 L140 22 L168 14 L196 8 L220 4 L220 64 L0 64Z"
        fill="url(#chartGrad)"
      />
      <motion.path
        d="M0 52 L28 44 L56 38 L84 42 L112 28 L140 22 L168 14 L196 8 L220 4"
        stroke="#00C97A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, delay: 1.2, ease: "easeInOut" }}
      />
      <motion.circle cx="220" cy="4" r="3.5" fill="#00C97A"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 3.2 }}
      />
      <motion.circle cx="220" cy="4" r="6" fill="#00C97A" fillOpacity="0.2"
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, delay: 3.4, repeat: Infinity }}
      />
    </svg>
  );
}

function StoreRow({ name, value, status, delay }: { name: string; value: string; status: "ok" | "warn" | "pending"; delay: number }) {
  const icon = status === "ok"
    ? <CheckCircle className="h-3 w-3 text-[#00C97A]" />
    : status === "warn"
    ? <AlertCircle className="h-3 w-3 text-amber-400" />
    : <Clock className="h-3 w-3 text-white/30" />;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0"
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-[0.7rem] text-white/70">{name}</span>
      </div>
      <span className="text-[0.7rem] font-bold text-white/90">{value}</span>
    </motion.div>
  );
}

function ProductUI() {
  return (
    <div className="relative w-full select-none">
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(0,201,122,0.1)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.8, ease: [0.21, 0.65, 0.22, 1] }}
        className="relative rounded-2xl border border-white/[0.08] bg-[#0E0E0E] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-[#00C97A] grid place-items-center">
              <svg width="10" height="10" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="24" height="4" rx="2" fill="#000"/>
                <rect x="4" y="14" width="24" height="4" rx="2" fill="#000" opacity="0.7"/>
                <rect x="4" y="22" width="16" height="4" rx="2" fill="#000" opacity="0.45"/>
              </svg>
            </div>
            <span className="text-[0.65rem] font-bold text-white/80 tracking-wide">SmartShelf</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00C97A] animate-pulse" />
            <span className="text-[0.6rem] text-white/40">Live</span>
          </div>
        </div>

        <div className="p-4">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: TrendingUp, label: "Sales Uplift", value: "+30%", color: "#00C97A" },
              { icon: ShoppingCart, label: "Orders Today", value: "1,240", color: "#60A5FA" },
              { icon: BarChart2, label: "Accuracy", value: "98.6%", color: "#F59E0B" },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                <Icon className="h-3.5 w-3.5 mb-2" style={{ color }} strokeWidth={2.5} />
                <p className="text-[0.62rem] font-bold leading-none" style={{ color }}>{value}</p>
                <p className="mt-1 text-[0.55rem] text-white/35 leading-tight">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.6rem] font-bold text-white/50 uppercase tracking-wider">Revenue Trend</span>
              <span className="text-[0.6rem] text-[#00C97A] font-bold">↑ 18.4%</span>
            </div>
            <div className="h-16">
              <SparkChart />
            </div>
          </div>

          {/* Store list */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-[0.6rem] font-bold text-white/50 uppercase tracking-wider mb-1">Live Stores</p>
            <StoreRow name="Countdown CBD" value="$4,280" status="ok" delay={1.6} />
            <StoreRow name="New World Albany" value="$3,910" status="ok" delay={1.68} />
            <StoreRow name="Pak'nSave Botany" value="$2,145" status="warn" delay={1.76} />
            <StoreRow name="FreshChoice" value="Pending" status="pending" delay={1.84} />
          </div>
        </div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 2.2, ease: [0.21, 0.65, 0.22, 1] }}
        className="absolute -right-6 top-12 w-48 rounded-xl border border-white/[0.1] bg-[#0A0A0A]/95 p-3 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8)] backdrop-blur-sm"
      >
        <div className="flex items-start gap-2">
          <div className="mt-0.5 h-5 w-5 shrink-0 rounded-lg bg-[#00C97A]/10 grid place-items-center">
            <TrendingUp className="h-3 w-3 text-[#00C97A]" />
          </div>
          <div>
            <p className="text-[0.6rem] font-bold text-white/90">New order synced</p>
            <p className="text-[0.55rem] text-white/45 mt-0.5">Countdown CBD · $1,240</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-1 flex-1 rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-[#00C97A]"
              initial={{ width: "0%" }}
              animate={{ width: "78%" }}
              transition={{ duration: 1.2, delay: 2.8 }}
            />
          </div>
          <span className="text-[0.5rem] text-white/30">78%</span>
        </div>
      </motion.div>

      {/* Floating accuracy badge */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 2.5, ease: [0.21, 0.65, 0.22, 1] }}
        className="absolute -left-6 bottom-20 rounded-xl border border-[#00C97A]/20 bg-[#0A0A0A]/95 p-3 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8)] backdrop-blur-sm"
      >
        <p className="text-[0.6rem] text-white/40 uppercase tracking-wider">Order Accuracy</p>
        <p className="text-xl font-extrabold text-[#00C97A] leading-none mt-0.5">98.6%</p>
        <div className="mt-2 flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 w-3 rounded-full ${i < 9 ? "bg-[#00C97A]" : "bg-white/10"}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 2.6 + i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const introDone = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const uiRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const uiScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen w-full items-center px-5 pb-16 pt-28 md:px-12 lg:h-screen lg:px-20 lg:py-0 lg:pt-[68px]"
      style={{ overflow: "clip" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,201,122,0.07)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,201,122,0.04)_0%,transparent_65%)]" />
      </div>

      <div className="relative w-full grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:items-center">

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="tag">FMCG Operations Platform</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[var(--text-2)]">NZ &amp; AU</span>
          </motion.div>

          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={introDone ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease }}
                className="font-display text-[clamp(2.3rem,7vw,7rem)] font-bold leading-[1] tracking-[-0.04em] text-[var(--text-2)]"
              >
                Improve Your
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={introDone ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="font-display text-[clamp(3.25rem,13vw,13rem)] font-extrabold leading-[0.85] tracking-[-0.05em]"
                style={{ WebkitTextStroke: "2px var(--brand)", color: "transparent" }}
              >
                GROCERY
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={introDone ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.42, ease }}
                className="font-display text-[clamp(2.3rem,7vw,7rem)] font-extrabold leading-[1] tracking-[-0.04em] text-[var(--text)]"
              >
                Sales Results.
              </motion.p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mb-8 max-w-md text-base leading-relaxed text-[var(--text-2)] md:text-[1.05rem]"
          >
            Transform your field operations with smart inventory management,
            automated sales orders and real-time store analytics — built
            for grocery suppliers and FMCG brands across New Zealand &amp; Australia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <a href="#contact" className="btn btn-primary gap-2 px-7 py-3.5 text-sm">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#modules" className="btn btn-ghost px-7 py-3.5 text-sm">
              Watch Demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="flex items-center gap-0 divide-x divide-[var(--border)] border-t border-[var(--border)] pt-8"
          >
            {[
              ["+30%", "Sales Uplift"],
              ["1,240+", "Active Stores"],
              ["98.6%", "Order Accuracy"],
            ].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-1 px-3.5 first:pl-0 last:pr-0 sm:px-5">
                <span className="font-display text-base font-extrabold leading-none text-[var(--brand)] sm:text-lg md:text-xl">{v}</span>
                <span className="text-[0.52rem] font-bold uppercase tracking-[0.12em] text-[var(--text-2)] sm:text-[0.58rem] sm:tracking-[0.18em]">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Product UI — 3D scroll tilt */}
        <motion.div
          style={{ y, rotateX: uiRotate, scale: uiScale, transformPerspective: 1400, transformStyle: "preserve-3d" }}
          className="relative hidden lg:block px-4"
        >
          <ProductUI />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-[var(--text-2)]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[var(--border)] to-transparent" />
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={introDone ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, delay: 1.1, ease }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--border)]"
      />
    </section>
  );
}
