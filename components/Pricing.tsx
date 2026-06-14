"use client";

import { Check, Zap, Headphones, Rocket } from "lucide-react";
import { TiltCard, Reveal, SectionHeading, MagneticButton } from "./ui";

const coreFeatures = [
  "Product & SKU management",
  "Automated grocery sales orders",
  "Distribution & sales reporting",
  "Store audit toolkit",
  "Email & chat support",
];

const advancedFeatures = [
  "In-store performance analytics",
  "Category planogram management",
  "Manufacturing purchase orders",
  "Supplier collaboration hub",
  "AI-powered chatbot",
  "ERP & accounting integrations",
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-3 py-14 md:py-20">
      <div className="absolute left-1/2 top-1/4 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(43,159,230,0.09),transparent_60%)]" />

      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Choose the Plan That Fits
              <br className="hidden md:block" />{" "}
              <span className="text-gradient">Your Business Needs</span>
            </>
          }
          desc="One flexible plan that scales with your stores, reps and product lines. No hidden costs â€” cancel anytime."
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr_1fr]">
          {/* left: what you get */}
          <Reveal delay={0.05} x={-60} y={0}>
            <div className="glass flex h-full flex-col justify-center gap-6 rounded-3xl p-8">
              {[
                {
                  icon: Zap,
                  t: "Fast, friction-free onboarding",
                  d: "Your catalogue, stores and reps live within days â€” not months.",
                },
                {
                  icon: Headphones,
                  t: "Humans, not ticket queues",
                  d: "Direct line to our retail specialists whenever you need them.",
                },
                {
                  icon: Rocket,
                  t: "Built to scale with you",
                  d: "From a single territory to national distribution coverage.",
                },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-2">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-mist">{f.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mist-2">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* center: main plan */}
          <Reveal>
            <TiltCard intensity={5} className="h-full">
              <div className="glass-deep ring-glow relative h-full overflow-hidden rounded-3xl p-8 md:p-10">
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,212,255,0.18),transparent_65%)]"
                />
                <span className="inline-flex rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
                  Standard
                </span>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-6xl font-extrabold text-mist md:text-7xl">
                    $420
                  </span>
                  <span className="pb-2 text-sm text-mist-2">/ month</span>
                </div>
                <p className="mt-3 text-sm text-mist-2">
                  Everything you need to run smarter grocery sales operations.
                </p>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-mist-2">
                  Core features
                </p>
                <ul className="mt-4 space-y-3">
                  {coreFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-mist/90">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/20">
                        <Check className="h-3 w-3 text-brand-2" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <MagneticButton href="#contact" className="w-full justify-center">
                    Start with Standard
                  </MagneticButton>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* right: advanced features — always dark panel, hardcode light text */}
          <Reveal delay={0.1} x={60} y={0}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#0D5C38] to-[#051A0F] p-8 ring-1 ring-brand/30">
              <div
                aria-hidden
                className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,201,122,0.16),transparent_65%)]"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00C97A]">
                Advanced features
              </p>
              <p className="mt-3 font-display text-xl font-bold text-white">
                Power tools for serious operators
              </p>
              <ul className="mt-6 space-y-3.5">
                {advancedFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10">
                      <Check className="h-3 w-3 text-[#00C97A]" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00C97A]">
                  Priority support
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Dedicated account manager and same-day response, included for
                  every advanced workspace.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


