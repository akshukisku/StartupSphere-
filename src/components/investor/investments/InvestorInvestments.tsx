"use client";

import { useInvestorInvestmentRequests } from "@/hooks/investment/useInvestment";
import EmptyInvestments from "./EmptyInvestments";
import InvestmentGrid from "./InvestmentGrid";
import InvestmentStats from "./InvestmentStats";

const InvestorInvestments = () => {
  const {
  data,
  isPending,
  isError,
} = useInvestorInvestmentRequests();

if (isPending) {
  return <div>Loading...</div>;
}

if (isError) {
  return <div>Something went wrong.</div>;
}
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">My Investments</h2>

        <p className="mt-2 text-muted-foreground">
          Track and manage all your startup investments in one place.
        </p>
      </div>
      <InvestmentStats />
<InvestmentGrid
  investments={data ?? []}
/>
    </div>
  );
};

export default InvestorInvestments;
