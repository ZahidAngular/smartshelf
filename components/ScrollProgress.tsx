"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed left-0 top-0 z-[100] h-full w-[2px] hidden lg:block">
      {/* Track */}
      <div className="h-full w-full bg-[rgba(255,255,255,0.04)]" />
      {/* Progress */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top bg-[var(--brand)]"
        style={{ scaleY }}
      />
    </div>
  );
}
