"use client";

import DynamicTable from "@/components/common/DynamicTable";

import { useFounderInvestmentRequests } from "@/hooks/investment/useInvestment";

import { investmentColumns } from "@/layout/founder/InvestmentColumns";

const RecentInvestmentRequests = () => {
  const { data, isPending } = useFounderInvestmentRequests();

  return (
    <DynamicTable
      columns={investmentColumns}
      data={(data ?? []).slice(0, 5)}
      isLoading={isPending}
      emptyMessage="No investment requests yet."
      rowKey="id"
    />
  );
};

export default RecentInvestmentRequests;