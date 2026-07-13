"use client";

import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import MentorGrid from "@/layout/founder/mentors/MentorGrid";


const FounderMentorsPage = () => {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Find Mentors"
        description="Browse experienced mentors and request guidance for your startup."
      />

      <MentorGrid />
    </DashboardContainer>
  );
};

export default FounderMentorsPage;