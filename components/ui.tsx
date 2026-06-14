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

/* ---------------- 3D Tilt Card ---------------- */

export function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(140,210,255,0.14), transparent 65%)`
  );

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set((0.5 - py) * intensity * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="perspective-1200">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry }}
        className={clsx("preserve-3d relative", className)}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 36,
  x = 0,
  blur = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }}
      animate={inView ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, delay, ease: [0.21, 0.65, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Scroll-linked 3D rise (whole-section drama) ---------------- */

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
    offset: ["start 0.95", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={ref} className="perspective-1200">
      <motion.div
        style={{ scale, rotateX, opacity, transformOrigin: "center 80%" }}
        className={clsx("preserve-3d", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------- Section heading ---------------- */

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
    <div
      className={clsx(
        "mb-14 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <Reveal>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-2 shadow-[0_0_12px_2px_rgba(56,212,255,0.8)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-mist md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-mist-2 md:text-lg">
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Magnetic Button ---------------- */

export function MagneticButton({
  children,
  className,
  href = "#contact",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-shadow",
        "bg-gradient-to-r from-brand-2 via-brand to-brand-deep bg-[length:200%_100%] bg-left hover:bg-right",
        "shadow-[0_12px_40px_-10px_rgba(0,201,122,0.55)] [transition:background-position_.6s_ease,box-shadow_.3s]",
        className
      )}
    >
      {children}
    </motion.a>
  );
}
