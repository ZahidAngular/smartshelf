"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  "Angel Tech", "HeartFelt", "PureHarvest", "Kiwi Fresh",
  "GreenGrocer Co", "Pantry Plus", "Southern Foods", "Alpine Dairy",
  "FreshChoice", "Metro Foods", "Pacific Goods", "OrganicNZ",
];

export function Brands() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="brands" className="relative border-y border-[var(--border)] py-14">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 mb-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-6"
        >
          <div className="h-px flex-1 bg-[var(--border)]" />
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.38em] text-[var(--text-2)] shrink-0">
            Trusted by leading FMCG brands across NZ &amp; AU
          </p>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </motion.div>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {[...brands, ...brands].map((b, i) => (
            <div key={`${b}-${i}`} className="flex items-center gap-0">
              <span className="whitespace-nowrap px-10 font-display text-sm font-bold tracking-wide text-[var(--text-2)] transition-colors duration-200 hover:text-[var(--text)]">
                {b}
              </span>
              <div className="h-4 w-px bg-[var(--border)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
