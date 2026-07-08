"use client";

import {
  Rocket,
  UserCheck,
  Briefcase,
  Users,
  Handshake,
  CheckCircle,
  Loader2,
} from "lucide-react";

import { useAdminDashboard } from "@/hooks/admin/useAdmin";

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DashboardStatsGrid from "@/components/dashboard/DashboardStatsGrid";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import AreaGrowthChart from "@/components/common/charts/AreaGrowthChart";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";

const AdminDashboardPage = () => {
  const { data, isPending, isError, error } = useAdminDashboard();
  // console.log(data?.roleDistribution);
  // console.log(data?.startupStatus);

  console.log(data);

  if (isPending) {
    return (
      <DashboardContainer>
        <div className="flex h-100 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardContainer>
    );
  }

  if (isError) {
    return (
      <DashboardContainer>
        <div className="rounded-xl border border-destructive bg-destructive/5 p-8">
          <h2 className="font-semibold text-destructive">
            Failed to load dashboard statistics
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message}
          </p>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Admin Dashboard"
        description="Manage and monitor the StartupSphere+ platform."
      />

      <DashboardStatsGrid>
        <DashboardStatCard
          title="Pending Startups"
          value={data?.stats.pendingStartups ?? 0}
          subtitle="Awaiting Review"
          icon={Rocket}
        />

        <DashboardStatCard
          title="Pending Users"
          value={data?.stats.pendingUsers ?? 0}
          subtitle="Awaiting Approval"
          icon={UserCheck}
        />

        <DashboardStatCard
          title="Total Startups"
          value={data?.stats.totalStartups ?? 0}
          subtitle="Registered Startups"
          icon={Briefcase}
        />

        <DashboardStatCard
          title="Total Users"
          value={data?.stats.totalUsers ?? 0}
          subtitle="Registered Accounts"
          icon={Users}
        />

        <DashboardStatCard
          title="Active Mentorships"
          value={data?.stats.activeMentorships ?? 0}
          subtitle="Currently Running"
          icon={Handshake}
        />

        <DashboardStatCard
          title="Completed Mentorships"
          value={data?.stats.completedMentorships ?? 0}
          subtitle="Successfully Finished"
          icon={CheckCircle}
        />
      </DashboardStatsGrid>

   <DashboardAnalytics
  monthlyGrowth={data?.monthlyGrowth ?? []}
  roleDistribution={data?.roleDistribution ?? []}
  startupStatus={data?.startupStatus ?? []}
/>
    </DashboardContainer>
  );
};

export default AdminDashboardPage;  