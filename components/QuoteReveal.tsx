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
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.32em] inline-block text-mist"
    >
      {children}
    </motion.span>
  );
}

export function QuoteReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = quote.split(" ");

  return (
    <section id="quote" className="relative px-2 py-16 md:py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(43,159,230,0.1),transparent_70%)]"
      />
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <span className="font-display text-7xl leading-none text-brand-2/40 md:text-8xl">&ldquo;</span>
        <p className="font-display text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl">
          {words.map((w, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
