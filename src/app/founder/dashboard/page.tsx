"use client";

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DashboardCard from "@/components/common/DashboardCard";

import { useFounderDashboardStats } from "@/hooks/dashboard/useDashboard";

import FounderStats from "@/layout/founder/FounderStats";
import RecentInvestmentRequests from "@/layout/founder/RecentInvestmentRequests";
import FundingOverviewChart from "@/layout/founder/FundingOverviewChart";
import LatestNotifications from "@/layout/founder/LatestNotifications";

const FounderDashboard = () => {
  const { data, isPending, isError } = useFounderDashboardStats();

  if (isPending) {
    return (
      <DashboardContainer>
        <p>Loading dashboard...</p>
      </DashboardContainer>
    );
  }

  if (isError || !data) {
    return (
      <DashboardContainer>
        <p>Failed to load dashboard.</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Founder Dashboard"
        description="Monitor your startup's investment activity and performance."
      />

      <FounderStats stats={data} />

      <DashboardCard className="p-6">
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">
              Recent Investment Requests
            </h3>

            <p className="text-sm text-muted-foreground">
              View the latest investment requests received from investors.
            </p>
          </div>

          <RecentInvestmentRequests />
        </div>
      </DashboardCard>
      <div className="grid gap-6 lg:grid-cols-2">
        <FundingOverviewChart
          pending={data.pendingRequests}
          accepted={data.acceptedRequests}
          rejected={data.rejectedRequests}
        />

        {/* Latest Notifications will come here */}
          <LatestNotifications />

      </div>
    </DashboardContainer>
  );
};

export default FounderDashboard;
