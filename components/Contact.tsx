"use client";

import { MapPin, Clock, Send, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { useState, type FormEvent } from "react";

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-3)] px-4 py-3.5 text-sm text-[var(--text)] placeholder:text-[var(--text-2)] outline-none transition-all focus:border-[var(--border-brand)] focus:shadow-[0_0_0_3px_rgba(0,201,122,0.08)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative px-3 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-start gap-12 lg:grid-cols-2">

          {/* Info side */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title={
                <>
                  Don&apos;t Hesitate{" "}
                  <span className="text-gradient">to Contact Us</span>
                </>
              }
              desc="Whether you're a single-territory supplier or a national FMCG brand, we'd love to show you what SmartShelf can do."
            />

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Office",
                  text: "Auckland, New Zealand — serving grocery suppliers across NZ & Australia.",
                },
                {
                  icon: Clock,
                  label: "Work hours",
                  text: "Mon – Fri, 9am – 6pm NZST. Priority support customers reach us same-day, every day.",
                },
              ].map(({ icon: Icon, label, text }) => (
                <Reveal key={label} x={-30} y={0} delay={0.08}>
                  <div className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-5">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--brand)] grid place-items-center">
                      <Icon className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)]">{label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-2)]">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <Reveal x={50} y={0}>
            <div className="card-accent rounded-2xl p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                Tell us about your operation
              </h3>
              <p className="mt-2 text-sm text-[var(--text-2)]">
                We&apos;ll get back to you within one business day.
              </p>

              {sent ? (
                <div className="mt-8 rounded-xl border border-[var(--border-brand)] bg-[rgba(0,201,122,0.07)] p-6 text-center">
                  <p className="font-display text-lg font-bold text-[var(--brand)]">
                    Message sent ✓
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-2)]">
                    Thanks for reaching out — our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required placeholder="Name"  className={inputCls} />
                    <input required type="email" placeholder="Email" className={inputCls} />
                  </div>
                  <input placeholder="Company" className={inputCls} />
                  <textarea
                    required
                    placeholder="How can we help?"
                    rows={4}
                    className={inputCls}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-4 text-sm"
                  >
                    Send Message
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
