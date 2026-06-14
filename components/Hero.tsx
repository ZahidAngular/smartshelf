"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import {
  TrendingUp,
  PackageCheck,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";
import { MagneticButton } from "./ui";
import { useIntroDone } from "./Preloader";

const ease = [0.21, 0.65, 0.22, 1] as const;
const headline = ["Improve Your Grocery", "Sales Results"];

export function Hero() {
  const introDone = useIntroDone();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg    = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yCard  = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotDash = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const rotY = useTransform(smx, [-0.5, 0.5], [-7, 7]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      id="hero"
      className="relative overflow-hidden px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28 lg:px-16 lg:pt-36 lg:pb-32"
    >
      {/* ambient background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-blob absolute left-[30%] top-[-10%] h-[56rem] w-[56rem] -translate-x-1/2 rounded-full opacity-60" />
        <div className="glow-blob absolute right-[10%] top-[20%] h-[32rem] w-[32rem] rounded-full blur-3xl opacity-40" />
      </motion.div>

      {/* ── 2-column layout ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >

        {/* ── LEFT: copy ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={introDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-2">
              <Sparkles className="h-3.5 w-3.5" />
              Smart FMCG Operations Platform
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-mist sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.05em]">
                <motion.span
                  initial={{ y: "110%", rotate: 2 }}
                  animate={introDone ? { y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.95, delay: 0.08 + i * 0.13, ease }}
                  className={`block ${i === 0 ? "text-gradient" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.42, ease }}
            className="mt-6 max-w-lg text-base leading-relaxed text-mist-2 md:text-lg"
          >
            Transform your operations with smart inventory, automated sales
            orders and retail-ready management software — built for grocery
            suppliers, distributors and FMCG brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.58, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact">
              Get Started Today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <a
              href="#modules"
              className="glass group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-mist transition-all hover:border-brand/40 hover:shadow-[0_0_30px_-8px_rgba(0,201,122,0.4)]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/20">
                <Play className="h-3 w-3 fill-brand-2 text-brand-2" />
              </span>
              Explore Modules
            </a>
          </motion.div>

          {/* trust stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.78, ease }}
            className="mt-10 flex flex-wrap gap-8 border-t border-line pt-8"
          >
            {[
              ["+30%", "Sales uplift"],
              ["1,240+", "Stores served"],
              ["98.6%", "Order accuracy"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-extrabold text-gradient">{v}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-mist-2">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: dashboard card ── */}
        <motion.div
          style={{ y: yCard }}
          className="perspective-1200 relative hidden lg:block"
        >
          {/* conic glow behind panel */}
          <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[85%] w-[85%] -translate-y-1/2">
            <div className="animate-spin-slower h-full w-full rounded-full bg-[conic-gradient(from_0deg,transparent_0%,var(--brand)_18%,transparent_36%,var(--brand-2)_60%,transparent_78%)] opacity-20 blur-3xl" />
          </div>

          <motion.div
            style={{ rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, y: 60, rotateX: 18 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="preserve-3d relative"
          >
            <motion.div style={{ rotateX: rotDash }} className="preserve-3d">
              {/* dashboard panel */}
              <div className="glass-deep ring-glow relative rounded-3xl p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-2">
                      Live Sales Performance
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-mist">
                      In-Field Dashboard
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                </div>

                {/* bars */}
                <div className="relative">
                  <div className="flex h-40 items-end gap-2 md:h-48 md:gap-3">
                    {[38, 52, 44, 66, 58, 74, 62, 86, 78, 95, 84, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={introDone ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.0 + i * 0.055, ease }}
                        style={{ height: `${h}%` }}
                        className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-brand-deep/40 via-brand/60 to-brand-2/90 shadow-[0_0_14px_-4px_rgba(0,201,122,0.5)]"
                      />
                    ))}
                  </div>
                  {/* sparkline */}
                  <svg
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <motion.path
                      d="M10,160 C70,140 90,150 140,120 C190,90 210,118 260,92 C310,66 330,90 380,58 C430,30 460,52 510,28 C540,14 570,18 592,8"
                      fill="none" stroke="url(#spark2)" strokeWidth="3" strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={introDone ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.5, delay: 1.45, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="spark2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--brand-deep)" />
                        <stop offset="60%" stopColor="var(--brand-2)" />
                        <stop offset="100%" stopColor="#fff" />
                      </linearGradient>
                    </defs>
                    <motion.circle r="5" cx="592" cy="8" fill="var(--brand-2)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={introDone ? { scale: [0, 1.6, 1], opacity: 1 } : {}}
                      transition={{ duration: 0.45, delay: 2.9 }}
                    />
                  </svg>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {[["+30%", "Sales Uplift"],["1,240","Stores Audited"],["98.6%","Order Accuracy"]].map(([v,l],i)=>(
                    <motion.div key={l}
                      initial={{ opacity: 0, y: 12 }}
                      animate={introDone ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.65 + i * 0.11, ease }}
                    >
                      <p className="font-display text-xl font-bold text-gradient md:text-2xl">{v}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-mist-2">{l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* floating chips */}
              <motion.div
                initial={{ opacity: 0, x: -36 }}
                animate={introDone ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.85, delay: 1.9, ease }}
                className="absolute top-[52%] -left-4 -translate-x-full"
              >
                <div className="animate-float glass-deep ring-glow flex items-center gap-3 rounded-2xl px-4 py-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-2 to-brand-deep">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-mist">+30% Sales</p>
                    <p className="text-xs text-mist-2">via smart reporting</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 36 }}
                animate={introDone ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.85, delay: 2.05, ease }}
                className="absolute top-[10%] -right-4 translate-x-full"
              >
                <div className="animate-float-delay glass-deep ring-glow flex items-center gap-3 rounded-2xl px-4 py-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-deep">
                    <PackageCheck className="h-4 w-4 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-mist">Auto Orders</p>
                    <p className="text-xs text-mist-2">zero manual entry</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}
