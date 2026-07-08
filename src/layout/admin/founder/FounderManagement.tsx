"use client";


import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";

import { founderColumns } from "./FounderColumns";
import { useFounders } from "@/hooks/admin/useFounder";

const FounderManagement = () => {
  const {
    data: founders,
    isPending,
    isError,
  } = useFounders();

  if (isError) {
    return (
      <DashboardContainer>
        <div className="rounded-xl border border-destructive p-8 text-center">
          Failed to load founders.
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Founder Management"
        description="Manage all founders registered on the platform."
      />

      <DynamicTable
        columns={founderColumns}
        data={founders ?? []}
        isLoading={isPending}
        emptyMessage="No founders found."
      />
    </DashboardContainer>
  );
};

export default FounderManagement;