"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden bg-[var(--brand)] px-6 py-20 md:px-12 md:py-32 lg:px-16"
    >
      {/* Subtle crosshatch on green bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">

          {/* Headline */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="mb-6 inline-block text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[rgba(0,0,0,0.5)]"
            >
              Ready to grow?
            </motion.span>

            <h2 className="font-display leading-[0.92] tracking-[-0.04em]">
              {["Transform Your", "Grocery Products", "Operations Today"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.85, delay: i * 0.1, ease }}
                    className="block text-4xl font-extrabold text-black md:text-6xl lg:text-7xl"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-[rgba(0,0,0,0.65)] md:text-lg"
            >
              Take your products and brand to a higher level — with cutting-edge
              grocery store management software that connects field reps,
              inventory, suppliers and analytics in one place.
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-md bg-black px-8 py-4 text-sm font-bold text-[var(--brand)] transition-all hover:bg-[#111] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
            >
              See Plans &amp; Pricing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-[rgba(0,0,0,0.25)] bg-transparent px-8 py-4 text-sm font-bold text-black transition-all hover:bg-[rgba(0,0,0,0.08)]"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="mt-12 grid grid-cols-2 gap-y-6 border-t border-[rgba(0,0,0,0.15)] pt-8 sm:mt-16 sm:flex sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-[rgba(0,0,0,0.15)]"
        >
          {[
            ["+30%",  "Average sales uplift"],
            ["1,240+","Active stores"],
            ["98.6%", "Order accuracy"],
            ["$420",  "Per month, all-in"],
          ].map(([v, l]) => (
            <div key={l} className="sm:px-6 sm:first:pl-0">
              <p className="font-display text-2xl font-extrabold text-black">{v}</p>
              <p className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-[rgba(0,0,0,0.5)]">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
