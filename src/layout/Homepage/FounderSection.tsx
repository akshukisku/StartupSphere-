"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { slideLeft, slideRight } from "@/constants/animations";
import { FOUNDER_FEATURES } from "@/lib/global.helper";

const STATS = [
  { value: "₹2.4Cr", label: "Raised" },
  { value: "18", label: "Investors" },
  { value: "94%", label: "Match" },
];

const FounderSection = () => {
  return (
    <section className=" px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
              <div className="absolute inset-0 flex flex-col gap-4 p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                    <div className="h-3 w-3 rounded-sm bg-primary" />
                  </div>

                  <div>
                    <div className="h-2.5 w-24 rounded-full bg-border" />
                    <div className="mt-1.5 h-2 w-16 rounded-full bg-muted" />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {STATS.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-muted/50 p-3"
                    >
                      <div className="text-base font-semibold text-foreground">
                        {item.value}
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Analytics */}
                <div className="flex-1 rounded-2xl border border-border bg-muted/30 p-4">
                  <div className="mb-3 h-2.5 w-32 rounded-full bg-border" />

                  <div className="space-y-2">
                    {[80, 60, 90, 45].map((width, index) => (
                      <div
                        key={index}
                        className="h-1.5 rounded-full bg-primary/20"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <div className="flex h-9 flex-1 items-center justify-center rounded-xl bg-primary">
                    <span className="text-xs font-semibold text-primary-foreground">
                      View Profile
                    </span>
                  </div>

                  <div className="flex h-9 flex-1 items-center justify-center rounded-xl border border-border bg-background">
                    <span className="text-xs font-medium text-muted-foreground">
                      Share Deck
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                For Founders
              </p>

              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-tight text-foreground">
                Built for{" "}
                <em
                  className="not-italic text-primary"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                  }}
                >
                  ambitious
                </em>{" "}
                founders
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Everything you need to build, pitch, and grow — in one place
                designed specifically for the Indian startup ecosystem.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {FOUNDER_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                    <Check
                      size={11}
                      className="text-primary"
                    />
                  </div>

                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:gap-3"
            >
              Start as a Founder

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;