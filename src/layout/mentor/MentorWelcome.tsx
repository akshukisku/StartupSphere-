"use client";

import DashboardCard from "@/components/common/DashboardCard";

const MentorWelcome = () => {
  return (
    <DashboardCard>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome Back 👋
        </h2>

        <p className="text-muted-foreground">
          Guide startups, share your expertise, and help founders grow their
          ideas into successful businesses.
        </p>
      </div>
    </DashboardCard>
  );
};

export default MentorWelcome;