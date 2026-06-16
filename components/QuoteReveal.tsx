"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const quote =
  "Implementing advanced IT systems in the FMCG sector transforms operations by enhancing efficiency, fostering innovation, and maintaining a competitive edge.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block text-[var(--text)]">
      {children}
    </motion.span>
  );
}

export function QuoteReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.25"],
  });

  const words = quote.split(" ");

  return (
    <section id="quote" className="relative border-y border-[var(--border)]">
      <div className="grid lg:grid-cols-[180px_1fr]">

        {/* Left label column */}
        <div className="hidden border-r border-[var(--border)] lg:flex lg:flex-col lg:items-center lg:justify-center lg:py-20">
          <div className="rotate-180" style={{ writingMode: "vertical-rl" }}>
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.4em] text-[var(--text-2)]">
              Industry Insight
            </span>
          </div>
          <div className="mt-6 h-10 w-px bg-gradient-to-b from-[var(--brand)] to-transparent opacity-60" />
        </div>

        {/* Quote column */}
        <div ref={ref} className="px-6 py-20 md:px-12 md:py-28 lg:px-16">
          {/* Open quote */}
          <div className="mb-6 overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.21, 0.65, 0.22, 1] }}
              className="block font-display text-7xl font-extrabold leading-none text-[rgba(0,201,122,0.12)] md:text-9xl"
            >
              &ldquo;
            </motion.span>
          </div>

          <p className="font-display text-2xl font-bold leading-[1.32] tracking-[-0.02em] md:text-3xl lg:text-4xl xl:text-5xl">
            {words.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, (i + 0.8) / words.length]}
              >
                {w}
              </Word>
            ))}
          </p>

          {/* Source */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-[var(--brand)]" />
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-[var(--text-2)]">
              FMCG Industry Research
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
