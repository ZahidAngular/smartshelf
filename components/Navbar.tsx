"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Modules",   href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing",   href: "#pricing" },
  { label: "FAQ",       href: "#faq" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // ── Scroll-spy: highlight section in view ──
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const indicator = hovered ?? active;

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.65, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-4"
    >
      {/* Gradient-border wrapper for 3D rim-light */}
      <div
        className={clsx(
          "w-full max-w-[1180px] rounded-[20px] p-px transition-all duration-500",
          scrolled
            ? "bg-gradient-to-b from-white/[0.14] to-white/[0.02] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
            : "bg-transparent shadow-none"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between gap-4 rounded-[19px] px-3 transition-all duration-500 md:px-4",
            scrolled
              ? "h-14 bg-[color:var(--bg)]/65 backdrop-blur-2xl"
              : "h-16 bg-transparent"
          )}
          style={
            scrolled
              ? { boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.3)" }
              : undefined
          }
        >
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2 pl-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[var(--brand)]/30 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/logo.png"
                alt="SmartShelf"
                width={34}
                height={34}
                priority
                className="relative h-[34px] w-[34px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
              />
            </div>
            <span className="font-display text-[1.05rem] font-extrabold leading-none tracking-tight">
              <span className="text-[var(--text)]">Smart</span>
              <span className="text-[var(--brand)]">Shelf</span>
            </span>
          </a>

          {/* Desktop nav — animated active/hover pill */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className={clsx(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  indicator === l.href ? "text-[var(--text)]" : "text-[var(--text-2)] hover:text-[var(--text)]"
                )}
              >
                {indicator === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg border border-[var(--brand)]/20 bg-[var(--brand)]/[0.08]"
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
              className="group relative hidden overflow-hidden md:inline-flex items-center gap-1.5 rounded-xl bg-[var(--brand)] px-5 py-2.5 text-xs font-bold text-black transition-all duration-200 hover:shadow-[0_10px_28px_-6px_rgba(0,201,122,0.65)] hover:-translate-y-0.5"
            >
              {/* sheen */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
