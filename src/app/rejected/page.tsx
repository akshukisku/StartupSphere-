"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const RejectedPage = () => {
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
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-8 ring-destructive/5"
          >
            <XCircle className="h-10 w-10 text-destructive" />
          </motion.div>
        </div>

        {/* Heading */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Account Rejected
          </h1>

          <p className="leading-7 text-muted-foreground">
            Unfortunately, your account request was not approved by the
            administrator.
            <br />
            If you believe this was a mistake, please contact our support
            team for further assistance.
          </p>
        </div>

        {/* Status */}
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Account Status
            </span>

            <span className="rounded-full bg-destructive/10 px-4 py-1 text-sm font-semibold text-destructive">
              Rejected
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 rounded-2xl border border-dashed border-border p-4">
          <p className="text-center text-sm leading-6 text-muted-foreground">
            You may update your information and submit a new application,
            or contact our support team if you have any questions regarding
            this decision.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RejectedPage;