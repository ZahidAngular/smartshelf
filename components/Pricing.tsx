"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const coreFeatures = [
  "Product & SKU management",
  "Automated grocery sales orders",
  "Distribution & sales reporting",
  "Store audit toolkit",
  "Email & chat support",
];

const advancedFeatures = [
  "In-store performance analytics",
  "Category planogram management",
  "Manufacturing purchase orders",
  "Supplier collaboration hub",
  "AI-powered chatbot",
  "ERP & accounting integrations",
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pricing" className="relative">
      {/* Header */}
      <div className="border-b border-[var(--border)] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="tag">Pricing</span>
            <h2 className="mt-5 font-display text-5xl font-extrabold tracking-tight text-[var(--text)] md:text-6xl">
              One Plan.<br />
              <span className="text-[var(--brand)]">Zero Surprises.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--text-2)]">
            No hidden costs. No long-term lock-ins. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Pricing content */}
      <div ref={ref} className="grid border-b border-[var(--border)] lg:grid-cols-[1fr_1px_1fr]">

        {/* Left: price + core features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.21, 0.65, 0.22, 1] }}
          className="px-6 py-16 md:px-12 md:py-20 lg:px-16"
        >
          <span className="tag">Standard Plan</span>

          {/* Price */}
          <div className="mt-8 flex items-end gap-2">
            <span className="font-display text-8xl font-extrabold leading-none tracking-tight text-[var(--text)]">
              $420
            </span>
            <span className="mb-3 text-sm text-[var(--text-2)]">/ month</span>
          </div>
          <p className="mt-3 text-sm text-[var(--text-2)]">
            Everything you need to run smarter grocery sales operations.
          </p>

          <a href="#contact" className="btn btn-primary mt-8">
            Start with Standard <ArrowRight className="h-4 w-4" />
          </a>

          {/* Core features */}
          <div className="mt-10 border-t border-[var(--border)] pt-10">
            <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--text-2)]">
              Core features included
            </p>
            <ul className="space-y-3.5">
              {coreFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[var(--text)]">
                  <div className="h-4 w-4 shrink-0 rounded border border-[var(--brand)] grid place-items-center">
                    <Check className="h-2.5 w-2.5 text-[var(--brand)]" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden bg-[var(--border)] lg:block" />

        {/* Right: advanced features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.21, 0.65, 0.22, 1] }}
          className="border-t border-[var(--border)] px-6 py-12 md:px-12 lg:border-t-0 lg:px-16"
        >
          <span className="tag">Advanced Features</span>
          <p className="mt-5 font-display text-2xl font-extrabold text-[var(--text)]">
            Power tools for serious operators
          </p>
          <p className="mt-3 text-sm text-[var(--text-2)]">
            These modules extend the Standard plan for larger operations.
          </p>

          <ul className="mt-8 space-y-4">
            {advancedFeatures.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.21, 0.65, 0.22, 1] }}
                className="flex items-center gap-3 border-b border-[var(--border)] pb-4 text-sm text-[var(--text-2)] last:border-0 last:pb-0"
              >
                <div className="h-4 w-4 shrink-0 rounded border border-[rgba(0,201,122,0.3)] bg-[rgba(0,201,122,0.06)] grid place-items-center">
                  <Check className="h-2.5 w-2.5 text-[var(--brand)]" strokeWidth={3} />
                </div>
                {f}
              </motion.li>
            ))}
          </ul>

          {/* Priority support note */}
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-5">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">Priority Support</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
              Dedicated account manager and same-day response, included for every advanced workspace.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
