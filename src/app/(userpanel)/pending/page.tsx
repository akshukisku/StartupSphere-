"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

const PendingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-lg rounded-3xl border border-border p-8 shadow-2xl"
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 ring-8 ring-yellow-500/5"
          >
            <Clock3 className="h-10 w-10 text-yellow-500" />
          </motion.div>
        </div>

        {/* Heading */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Account Pending Approval
          </h1>

          <p className="text-muted-foreground leading-7">
            Your account has been created successfully.
            <br />
            Our team is reviewing your profile. Once approved, you'll be able to
            access all StartupSphere+ features.
          </p>
        </div>

        {/* Status */}
        <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Account Status
            </span>

            <span className="rounded-full bg-yellow-500/10 px-4 py-1 text-sm font-semibold text-yellow-500">
              Pending
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-2xl border border-dashed border-border p-4">
          <p className="text-center text-sm leading-6 text-muted-foreground">
            You'll receive an email notification once your account has been
            approved by an administrator.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingPage;
