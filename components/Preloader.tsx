"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ── Context ─────────────────────────────────────────── */
const IntroContext = createContext(false);
export const useIntroDone = () => useContext(IntroContext);

export const IntroProvider = Preloader;

export function Preloader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    const raf = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(raf);
      else {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => setShow(false), 800);
        }, 300);
      }
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <IntroContext.Provider value={done}>
      <AnimatePresence>
        {show && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />

            {/* Center content */}
            <div className="relative flex flex-col items-center gap-8">
              {/* Logo mark */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.21, 0.65, 0.22, 1] }}
                className="grid h-16 w-16 place-items-center drop-shadow-[0_0_40px_rgba(0,201,122,0.6)]"
              >
                <Image src="/logo.png" alt="SmartShelf" width={64} height={64} priority className="h-16 w-16" />
              </motion.div>

              {/* Word mark */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-none"
                >
                  <span className="text-white">Smart</span>
                  <span className="text-[#00C97A]">Shelf</span>
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/30"
              >
                FMCG Operations Platform
              </motion.p>
            </div>

            {/* Progress bar — bottom */}
            <div className="absolute bottom-0 inset-x-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 right-8 font-display text-[0.65rem] font-bold tabular-nums text-white/25"
              >
                {String(progress).padStart(3, "0")}
              </motion.div>

              <div className="h-px w-full bg-white/[0.06]">
                <motion.div
                  className="h-full bg-[#00C97A]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-8 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/20"
            >
              NZ &amp; AU
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}
