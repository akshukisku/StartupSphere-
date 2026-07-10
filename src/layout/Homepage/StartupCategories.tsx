"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Landmark,
  HeartPulse,
  GraduationCap,
  Cloud,
  ShieldCheck,
  Leaf,
  Link2,
} from "lucide-react";

import { fadeUp,staggerContainer,staggerItem } from "@/constants/animations";
import { STARTUP_CATEGORIES } from "@/lib/global.helper";
// import {
//   fadeUp,
//   staggerContainer,
//   staggerItem,
// } from "@/lib/animations";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Landmark,
  HeartPulse,
  GraduationCap,
  Cloud,
  ShieldCheck,
  Leaf,
  Link2,
};

const StartupCategories = () => {
  return (
    <section
      id="startups"
      className="border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Browse by sector
          </p>

          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-foreground">
            Explore{" "}
            <em
              className="not-italic text-primary"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              every
            </em>{" "}
            industry
          </h2>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {STARTUP_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon];

            return (
              <motion.button
                key={category.label}
                variants={staggerItem}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.15 },
                }}
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  items-center
                  gap-4
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-6
                  text-center
                  transition-all
                  duration-300
                  hover:border-primary/30
                  hover:bg-primary/5
                  hover:shadow-lg
                  hover:shadow-primary/10
                  sm:p-8
                "
              >
                {/* Hover Overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-border
                    bg-muted
                    transition-all
                    duration-300
                    group-hover:border-primary/30
                    group-hover:bg-primary/10
                  "
                >
                  {Icon && (
                    <Icon
                      size={22}
                      className="text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                    />
                  )}
                </div>

                {/* Label */}
                <span className="relative text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {category.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StartupCategories;