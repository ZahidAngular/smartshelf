"use client";

import { motion } from "framer-motion";
import {
  Factory,
  Activity,
  LayoutPanelTop,
  Handshake,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { TiltCard, SectionHeading } from "./ui";
import clsx from "clsx";

const modules = [
  {
    icon: Factory,
    title: "Manufacturing Purchase Orders",
    desc: "Streamline your inventory with outstanding purchase order features  -automated procurement, cost & waste reduction and supplier management in one flow.",
    points: ["Automated procurement", "Cost & waste reduction", "Supplier management"],
    span: "lg:col-span-2",
    featured: true,
  },
  {
    icon: Activity,
    title: "In-Store Performance Analytics",
    desc: "Real-time data feeds that pinpoint exactly which stores, products and promotions are winning  -and where the opportunities hide.",
    points: ["Real-time monitoring", "Competitor benchmarking", "Opportunity spotting"],
    span: "",
  },
  {
    icon: LayoutPanelTop,
    title: "Category Planogram Tools",
    desc: "Optimise every shelf with category planogram management  -substantiated placements that lift visibility and protect promotional space.",
    points: ["Greater shelf visibility", "Performance-promoted placement", "Optimised category profitability"],
    span: "",
  },
  {
    icon: Handshake,
    title: "Supplier Collaboration",
    desc: "Ensure your partnerships run smoothly through one collaborative hub  -shared forecasts, order visibility and faster supplier responses.",
    points: ["Shared dashboards", "Faster turnaround"],
    span: "",
  },
  {
    icon: Bot,
    title: "AI-Powered Chatbot",
    desc: "An intelligent assistant for reps in the field  -instant answers on stock, pricing and orders, trained on your own product data.",
    points: ["24/7 field support", "Trained on your catalogue"],
    span: "",
  },
];

export function Modules() {
  return (
    <section id="platform" className="relative px-3 py-14 md:py-20">
      <div className="absolute left-1/2 top-0 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(43,159,230,0.08),transparent_60%)]" />

      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="And There's More"
          title={
            <>
              More Power on
              <br className="hidden md:block" />{" "}
              <span className="text-gradient">Every Shelf</span>
            </>
          }
          desc="From automated procurement to AI-powered insight - purpose-built modules that turn FMCG complexity into a competitive edge."
        />

        <div className="perspective-1200 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 70, rotateX: 24, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: (i % 3) * 0.12,
                ease: [0.21, 0.65, 0.22, 1],
              }}
              style={{ transformOrigin: "center 100%" }}
              className={clsx("preserve-3d", m.span)}
            >
              <TiltCard intensity={7} className="h-full">
                <div
                  className={clsx(
                    "group relative h-full overflow-hidden rounded-3xl p-7 transition-shadow duration-500 hover:ring-glow",
                    m.featured ? "glass-deep ring-glow" : "glass"
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(56,212,255,0.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-2 to-brand-deep shadow-[0_10px_30px_-8px_rgba(56,212,255,0.55)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <m.icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-mist">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-2">
                    {m.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-mist/90">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-2" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


