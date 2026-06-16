"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ss-theme");
      if (saved === "light") {
        document.documentElement.classList.add("light");
        setLight(true);
      }
    } catch {}
  }, []);

  function toggle() {
    const isNowLight = document.documentElement.classList.toggle("light");
    try { localStorage.setItem("ss-theme", isNowLight ? "light" : "dark"); } catch {}
    setLight(isNowLight);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] bg-[var(--bg-2)] text-[var(--text-2)] transition-all hover:border-[var(--border-brand)] hover:text-[var(--brand)]"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
