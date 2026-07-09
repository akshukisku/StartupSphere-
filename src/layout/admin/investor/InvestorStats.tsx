"use client";

import {
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import { Investor } from "@/types/interface/admin.interface";


interface InvestorStatsProps {
  investors: Investor[];
}
    
const InvestorStats = ({
  investors,
}: InvestorStatsProps) => {
  const total = investors.length;

  const active = investors.filter(
    (investor) => investor.is_verified
  ).length;

  const disabled = investors.filter(
    (investor) => !investor.is_verified
  ).length;

  const pending = investors.filter(
    (investor) =>
      investor.approval_status === "pending"
  ).length;

  return (
    <DashboardStatsGrid>
      <DashboardStatCard
        title="Total Investors"
        value={total}
        icon={Users}
      />

      <DashboardStatCard
        title="Active"
        value={active}
        icon={UserCheck}
      />

      <DashboardStatCard
        title="Disabled"
        value={disabled}
        icon={UserX}
      />

      <DashboardStatCard
        title="Pending"
        value={pending}
        icon={Clock3}
      />
    </DashboardStatsGrid>
  );
};

export default InvestorStats;