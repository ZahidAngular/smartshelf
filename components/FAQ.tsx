"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import clsx from "clsx";

const faqs = [
  {
    q: "What is SmartShelf software, and how can it benefit my business?",
    a: "SmartShelf is an all-in-one grocery sales operations platform for FMCG suppliers and distributors. It automates sales orders, store audits, purchase orders and in-store analytics â€” so your team spends less time on admin and more time growing distribution and sales.",
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
    a: "Absolutely. The platform scales from a single territory to national coverage â€” add reps, stores and product lines anytime, and only pay for what you use.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-3 py-14">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked <span className="text-gradient">Questions</span>
            </>
          }
        />

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div
                  className={clsx(
                    "overflow-hidden rounded-2xl transition-all duration-300",
                    isOpen ? "glass-deep ring-glow" : "glass"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-mist md:text-lg">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={clsx(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors",
                        isOpen ? "bg-brand text-white" : "bg-fill text-brand-2"
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.65, 0.22, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-mist-2 md:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


