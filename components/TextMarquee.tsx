"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const items = [
  "Grocery Sales",
  "Distribution",
  "Store Audits",
  "Analytics",
  "Planograms",
  "Procurement",
];

export function TextMarquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 50, damping: 30 });
  const skew = useTransform(smooth, [-1500, 1500], [-3, 3]);

  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] py-6 md:py-9">
      <motion.div style={{ skewX: skew }} className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12">
          {[...items, ...items].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-12">
              <span className="font-display text-5xl font-extrabold uppercase tracking-tight text-outline md:text-7xl">
                {t}
              </span>
              <span className="h-2 w-2 rotate-45 bg-[var(--brand)] opacity-70" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
