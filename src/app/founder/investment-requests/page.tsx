"use client";

import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { useFounderInvestmentRequests } from "@/hooks/investment/useInvestment";
import { investmentColumns } from "@/layout/founder/InvestmentColumns";


const FounderInvestmentRequestsPage = () => {
  const {
    data,
    isPending,
    isError,
  } = useFounderInvestmentRequests();

  console.log(data);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Investment Requests"
        description="Manage investment requests received for your startups."
      />

    <DynamicTable
  columns={investmentColumns}
  data={data ?? []}
  isLoading={isPending}
  emptyMessage="No investment requests found."
  searchable
  searchPlaceholder="Search investment requests..."
  rowKey="id"
/>
    </DashboardContainer>
  );
};

export default FounderInvestmentRequestsPage;