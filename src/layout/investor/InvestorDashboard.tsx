"use client";

import InvestorRecentStartups from "./InvestorRecentStartup";
import InvestorStats from "./InvestorStats";
import InvestorTrendingStartups from "./InvestorTrendingStartups";
import InvestorWelcome from "./InvestorWelcome";

const InvestorDashboard = () => {
  return (
    <div className="space-y-8">
      <InvestorWelcome />

      <InvestorStats />

      <InvestorRecentStartups />

      <InvestorTrendingStartups />
    </div>
  );
};

export default InvestorDashboard;
