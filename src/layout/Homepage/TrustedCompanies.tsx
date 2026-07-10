"use client";

import { fadeUp } from "@/constants/animations";
import { TRUSTED_COMPANIES } from "@/lib/global.helper";
import { motion } from "framer-motion";


interface MarqueeTrackProps {
  reversed?: boolean;
}

const MarqueeTrack = ({
  reversed = false,
}: MarqueeTrackProps) => {
  const companies = [
    ...TRUSTED_COMPANIES,
    ...TRUSTED_COMPANIES,
  ];

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{
          x: reversed
            ? ["-50%", "0%"]
            : ["0%", "-50%"],
        }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="flex shrink-0 gap-6"
      >
        {companies.map((company, index) => (
          <div
            key={`${company}-${index}`}
            className="
              shrink-0
              cursor-default
              whitespace-nowrap
              rounded-full
              border
              border-border
              bg-card
              px-6
              py-2.5
              text-sm
              font-medium
              text-muted-foreground
              transition-all
              duration-300
              hover:border-primary/30
              hover:bg-primary/10
              hover:text-primary
            "
          >
            {company}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TrustedCompanies = () => {
  return (
    <section className="overflow-hidden border-y border-border py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by India's top accelerators, investors &amp; universities
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        <MarqueeTrack />
        <MarqueeTrack reversed />
      </div>
    </section>
  );
};

export default TrustedCompanies;