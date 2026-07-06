"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { staggerContainer, staggerItem } from "@/constants/animations";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* MagicUI Meteors background */}
      <Meteors number={20} />
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-1 w-full h-full object-cover opacity-30"
        aria-hidden="true"
      >
        <source src="./bg-ground.mp4" type="video/mp4" />
      </video> */}

      {/* Gradient overlays — use CSS vars instead of hardcoded hex */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.03] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/50 text-muted-foreground text-xs font-medium tracking-wide uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
              India's Startup Ecosystem
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={staggerItem}
            className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            Connect{" "}
            <em
              className="font-normal not-italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              Founders,
            </em>
            <br />
            <em
              className="font-normal not-italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              Investors
            </em>{" "}
            &amp;
            <br />
            Innovators
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            StartupSphere+ helps founders raise funding, discover opportunities,
            connect with investors, mentors, incubators and build the future.
          </motion.p>
          {/* Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <Link
              href=""
              className="group flex items-center gap-2 bg-foreground text-background font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-foreground/90 transition-all duration-200"
            >
              Launch Your Startup
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>

            <a
              href="#startups"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium px-6 py-3.5 rounded-full text-sm border border-border hover:border-border/60 hover:bg-foreground/[0.04] transition-all duration-200"
            >
              <Play size={14} className="fill-current" />
              Explore Startups
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: {
            duration: 0.6,
            delay: 1.2,
          },
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-muted-foreground/80" />
        <span className="text-muted-foreground/70 text-xs tracking-widest uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
