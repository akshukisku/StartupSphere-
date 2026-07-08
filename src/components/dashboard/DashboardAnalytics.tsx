import AreaGrowthChart from "@/components/common/charts/AreaGrowthChart";
import RoleDistributionChart from "@/components/common/charts/RoleDistributionChart";
import StartupStatusChart from "@/components/common/charts/StartupStatusChart";

import {
  MonthlyGrowth,
  RoleDistribution,
  StartupStatus,
} from "@/types/interface/admin.interface";

interface DashboardAnalyticsProps {
  monthlyGrowth: MonthlyGrowth[];
  roleDistribution: RoleDistribution[];
  startupStatus: StartupStatus[];
}

const DashboardAnalytics = ({
  monthlyGrowth,
  roleDistribution,
  startupStatus,
}: DashboardAnalyticsProps) => {
  return (
    <section className="space-y-6">
      {/* Full Width Chart */}
      <AreaGrowthChart data={monthlyGrowth} />

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RoleDistributionChart data={roleDistribution} />

        <StartupStatusChart data={startupStatus} />
      </div>
    </section>
  );
};

export default DashboardAnalytics;