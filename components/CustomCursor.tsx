"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  /* dot follows mouse exactly */
  const dotX = useSpring(mx, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(my, { stiffness: 1000, damping: 50 });

  /* ring lags behind — gives the premium trailing feel */
  const ringX = useSpring(mx, { stiffness: 120, damping: 22 });
  const ringY = useSpring(my, { stiffness: 120, damping: 22 });

  useEffect(() => {
    setMounted(true);
    /* detect theme */
    const checkTheme = () =>
      setIsLight(document.documentElement.classList.contains("light"));
    checkTheme();
    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    /* attach hover to all interactive elements */
    const addHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, label, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, [mx, my, visible]);

  if (!mounted) return null;

  return (
    <>
      {/* outer ring — lags, scales on hover */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:   hovered ? 48 : clicked ? 20 : 36,
          height:  hovered ? 48 : clicked ? 20 : 36,
          opacity: visible ? 1 : 0,
          borderColor: hovered
            ? "rgba(0,201,122,0.9)"
            : isLight
            ? "rgba(13,159,110,0.6)"
            : "rgba(0,201,122,0.5)",
          backgroundColor: hovered
            ? "rgba(0,201,122,0.08)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2"
      />

      {/* inner dot — sharp, instant */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  hovered ? 6 : clicked ? 10 : 7,
          height: hovered ? 6 : clicked ? 10 : 7,
          opacity: visible ? 1 : 0,
          backgroundColor: hovered ? "#00C97A" : isLight ? "#0A2118" : "#ffffff",
          boxShadow: hovered
            ? "0 0 12px 3px rgba(0,201,122,0.7)"
            : isLight
            ? "0 0 6px 1px rgba(10,33,24,0.3)"
            : "0 0 6px 1px rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
      />
    </>
  );
}
