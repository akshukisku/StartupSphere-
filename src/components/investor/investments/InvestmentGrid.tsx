"use client";

import EmptyInvestments from "./EmptyInvestments";
import InvestmentCard from "./InvestmentCard";
import { InvestorInvestmentRow } from "@/layout/investor/InvestmentColumns";

interface InvestmentGridProps {
  investments: InvestorInvestmentRow[];
}

const InvestmentGrid = ({
  investments,
}: InvestmentGridProps) => {
  if (!investments.length) {
    return <EmptyInvestments />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {investments.map((investment) => (
        <InvestmentCard
          key={investment.id}
          investment={investment}
        />
      ))}
    </div>
  );
};

export default InvestmentGrid;