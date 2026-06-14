"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, BarChart3, Boxes, PackageCheck } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* Intro context — sections wait for the preloader before animating */
const IntroContext = createContext(false);
export const useIntroDone = () => useContext(IntroContext);

const word = "SMARTSHELF";
const boxes = [ShoppingBasket, Boxes, BarChart3, PackageCheck];
const easeOut = [0.21, 0.65, 0.22, 1] as const;
const easeSplit = [0.83, 0, 0.17, 1] as const;

export function IntroProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 2200;

    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 450);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <IntroContext.Provider value={done}>
      <AnimatePresence>
        {!done && (
          <div key="preloader" className="fixed inset-0 z-[100]">
            {/* top & bottom shutters — split open like a shelf */}
            <motion.div
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: easeSplit }}
              className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            />
            <motion.div
              exit={{ y: "100%" }}
              transition={{ duration: 1, ease: easeSplit }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            />
            {/* glowing seam revealed at the split */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: count >= 99 ? 1 : 0, opacity: count >= 99 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-2 to-transparent shadow-[0_0_24px_2px_var(--brand-2)]"
            />

            {/* content layer */}
            <motion.div
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* ambient glow */}
              <div
                aria-hidden
                className="glow-blob absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
              />

              {/* product boxes drop onto the shelf */}
              <div className="relative flex items-end gap-3 md:gap-4">
                {boxes.map((Icon, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: -140, opacity: 0, rotate: i % 2 ? 10 : -10 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 17,
                      delay: 0.25 + i * 0.18,
                    }}
                    className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-2 to-brand-deep shadow-[0_14px_36px_-10px_var(--brand)] md:h-16 md:w-16 md:rounded-2xl"
                  >
                    <Icon className="h-5 w-5 text-white md:h-7 md:w-7" strokeWidth={2.2} />
                  </motion.span>
                ))}
              </div>

              {/* the shelf — slides in under the boxes */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
                className="mt-3 h-1.5 w-64 origin-center rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand-2 shadow-[0_8px_30px_-6px_var(--brand)] md:w-80"
              />
              {/* shelf reflection */}
              <div className="h-10 w-56 bg-gradient-to-b from-brand/15 to-transparent [mask-image:linear-gradient(black,transparent)] md:w-72" />

              {/* logo letters */}
              <div className="mt-2 flex overflow-hidden">
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.9 + i * 0.045,
                      ease: easeOut,
                    }}
                    className={`font-display text-3xl font-extrabold tracking-tight md:text-5xl ${
                      i >= 5 ? "text-gradient" : "text-mist"
                    }`}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-mist-2"
              >
                Stacking your shelf…
              </motion.p>

              {/* counter bottom-right */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 right-8 font-display text-6xl font-extrabold tabular-nums text-mist/15 md:bottom-12 md:right-14 md:text-8xl"
              >
                {count}
                <span className="text-3xl text-brand-2/50 md:text-5xl">%</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-mist-2/70 md:bottom-14 md:left-14"
              >
                Smart FMCG Operations
              </motion.p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}
