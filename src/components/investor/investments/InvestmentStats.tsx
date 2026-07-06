"use client";

import {
  BriefcaseBusiness,
  CircleCheckBig,
  Clock3,
  IndianRupee,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";

const stats = [
  {
    title: "Total Investments",
    value: "0",
    icon: BriefcaseBusiness,
  },
  {
    title: "Active",
    value: "0",
    icon: CircleCheckBig,
  },
  {
    title: "Pending",
    value: "0",
    icon: Clock3,
  },
  {
    title: "Total Invested",
    value: "₹0",
    icon: IndianRupee,
  },
];

const InvestmentStats = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <DashboardCard
            key={stat.title}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h3>
              </div>

              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
};

export default InvestmentStats;