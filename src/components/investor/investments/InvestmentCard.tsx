"use client";

import DashboardCard from "@/components/common/DashboardCard";

interface InvestmentCardProps {
  investment: any;
}

const InvestmentCard = ({
  investment,
}: InvestmentCardProps) => {
  return (
    <DashboardCard>
      Investment Card
    </DashboardCard>
  );
};

export default InvestmentCard;