"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { slideLeft, slideRight } from "@/constants/animations";
import { INVESTOR_FEATURES } from "@/lib/global.helper";

const STARTUPS = [
  {
    name: "NexaAI",
    sector: "AI · Seed",
    match: "98%",
  },
  {
    name: "MediFlow",
    sector: "HealthTech · Series A",
    match: "94%",
  },
  {
    name: "FinStack",
    sector: "FinTech · Pre-seed",
    match: "91%",
  },
];

const InvestorSection = () => {
  return (
    <section
      id="investors"
      className=" px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                For Investors
              </p>

              <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-tight text-foreground">
                Discover{" "}
                <em
                  className="not-italic text-primary"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                  }}
                >
                  high-quality
                </em>{" "}
                startups
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Cut through the noise. Every startup on StartupSphere+ is
                verified, structured, and ready for serious due diligence.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {INVESTOR_FEATURES.map((feature) => (
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
              Join as an Investor

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
              <div className="absolute inset-0 flex flex-col gap-4 p-6">
                {/* Search */}
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5">
                  <div className="h-3.5 w-3.5 rounded-full border border-muted-foreground" />

                  <div className="h-2 flex-1 rounded-full bg-border" />

                  <div className="flex gap-2">
                    {["Seed", "Series A"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cards */}
                {STARTUPS.map((startup) => (
                  <div
                    key={startup.name}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-border
                      bg-muted/50
                      p-3.5
                      transition-all
                      duration-300
                      hover:border-primary/30
                      hover:bg-primary/5
                    "
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                      {startup.name[0]}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {startup.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {startup.sector}
                      </div>
                    </div>

                    <div className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {startup.match}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvestorSection;