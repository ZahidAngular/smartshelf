"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.opacity = "0";
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.backgroundColor = "rgba(0,201,122,0.06)";
      ring.style.borderColor = "rgba(0,201,122,0.8)";
    };

    const onLeave = () => {
      dot.style.opacity = "1";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.backgroundColor = "transparent";
      ring.style.borderColor = "rgba(0,201,122,0.3)";
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    const addListeners = () => {
      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    if ("ontouchstart" in window) {
      dot.style.display = "none";
      ring.style.display = "none";
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#00C97A]"
        style={{ willChange: "transform", transition: "opacity 0.15s" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-[rgba(0,201,122,0.3)]"
        style={{ willChange: "transform", transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s" }}
      />
    </>
  );
}
