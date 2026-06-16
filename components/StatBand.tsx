"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (inView) mv.set(to); }, [inView, mv, to]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { to: 30,   suffix: "%",   label: "Average sales increase reported by clients",  note: "Reported uplift" },
  { to: 1240, suffix: "+",   label: "Store audits completed every month",           note: "Active stores" },
  { to: 98,   suffix: "%",   label: "Order accuracy with automated capture",        note: "First-pass rate" },
  { to: 14,   suffix: "hrs", label: "Saved per rep, per week, on admin",            note: "Time saved" },
];

export function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="analytics" className="relative px-6 py-24 md:px-12 md:py-36 lg:px-16">
      {/* Pull-quote above */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.21, 0.65, 0.22, 1] }}
        className="mb-20 max-w-3xl"
      >
        <span className="tag mb-4 inline-flex">Analytics</span>
        <p className="font-display text-3xl font-bold leading-snug text-[var(--text)] md:text-4xl lg:text-5xl">
          Some clients have achieved a{" "}
          <span className="text-[var(--brand)]">30% increase in sales</span>{" "}
          — simply by knowing where in-field focus pays off.
        </p>
      </motion.div>

      {/* Editorial stat rows */}
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.65, 0.22, 1] }}
            className="group flex items-center justify-between gap-6 py-10 transition-colors hover:bg-[rgba(0,201,122,0.02)] md:py-14"
          >
            {/* Number */}
            <span className="font-display text-5xl font-extrabold leading-none tracking-tight text-[var(--brand)] md:text-7xl lg:text-8xl">
              <Counter to={s.to} suffix={s.suffix} />
            </span>

            {/* Label + note */}
            <div className="flex flex-1 flex-col items-end gap-1 text-right md:flex-row md:items-center md:justify-end md:gap-12 md:text-left">
              <p className="text-sm font-medium text-[var(--text-2)] md:text-base lg:text-lg md:text-right">
                {s.label}
              </p>
              <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[var(--text-2)] md:w-28 md:text-right">
                {s.note}
              </span>
            </div>

            {/* Arrow indicator */}
            <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-2)] opacity-0 transition-opacity group-hover:opacity-100 md:flex">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
