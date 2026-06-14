"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const items = [
  "Grocery Sales",
  "Distribution",
  "Store Audits",
  "Analytics",
  "Planograms",
  "Procurement",
];

/* Big outlined text strip whose speed reacts to scroll velocity */
export function TextMarquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 50, damping: 30 });
  const skew = useTransform(smooth, [-1500, 1500], [-4, 4]);

  return (
    <section className="relative overflow-hidden border-y border-line py-7 md:py-10">
      <motion.div
        style={{ skewX: skew }}
        className="marquee-mask overflow-hidden"
      >
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...items, ...items].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-6xl font-extrabold uppercase tracking-tight text-gradient md:text-8xl">
                {t}
              </span>
              <span className="h-3 w-3 rotate-45 bg-brand-2 shadow-[0_0_18px_4px_rgba(56,212,255,0.45)]" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
