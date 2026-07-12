"use client";

import {
  Building2,
  Clock3,
  CircleCheckBig,
  IndianRupee,
  XCircle,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";

interface FounderStatsProps {
  stats: {
    pendingRequests: number;
    acceptedRequests: number;
    rejectedRequests: number;
    totalFunding: number;
  };
}

const FounderStats = ({
  stats = {
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
    totalFunding: 0,
  },
}: FounderStatsProps) => {
  const cards = [
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: Clock3,
    },
    {
      title: "Accepted Requests",
      value: stats.acceptedRequests,
      icon: CircleCheckBig,
    },
    {
      title: "Funding Offered",
      value: `₹${stats.totalFunding.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
  title: "Rejected Requests",
  value: stats.rejectedRequests,
  icon: XCircle,
},
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <DashboardCard key={card.title}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>
            </div>

            <div className="rounded-xl bg-primary/10 p-3">
              <card.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};

export default FounderStats;