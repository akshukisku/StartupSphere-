"use client";

import {
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";

import { Founder } from "@/types/interface/founder.interface";

interface FounderStatsProps {
  founders: Founder[];
}

const FounderStats = ({
  founders,
}: FounderStatsProps) => {
  const total = founders.length;

  const active = founders.filter(
    (founder) => founder.is_verified
  ).length;

  const disabled = founders.filter(
    (founder) => !founder.is_verified
  ).length;

  const pending = founders.filter(
    (founder) =>
      founder.approval_status === "pending"
  ).length;

  return (
    <DashboardStatsGrid>
      <DashboardStatCard
        title="Total Founders"
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

export default FounderStats;