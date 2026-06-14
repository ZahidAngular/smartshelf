"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui";

const navLinks = [
  { label: "Modules",   href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing",   href: "#pricing" },
  { label: "FAQ",       href: "#faq" },
  { label: "Contact",   href: "#contact" },
];

const socials = [
  {
    label: "X / Twitter",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const contact = [
  { icon: MapPin, text: "Auckland, New Zealand" },
  { icon: Mail,   text: "hello@smartshelf.co.nz" },
  { icon: Phone,  text: "+64 9 000 0000" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* top glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,201,122,0.1),transparent_60%)]"
      />

      {/* ── CTA banner ── */}
      <div className="px-6 py-16 md:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="glass inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-2">
              Ready to grow?
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-mist md:text-6xl">
              Have a project in mind?{" "}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-gradient hover:opacity-80 transition-opacity"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-8 w-8 text-brand-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-10 md:w-10" />
              </a>
            </h2>
          </div>
        </Reveal>
      </div>

      {/* ── main footer grid ── */}
      <div className="border-t border-line px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* brand col */}
          <Reveal x={-30} y={0}>
            <div className="lg:col-span-1">
              <a href="#" className="inline-flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ft-icon-g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00C97A"/>
                      <stop offset="100%" stopColor="#0D9F6E"/>
                    </linearGradient>
                  </defs>
                  <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#ft-icon-g)"/>
                  <rect x="4" y="14.5" width="24" height="3" rx="1.5" fill="url(#ft-icon-g)" opacity="0.75"/>
                  <rect x="4" y="23" width="16" height="3" rx="1.5" fill="url(#ft-icon-g)" opacity="0.45"/>
                </svg>
                <span className="font-display text-base font-extrabold leading-none tracking-tight">
                  <span className="text-gradient">Smart</span>
                  <span className="text-mist">Shelf</span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-mist-2">
                Smart FMCG operations platform for grocery suppliers, distributors and brands across NZ &amp; Australia.
              </p>
              {/* socials */}
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ svg, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="glass grid h-9 w-9 place-items-center rounded-full text-mist-2 transition-all hover:text-brand-2 hover:shadow-[0_0_16px_-4px_rgba(0,201,122,0.5)]"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* nav links */}
          <Reveal delay={0.06}>
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-mist">
                Platform
              </p>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-mist-2 transition-colors hover:text-mist"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* contact info */}
          <Reveal delay={0.1}>
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-mist">
                Contact
              </p>
              <ul className="space-y-4">
                {contact.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-2">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-mist-2">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* newsletter */}
          <Reveal delay={0.14} x={30} y={0}>
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-mist">
                Stay Updated
              </p>
              <p className="mb-4 text-sm text-mist-2">
                Get product updates and FMCG insights — no spam.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-line bg-fill px-4 py-2.5 text-sm text-mist placeholder:text-mist-2/60 outline-none transition-all focus:border-brand/50 focus:shadow-[0_0_0_3px_rgba(0,201,122,0.12)]"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-brand-2 to-brand-deep py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-line px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-mist-2 md:flex-row">
          <p>© {year} SmartShelf Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-mist">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-mist">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
