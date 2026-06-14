"use client";

import { Reveal } from "./ui";

const brands = [
  "Angel Tech",
  "HeartFelt",
  "PureHarvest",
  "Kiwi Fresh",
  "GreenGrocer Co",
  "Pantry Plus",
  "Southern Foods",
  "Alpine Dairy",
];

export function Brands() {
  return (
    <section id="brands" className="relative px-3 py-12">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-mist-2">
          Some of the esteemed brands we proudly serve
        </p>
      </Reveal>

      <div className="marquee-mask mx-auto mt-10 max-w-[1200px] overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-6">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={`${b}-${i}`}
              className="glass flex h-16 min-w-44 items-center justify-center rounded-2xl px-8 transition-colors hover:border-brand/30"
            >
              <span className="font-display text-base font-bold tracking-wide text-mist-2">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


