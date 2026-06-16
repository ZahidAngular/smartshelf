"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What is SmartShelf and how can it benefit my business?",
    a: "SmartShelf is an all-in-one grocery sales operations platform for FMCG suppliers and distributors. It automates sales orders, store audits, purchase orders and in-store analytics — so your team spends less time on admin and more time growing distribution and sales.",
  },
  {
    q: "Can SmartShelf integrate with my existing systems?",
    a: "Yes. SmartShelf connects with popular ERP, accounting and inventory systems out of the box, and our team can build custom integrations for your existing stack so data flows automatically with no double entry.",
  },
  {
    q: "How does SmartShelf improve sales and field-rep management?",
    a: "Reps capture orders and audits on the spot, while managers see live dashboards of every store and territory. Clients have reported up to a 30% increase in sales simply by knowing where in-field focus is best placed.",
  },
  {
    q: "Is SmartShelf suitable for growing businesses?",
    a: "Absolutely. The platform scales from a single territory to national coverage — add reps, stores and product lines anytime, and only pay for what you use.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" className="relative">
      {/* Header bar */}
      <div className="border-b border-[var(--border)] px-6 py-12 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="tag">FAQ</span>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-[var(--text)] md:text-5xl">
              Got Questions?
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-[var(--text-2)] md:block">
            Everything you need to know about SmartShelf.
          </p>
        </div>
      </div>

      {/* Side-by-side FAQ layout */}
      <div ref={ref} className="grid lg:grid-cols-[1fr_1fr] divide-x-0 lg:divide-x divide-[var(--border)]">

        {/* Question list — left */}
        <div className="divide-y divide-[var(--border)]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.button
                key={f.q}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.21, 0.65, 0.22, 1] }}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-start justify-between gap-4 px-6 py-8 text-left transition-colors md:px-12 lg:px-12 ${
                  isOpen ? "bg-[var(--bg-2)]" : "hover:bg-[var(--bg-2)]"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-sm font-bold tabular-nums text-[var(--text-2)] mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-display text-base font-bold leading-snug md:text-lg ${
                    isOpen ? "text-[var(--brand)]" : "text-[var(--text)]"
                  }`}>
                    {f.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-1 h-6 w-6 shrink-0 rounded-md grid place-items-center border transition-colors ${
                    isOpen
                      ? "border-[var(--brand)] bg-[rgba(0,201,122,0.1)] text-[var(--brand)]"
                      : "border-[var(--border)] text-[var(--text-2)]"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Answer panel — right (desktop) / accordion (mobile) */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-12">
          <AnimatePresence mode="wait">
            {open !== null && (
              <motion.div
                key={open}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.21, 0.65, 0.22, 1] }}
              >
                <span className="tag mb-6 inline-flex">Answer</span>
                <p className="text-base leading-relaxed text-[var(--text-2)] md:text-lg">
                  {faqs[open].a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile accordion answers */}
        <div className="lg:hidden divide-y divide-[var(--border)]">
          {faqs.map((f, i) => (
            <AnimatePresence key={f.q} initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.65, 0.22, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 py-6 text-sm leading-relaxed text-[var(--text-2)]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
}
