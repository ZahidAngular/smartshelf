"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { useIntroDone } from "./Preloader";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Modules",   href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing",   href: "#pricing" },
  { label: "FAQ",       href: "#faq" },
];

export function Navbar() {
  const introDone = useIntroDone();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={introDone ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.21, 0.65, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4"
    >
      <div
        className={clsx(
          "flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-500 md:px-4",
          scrolled
            ? "h-14 border border-[var(--border-up)] bg-[color:var(--bg)]/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-2xl"
            : "h-16 border border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5 pl-1">
          <div className="relative h-8 w-8 rounded-lg bg-[var(--brand)] grid place-items-center shadow-[0_0_18px_-2px_rgba(0,201,122,0.55)] transition-transform duration-300 group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="6"  width="24" height="4" rx="2" fill="#000"/>
              <rect x="4" y="14" width="24" height="4" rx="2" fill="#000" opacity="0.7"/>
              <rect x="4" y="22" width="16" height="4" rx="2" fill="#000" opacity="0.45"/>
            </svg>
          </div>
          <span className="font-display text-[1.05rem] font-extrabold leading-none tracking-tight">
            <span className="text-[var(--text)]">Smart</span>
            <span className="text-[var(--brand)]">Shelf</span>
          </span>
        </a>

        {/* Desktop nav — animated hover pill */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              className="relative px-4 py-2 text-sm font-medium text-[var(--text-2)] transition-colors duration-200 hover:text-[var(--text)]"
            >
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-[var(--bg-3)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="group hidden md:inline-flex items-center gap-1.5 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-xs font-bold text-black transition-all duration-200 hover:shadow-[0_8px_24px_-6px_rgba(0,201,122,0.6)] hover:-translate-y-0.5"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-2)] text-[var(--text-2)] md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.21, 0.65, 0.22, 1] }}
            className="absolute inset-x-4 top-[72px] rounded-2xl border border-[var(--border-up)] bg-[color:var(--bg)]/90 p-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--text-2)] transition-colors hover:bg-[var(--bg-3)] hover:text-[var(--text)]"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-bold text-black"
              >
                Let&apos;s Talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
