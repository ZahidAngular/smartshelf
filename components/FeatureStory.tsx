"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Boxes, ClipboardCheck, BarChart3, SearchCheck, CheckCircle2, type LucideIcon } from "lucide-react";

type Story = {
  icon: LucideIcon;
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  img: string;
  stat: [string, string];
  accent: string;
};

const stories: Story[] = [
  {
    icon: Boxes,
    num: "01",
    eyebrow: "Product Management",
    title: "Your Entire Product Library, One Hub",
    desc: "Manage SKUs, brand and outsourced product details, pricing and barcodes from one comprehensive hub.",
    points: ["Comprehensive product library", "Track freight estimates", "Monitor pricing margins", "Customise trade spending"],
    img: "/images/shelf-01-fixed.jpg",
    stat: ["5,000+", "SKUs managed"],
    accent: "#00C97A",
  },
  {
    icon: ClipboardCheck,
    num: "02",
    eyebrow: "Automated Sales Orders",
    title: "Zero Manual Entry. Zero Errors.",
    desc: "Field reps raise perfect orders on the spot and push them straight into your systems — no re-keying, no mistakes.",
    points: ["Replace manual entry entirely", "Eliminate ordering errors", "Supplier article numbers auto-filled", "ERP & accounting integration"],
    img: "/images/shelf-02-fixed.jpg",
    stat: ["98.6%", "Order accuracy"],
    accent: "#60A5FA",
  },
  {
    icon: BarChart3,
    num: "03",
    eyebrow: "Distribution & Reporting",
    title: "Total Visibility Across Every Store",
    desc: "See your sales by individual store, banner group, territory and product — know exactly where focus pays off.",
    points: ["Individual store reports", "Grocery banner sales reports", "Territory distribution reports", "Promoted vs. baseline reports"],
    img: "/images/shelf-03-fixed.jpg",
    stat: ["+30%", "Sales uplift"],
    accent: "#F59E0B",
  },
  {
    icon: SearchCheck,
    num: "04",
    eyebrow: "Store Audits",
    title: "Photo-Verified Shelf Compliance",
    desc: "Reps capture facings, gaps, pricing and competitor moves in minutes — with photo proof automatically attached.",
    points: ["Gap flagged instantly", "Photo-verified shelf checks", "Guided audit flows", "Competitor move tracking"],
    img: "/images/shelf-04-fixed.jpg",
    stat: ["1,240+", "Audits per month"],
    accent: "#A78BFA",
  },
];

/* ── Single sticky panel ────────────────────────────────── */
function StickyPanel({ s, index, total }: { s: Story; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Slide up from below as we scroll into view
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  // Slight scale on the image for depth
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ y: index === 0 ? 0 : y }}
        className="relative h-full w-full"
      >
        {/* Full-bleed image */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image
            src={s.img}
            alt={s.eyebrow}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={index === 0}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent" />
        {/* Brand tint */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${s.accent}10 0%, transparent 45%)` }} />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_160px_50px_rgba(0,0,0,0.35)]" />

        {/* Top-left number */}
        <div className="absolute top-8 right-8 font-display text-[8rem] font-extrabold leading-none text-white/[0.04] select-none md:text-[14rem]">
          {s.num}
        </div>

        {/* Content — structured glass panel, bottom left */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.65, 0.22, 1] }}
              className="relative max-w-2xl overflow-hidden rounded-2xl border border-white/25 bg-black/50 p-7 backdrop-blur-2xl md:p-9"
              style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.12), 0 24px 60px -12px rgba(0,0,0,0.7)" }}
            >
              {/* Accent top line */}
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />

              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${s.accent}1f`, border: `1px solid ${s.accent}45` }}
                >
                  <s.icon className="h-4.5 w-4.5" style={{ color: s.accent }} strokeWidth={2.2} />
                </div>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.3em]" style={{ color: s.accent }}>
                  {s.eyebrow}
                </span>
              </div>

              {/* Heading + stat row */}
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-[2.8rem]">
                  {s.title}
                </h3>
                <div className="text-right">
                  <div className="font-display text-4xl font-extrabold leading-none md:text-5xl" style={{ color: s.accent }}>
                    {s.stat[0]}
                  </div>
                  <div className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/40">
                    {s.stat[1]}
                  </div>
                </div>
              </div>

              {/* Desc */}
              <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-[0.95rem]">
                {s.desc}
              </p>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-white/[0.08]" />

              {/* Bullet points — clean 2-col grid */}
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[0.82rem] leading-snug text-white/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: s.accent }} strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom rounded edge so next section peeks */}
        {!isLast && (
          <div className="absolute inset-x-0 bottom-0 h-8 bg-transparent" />
        )}

        {/* Section number pill — top left */}
        <div className="absolute left-6 top-8 md:left-12 lg:left-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/50 backdrop-blur-sm">
            {s.num} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section wrapper ────────────────────────────────────── */
export function FeatureStory() {
  return (
    <section id="modules" className="relative">
      {/* Section header — above sticky panels */}
      <div className="relative z-0 border-y border-[var(--border)] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1280px] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="tag inline-flex mb-5">Core Modules</span>
            <h2 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-[var(--text)] md:text-6xl">
              Everything You Need<br />
              <span className="text-[var(--brand)]">In the Field</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--text-2)]">
            Four purpose-built modules covering the full grocery sales operation cycle — from product to shelf.
          </p>
        </div>
      </div>

      {/* Sticky panels stack */}
      <div className="relative" style={{ height: `${stories.length * 100}vh` }}>
        {stories.map((s, i) => (
          <StickyPanel key={s.title} s={s} index={i} total={stories.length} />
        ))}
      </div>
    </section>
  );
}
