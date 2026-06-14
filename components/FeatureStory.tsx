"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  Boxes,
  ClipboardCheck,
  BarChart3,
  SearchCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./ui";
import clsx from "clsx";

/* ---------- scroll-parallax image with clip reveal ---------- */

function ParallaxImage({
  src,
  alt,
  chip,
}: {
  src: string;
  alt: string;
  chip: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["inset(12% 8% 12% 8% round 32px)", "inset(0% 0% 0% 0% round 32px)"]
  );

  return (
    <motion.div
      ref={ref}
      style={{ clipPath: clip }}
      className="group ring-glow relative aspect-[4/3] overflow-hidden rounded-[2rem]"
    >
      <motion.div style={{ y }} className="absolute inset-[-14%_0]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
      <div className="absolute bottom-5 left-5">{chip}</div>
    </motion.div>
  );
}

/* ---------- content ---------- */

type Story = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  img: string;
  alt: string;
  stat: [string, string];
};

const stories: Story[] = [
  {
    icon: Boxes,
    eyebrow: "Module 01",
    title: "Product Management",
    desc: "Smart FMCG and grocery sales management software for products in the FMCG sector â€” manage SKUs, brand and outsourced product details, pricing and barcodes from one comprehensive hub.",
    points: [
      "Manage your comprehensive product library",
      "Track inbound and outbound freight estimates",
      "Monitor pricing margins across every line",
      "Customise trade spending in seconds",
    ],
    img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&q=80&auto=format&fit=crop",
    alt: "Grocery store shelves stocked with products",
    stat: ["5,000+", "SKUs managed per workspace"],
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Module 02",
    title: "Automated Grocery Sales Orders",
    desc: "Say goodbye to manual order management. Our cloud-based platform lets field reps raise perfect orders on the spot and push them straight into your systems â€” no re-keying, no errors.",
    points: [
      "Replace manual entry entirely",
      "Eliminate ordering errors",
      "Provide supplier article numbers automatically",
      "Integrate with your ERP & accounting stack",
    ],
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1600&q=80&auto=format&fit=crop",
    alt: "Retail worker processing an order on a tablet",
    stat: ["98.6%", "first-pass order accuracy"],
  },
  {
    icon: BarChart3,
    eyebrow: "Module 03",
    title: "Grocery Distribution & Sales Reporting",
    desc: "Our Sales Reporting Module provides total transparency: see your sales by individual store, banner group, territory and product â€” and know exactly where in-field focus pays off.",
    points: [
      "Individual store reports â€” line-by-line performance",
      "Grocery banner sales reports across the network",
      "Areas & territory distribution reports",
      "Sales product reports, promoted vs. baseline",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    alt: "Analytics dashboard with sales charts on a laptop",
    stat: ["+30%", "sales uplift reported by clients"],
  },
  {
    icon: SearchCheck,
    eyebrow: "Module 04",
    title: "Grocery Store Audits",
    desc: "Our customisable software monitors and analyses brand presence and shelving compliance â€” reps capture facings, gaps, pricing and competitor moves in minutes, with photo proof attached.",
    points: [
      "If your friendly rep spots a gap, the system flags it instantly",
      "Photo-verified shelf & compliance checks",
      "Faster store visits with guided audit flows",
    ],
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80&auto=format&fit=crop",
    alt: "Person auditing products in a grocery store aisle",
    stat: ["1,240+", "store audits every month"],
  },
];

/* ---------- section ---------- */

export function FeatureStory() {
  return (
    <section id="modules" className="relative px-3 py-14 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 md:gap-24">
        {stories.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={s.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* image */}
              <div className={clsx(flip && "lg:order-2")}>
                <ParallaxImage
                  src={s.img}
                  alt={s.alt}
                  chip={
                    <div className="glass-deep ring-glow rounded-2xl px-5 py-3.5">
                      <p className="font-display text-2xl font-extrabold text-gradient">
                        {s.stat[0]}
                      </p>
                      <p className="text-[11px] uppercase tracking-wider text-mist-2">
                        {s.stat[1]}
                      </p>
                    </div>
                  }
                />
              </div>

              {/* copy */}
              <div className={clsx("relative", flip && "lg:order-1")}>
                {/* giant outlined index */}
                <span
                  aria-hidden
                  className="text-outline pointer-events-none absolute -top-14 right-0 -z-10 font-display text-[7rem] font-extrabold leading-none opacity-70 md:-top-20 md:text-[11rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Reveal>
                  <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-2">
                    <s.icon className="h-3.5 w-3.5" />
                    {s.eyebrow}
                  </span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h3 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight text-mist md:text-5xl">
                    {s.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-5 text-base leading-relaxed text-mist-2">
                    {s.desc}
                  </p>
                </Reveal>
                <ul className="mt-7 space-y-3.5">
                  {s.points.map((p, j) => (
                    <Reveal key={p} delay={0.2 + j * 0.07}>
                      <li className="flex items-start gap-3 text-sm text-mist/90 md:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-2" />
                        {p}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


