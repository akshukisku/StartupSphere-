"use client";

import MentorStartupHeader from "@/layout/mentor/MentorStartupHeader";
import MentorStartupList from "@/layout/mentor/MentorStartupList";

const MentorAssignedStartups = () => {
  return (
    <div className="space-y-8">
      <MentorStartupHeader />

      <MentorStartupList />
    </div>
  );
};

export default MentorAssignedStartups;