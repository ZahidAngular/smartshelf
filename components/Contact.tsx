"use client";

import { MapPin, Clock, Send } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { useState, type FormEvent } from "react";

const fieldCls =
  "w-full rounded-xl border border-line bg-fill px-4 py-3.5 text-sm text-mist placeholder:text-mist-2/60 outline-none transition-all focus:border-brand/50 focus:shadow-[0_0_0_3px_rgba(0,201,122,0.15)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative px-3 py-14 md:py-20">
      <div className="absolute right-0 top-0 -z-10 h-[30rem] w-[40rem] rounded-full bg-[radial-gradient(ellipse,rgba(18,87,166,0.12),transparent_60%)]" />

      <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-2">
        {/* form */}
        <Reveal x={-60} y={0}>
          <div className="glass-deep ring-glow rounded-3xl p-8 md:p-10">
            <h3 className="font-display text-2xl font-bold text-mist">
              Tell us about your operation
            </h3>
            <p className="mt-2 text-sm text-mist-2">
              We&apos;ll get back to you within one business day.
            </p>

            {sent ? (
              <div className="mt-8 rounded-2xl border border-brand/30 bg-brand/10 p-6 text-center">
                <p className="font-display text-lg font-bold text-brand-2">
                  Message sent âœ“
                </p>
                <p className="mt-2 text-sm text-mist-2">
                  Thanks for reaching out â€” our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Name" className={fieldCls} />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className={fieldCls}
                  />
                </div>
                <input placeholder="Company" className={fieldCls} />
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={4}
                  className={fieldCls}
                />
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-2 to-brand-deep px-6 py-4 text-sm font-bold text-white shadow-[0_12px_40px_-10px_rgba(56,212,255,0.55)] transition-transform hover:scale-[1.015] active:scale-[0.98]"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* info */}
        <div className="lg:pt-6">
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title={
              <>
                Don&apos;t Hesitate
                <br />
                <span className="text-gradient">to Contact Us</span>
              </>
            }
            desc="Whether you're a single-territory supplier or a national FMCG brand, we'd love to show you what SmartShelf can do."
          />

          <div className="space-y-5">
            <Reveal delay={0.1} x={60} y={0}>
              <div className="glass flex items-start gap-4 rounded-2xl p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-2 to-brand-deep">
                  <MapPin className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="font-semibold text-mist">Office</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist-2">
                    Auckland, New Zealand â€” serving grocery suppliers across NZ
                    &amp; Australia.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18} x={60} y={0}>
              <div className="glass flex items-start gap-4 rounded-2xl p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-deep">
                  <Clock className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="font-semibold text-mist">Work hours</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist-2">
                    Mon â€“ Fri, 9am â€“ 6pm NZST. Priority support customers reach
                    us same-day, every day.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


