"use client";

import DashboardCard from "@/components/common/DashboardCard";

const InvestorWelcome = () => {
  return (
    <DashboardCard>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome Back 👋
        </h2>

        <p className="text-muted-foreground">
          Discover innovative startups, track your interests, and connect with
          founders building the future.
        </p>
      </div>
    </DashboardCard>
  );
};

export default InvestorWelcome;