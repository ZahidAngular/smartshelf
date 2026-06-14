"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTION_IDS = [
  "hero","brands","modules","platform",
  "analytics","quote","cta","pricing","contact","faq",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

/* opacity per section — rings get softer mid-page so content breathes */
const SECTION_OPACITY: Record<SectionId, number> = {
  hero:      1,
  brands:    0.5,
  modules:   0.6,
  platform:  0.65,
  analytics: 0.7,
  quote:     0.3,
  cta:       0.4,
  pricing:   0.6,
  contact:   0.55,
  faq:       0.45,
};

export function ScrollBgGraphic() {
  const [active, setActive]   = useState<SectionId>("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        let best: { id: SectionId; ratio: number } | null = null;
        for (const e of entries) {
          const id = e.target.id as SectionId;
          if (SECTION_IDS.includes(id) && e.intersectionRatio > (best?.ratio ?? 0))
            best = { id, ratio: e.intersectionRatio };
        }
        if (best) setActive(best.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-15% 0px -15% 0px" }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();

  /* glow fades in at hero, dims for content sections */
  const glowOp = useTransform(scrollYProgress, [0, 0.12, 0.5, 1], [0.18, 0.10, 0.05, 0.04]);

  const sectionOp = SECTION_OPACITY[active];

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes sbg-cw  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes sbg-ccw { to { transform: translate(-50%,-50%) rotate(-360deg); } }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>

        {/* single deep glow — only prominent at hero */}
        <motion.div
          className="absolute left-1/2 top-[38%] h-[55vw] w-[55vw] max-h-[680px] max-w-[680px]
                     -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(0,201,122,0.55) 0%, rgba(13,159,110,0.2) 45%, transparent 70%)",
            opacity: glowOp as never,
          }}
        />

        {/* Ring 1 — outermost, very slow CW */}
        <motion.div
          animate={{ opacity: sectionOp * 0.10 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "75vw", height: "75vw",
            border: "1px solid rgba(0,201,122,0.55)",
            animation: "sbg-cw 55s linear infinite",
            backgroundImage: "none",
          }}
        />

        {/* Ring 2 — CCW, medium */}
        <motion.div
          animate={{ opacity: sectionOp * 0.13 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "55vw", height: "55vw",
            border: "1px dashed rgba(0,201,122,0.6)",
            borderSpacing: "8px",
            animation: "sbg-ccw 38s linear infinite",
          }}
        />

        {/* Ring 3 — CW, inner */}
        <motion.div
          animate={{ opacity: sectionOp * 0.15 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "36vw", height: "36vw",
            border: "1px solid rgba(0,201,122,0.45)",
            animation: "sbg-cw 26s linear infinite",
          }}
        />

        {/* Ring 4 — innermost, fastest CCW */}
        <motion.div
          animate={{ opacity: sectionOp * 0.12 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "18vw", height: "18vw",
            border: "1px dashed rgba(0,201,122,0.5)",
            animation: "sbg-ccw 18s linear infinite",
          }}
        />

      </div>
    </>
  );
}
