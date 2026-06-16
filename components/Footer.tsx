"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Modules",   href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing",   href: "#pricing" },
  { label: "FAQ",       href: "#faq" },
  { label: "Contact",   href: "#contact" },
];

const socials = [
  { label: "X",         href: "#", icon: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: "LinkedIn",  href: "#", icon: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Instagram", href: "#", icon: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)]">

      {/* Big CTA row */}
      <div className="flex flex-col gap-6 border-b border-[var(--border)] px-6 py-14 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
        <div>
          <span className="tag mb-4 inline-flex">Have a project in mind?</span>
          <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-[var(--text)] md:text-5xl">
            Let&apos;s build something<br />
            <span className="text-[var(--brand)]">great together.</span>
          </h2>
        </div>
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--brand)] px-8 py-4 text-sm font-bold text-black transition-all hover:bg-[#00e589]"
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* 4-col grid */}
      <div className="grid gap-12 px-6 py-14 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:px-16">

        {/* Brand */}
        <div>
          <a href="#" className="inline-flex items-center gap-2 mb-5">
            <Image src="/logo.png" alt="SmartShelf" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-base font-extrabold">
              <span className="text-[var(--text)]">Smart</span>
              <span className="text-[var(--brand)]">Shelf</span>
            </span>
          </a>
          <p className="text-sm leading-relaxed text-[var(--text-2)]">
            Smart FMCG operations platform for grocery suppliers, distributors and brands across NZ &amp; Australia.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--text-2)] transition-all hover:border-[var(--brand)] hover:text-[var(--brand)]">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div>
          <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--text)]">Platform</p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[var(--text-2)] transition-colors hover:text-[var(--text)]">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--text)]">Contact</p>
          <ul className="space-y-4">
            {[
              { icon: MapPin, text: "Auckland, New Zealand" },
              { icon: Mail,   text: "hello@smartshelf.co.nz" },
              { icon: Phone,  text: "+64 9 000 0000" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon className="mt-px h-4 w-4 shrink-0 text-[var(--brand)]" />
                <span className="text-sm text-[var(--text-2)]">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--text)]">Stay Updated</p>
          <p className="mb-4 text-sm text-[var(--text-2)]">Get product updates and FMCG insights — no spam.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input
              type="email" placeholder="your@email.com"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-2)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-2)] outline-none focus:border-[var(--brand)]"
            />
            <button type="submit" className="btn btn-primary w-full justify-center py-2.5 text-xs">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] px-6 py-5 md:px-12 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-[var(--text-2)] md:flex-row">
          <p>© {year} SmartShelf Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--text)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
