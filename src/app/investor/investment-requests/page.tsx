"use client";

import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import InvestmentDetailsDialog from "@/components/investment/InvestmentDetailsDialog";
import { useInvestorInvestmentRequests } from "@/hooks/investment/useInvestment";
import { investmentColumns } from "@/layout/investor/InvestmentColumns";

const InvestorInvestmentRequestsPage = () => {
  const { data, isPending, isError } = useInvestorInvestmentRequests();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="My Investment Requests"
        description="Track the status of all your investment requests."
      />
      <DynamicTable
        columns={investmentColumns}
        data={data ?? []}
        isLoading={isPending}
        searchable
        searchPlaceholder="Search startups..."
        emptyMessage="No investment requests found."
        rowKey="id"
      />
      <InvestmentDetailsDialog/>
    </DashboardContainer>
  );
};

export default InvestorInvestmentRequestsPage;
