"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { useIntroDone } from "./Preloader";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Modules", href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const introDone = useIntroDone();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={introDone ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.21, 0.65, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={clsx(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
          scrolled ? "glass-deep ring-glow" : "bg-transparent"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          {/* shelf icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="nav-icon-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00C97A"/>
                <stop offset="100%" stopColor="#0D9F6E"/>
              </linearGradient>
            </defs>
            <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#nav-icon-g)"/>
            <rect x="4" y="14.5" width="24" height="3" rx="1.5" fill="url(#nav-icon-g)" opacity="0.75"/>
            <rect x="4" y="23" width="16" height="3" rx="1.5" fill="url(#nav-icon-g)" opacity="0.45"/>
          </svg>
          {/* wordmark */}
          <span className="font-display text-lg font-extrabold leading-none tracking-tight">
            <span className="text-gradient">Smart</span>
            <span className="text-mist">Shelf</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-mist-2 transition-colors hover:text-mist"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand-2 transition-all hover:bg-brand/20 hover:shadow-[0_0_24px_-4px_rgba(0,201,122,0.5)]"
          >
            <span className="whitespace-nowrap">Let&apos;s Talk</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
