"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import {
  staggerContainer,
  staggerItem,
} from "@/constants/animations";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-36 lg:px-8">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-11404-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-card
                px-4
                py-1.5
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-muted-foreground
                backdrop-blur-sm
              "
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Join 1,000+ Startups
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={staggerItem}
            className="text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            Ready to build the{" "}
            <em
              className="not-italic text-primary"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              next Unicorn?
            </em>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            StartupSphere+ is where India's most ambitious founders and
            visionary investors come together. Your next breakthrough starts
            here.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={staggerItem}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="#"
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                bg-primary
                px-7
                py-3.5
                text-sm
                font-semibold
                text-primary-foreground
                shadow-lg
                shadow-primary/20
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-xl
                hover:shadow-primary/30
              "
            >
              Join StartupSphere+

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#"
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-card
                px-6
                py-3.5
                text-sm
                font-medium
                text-foreground
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-primary/10
                hover:text-primary
              "
            >
              <Mail
                size={15}
                className="transition-transform group-hover:rotate-6"
              />
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;