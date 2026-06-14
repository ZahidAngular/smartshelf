"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // apply saved theme on first mount
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") {
        document.documentElement.classList.add("light");
        setLight(true);
      } else {
        document.documentElement.classList.remove("light");
        setLight(false);
      }
    } catch {}
    setMounted(true);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.theme = next ? "light" : "dark";
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark / light mode"
      className="glass grid h-10 w-10 place-items-center rounded-full text-brand-2 transition-all hover:scale-110 hover:shadow-[0_0_20px_-4px_var(--brand-2)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={light ? "sun" : "moon"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.21, 0.65, 0.22, 1] }}
            className="grid place-items-center"
          >
            {light ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
