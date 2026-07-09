"use client";

import {
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";

import { Mentor } from "@/types/interface/admin.interface";

interface MentorStatsProps {
  mentors: Mentor[];
}

const MentorStats = ({
  mentors,
}: MentorStatsProps) => {
  const total = mentors.length;

  const active = mentors.filter(
    (mentor) => mentor.is_verified
  ).length;

  const disabled = mentors.filter(
    (mentor) => !mentor.is_verified
  ).length;

  const pending = mentors.filter(
    (mentor) =>
      mentor.approval_status === "pending"
  ).length;

  return (
    <DashboardStatsGrid>
      <DashboardStatCard
        title="Total Mentors"
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

export default MentorStats;