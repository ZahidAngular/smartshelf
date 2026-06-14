"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton, Reveal } from "./ui";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden px-2 py-20 md:py-32">
      {/* parallax photo background — always dark section regardless of theme */}
      <motion.div aria-hidden style={{ y }} className="absolute inset-[-16%_0] -z-20">
        <Image
          src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=2000&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </motion.div>
      {/* hardcoded dark overlay — never goes light with theme toggle */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#020810] via-[#040a12]/85 to-[#020810]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(56,212,255,0.14),transparent_60%)]"
      />

      <motion.div style={{ scale }} className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-5xl font-extrabold leading-[1.06] tracking-tight text-white md:text-7xl">
          {["Transform Your", "Grocery Products", "Operations Today"].map(
            (line, i) => (
              <span key={line} className="block overflow-hidden py-[0.05em]">
                <motion.span
                  initial={{ y: "115%", rotate: 2 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1,
                    delay: i * 0.13,
                    ease: [0.21, 0.65, 0.22, 1],
                  }}
                  className={`block ${i === 1 ? "text-gradient" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            )
          )}
        </h2>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Take your products and brand to a higher level — with cutting-edge
            grocery store management software that connects field reps,
            inventory, suppliers and analytics in one place.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="#pricing" className="px-9 py-4 text-base">
              See Plans &amp; Pricing
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
