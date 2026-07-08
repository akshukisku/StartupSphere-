"use client";

import DashboardCard from "@/components/common/DashboardCard";

const MentorStartupHeader = () => {
  return (
    <DashboardCard>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Assigned Startups
        </h1>

        <p className="text-muted-foreground">
          View your assigned startups, track their progress,
          and schedule mentorship sessions.
        </p>
      </div>
    </DashboardCard>
  );
};

export default MentorStartupHeader;