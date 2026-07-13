"use client";

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import DynamicTable from "@/components/common/DynamicTable";


import {
  mentorRequestColumns,
} from "@/layout/mentor/MentorRequestColumns";
import { useMentorRequests } from "@/hooks/mentor/useMentor";
import MentorDetailsDialog from "@/components/mentor/MentorDetailsDialog";

const MentorRequestsPage = () => {
  const {
    data,
    isPending,
    isError,
  } = useMentorRequests();

  if (isError) {
    return (
      <div>
        Something went wrong.
      </div>
    );
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Mentor Requests"
        description="Review and manage mentorship requests from founders."
      />

      <DynamicTable
        columns={mentorRequestColumns}
        data={data ?? []}
        isLoading={isPending}
        searchable
        searchPlaceholder="Search startups..."
        emptyMessage="No mentor requests found."
        rowKey="id"
      />
      <MentorDetailsDialog/>
    </DashboardContainer>
  );
};

export default MentorRequestsPage;