"use client";

import DashboardCard from "@/components/common/DashboardCard";
import { useInvestorDashboard } from "@/hooks/investor/useInvestor";

const InvestorStats = () => {
  const { data, isPending } = useInvestorDashboard();

  const stats = [
    {
      title: "Saved Startups",
      value: data?.savedStartups ?? 0,
    },
    {
      title: "Interested",
      value: data?.interestedStartups ?? 0,
    },
    {
      title: "Available Startups",
      value: data?.totalStartups ?? 0,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <DashboardCard key={stat.title}>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.title}</p>

            <h2 className="text-3xl font-bold">{stat.value}</h2>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};

export default InvestorStats;
