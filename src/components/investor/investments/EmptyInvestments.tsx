"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Button } from "@/components/ui/button";

const EmptyInvestments = () => {
  return (
    <DashboardCard className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      <div className="relative flex flex-col items-center px-6 py-20 text-center">
        {/* Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-xl">
            <BriefcaseBusiness className="h-11 w-11 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight">
          No Investments Yet
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          Start exploring innovative startups and build your investment
          portfolio. Discover founders, evaluate opportunities, and make
          informed investment decisions.
        </p>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="mt-10 rounded-xl px-8"
        >
          <Link href="/investor/startups">
            <Search className="mr-2 h-5 w-5" />
            Browse Startups
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {/* Footer */}
        <p className="mt-5 text-xs text-muted-foreground">
          Your investments will appear here once you start investing.
        </p>
      </div>
    </DashboardCard>
  );
};

export default EmptyInvestments;