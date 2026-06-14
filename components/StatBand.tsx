"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrollStage } from "./ui";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 22 });
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { to: 30, suffix: "%", label: "Average sales increase reported by clients" },
  { to: 1240, suffix: "+", label: "Store audits completed every month" },
  { to: 98, suffix: "%", label: "Order accuracy with automated capture" },
  { to: 14, suffix: "hrs", label: "Saved per rep, per week, on admin" },
];

export function StatBand() {
  return (
    <section id="analytics" className="relative px-3 py-14">
      <div className="mx-auto max-w-[1200px]">
        <ScrollStage>
          <div className="glass-deep ring-glow relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-14">
            <div
              aria-hidden
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,212,255,0.16),transparent_65%)]"
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(18,87,166,0.3),transparent_65%)]"
            />

            <p className="relative mx-auto max-w-3xl text-center font-display text-2xl font-bold leading-snug text-mist md:text-4xl">
              Some of our clients have achieved a{" "}
              <span className="text-gradient">30% increase in sales</span> with
              the help of this module â€” simply by reporting where in-field
              focus is best placed.
            </p>

            <div className="relative mt-12 grid grid-cols-2 gap-8 border-t border-line pt-12 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-4xl font-extrabold text-gradient md:text-5xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mx-auto mt-3 max-w-[16rem] text-xs leading-relaxed text-mist-2 md:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollStage>
      </div>
    </section>
  );
}


