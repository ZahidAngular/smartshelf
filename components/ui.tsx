"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import clsx from "clsx";

const ease = [0.21, 0.65, 0.22, 1] as const;

/* ── Scroll Reveal ── */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D Tilt Card (hard shadow depth, no glare) ── */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const shadowX = useTransform(sry, [-intensity * 2, intensity * 2], ["-8px", "8px"]);
  const shadowY = useTransform(srx, [-intensity * 2, intensity * 2], ["8px", "-8px"]);
  const shadowBlur = useTransform(
    [srx, sry] as never,
    ([rx, ry]: number[]) => `${24 + Math.abs(rx) + Math.abs(ry)}px`
  );

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
  }

  function onLeave() { rx.set(0); ry.set(0); }

  return (
    <div className="perspective-1400">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: srx,
          rotateY: sry,
          boxShadow: useTransform(
            [shadowX, shadowY, shadowBlur],
            ([x, y, b]) => `${x} ${y} ${b} -4px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,201,122,0.0)`
          ) as never,
        }}
        className={clsx("preserve-3d relative transition-[box-shadow]", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Section Label (eyebrow tag) ── */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="tag">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      {children}
    </span>
  );
}

/* ── Section Heading ── */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={clsx("mb-14", align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl")}>
      <Reveal>
        <SectionLabel>{eyebrow}</SectionLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-[var(--text)] md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Primary Button ── */
export function MagneticButton({
  children,
  className,
  href = "#contact",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={clsx("btn btn-primary", className)}
    >
      {children}
    </motion.a>
  );
}

/* ── Ghost Button ── */
export function GhostButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={clsx("btn btn-ghost", className)}
    >
      {children}
    </motion.a>
  );
}

/* ── Scroll Stage (3D enter effect) ── */
export function ScrollStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.3"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);

  return (
    <div ref={ref} className="perspective-1400">
      <motion.div
        style={{ scale, rotateX, opacity, transformOrigin: "center 80%" }}
        className={clsx("preserve-3d", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
