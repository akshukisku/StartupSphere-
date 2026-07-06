"use client";

import EmptyInvestments from "./EmptyInvestments";
import InvestmentGrid from "./InvestmentGrid";
import InvestmentStats from "./InvestmentStats";

const InvestorInvestments = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Investments</h1>

        <p className="mt-2 text-muted-foreground">
          Track and manage all your startup investments in one place.
        </p>
      </div>
      <InvestmentStats />
      <InvestmentGrid />
    </div>
  );
};

export default InvestorInvestments;
