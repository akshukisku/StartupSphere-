"use client";

import DashboardCard from "@/components/common/DashboardCard";
import { useMentorDashboard } from "@/hooks/mentor/useMentor";

const MentorStats = () => {
  const { data } = useMentorDashboard();

  const stats = [
    {
      title: "Assigned Startups",
      value: data?.assignedStartups ?? 0,
    },
    {
      title: "Upcoming Sessions",
      value: data?.upcomingSessions ?? 0,
    },
    {
      title: "Pending Reviews",
       value: data?.completedSessions ?? 0,
    },
    {
      title: "Completed Reviews",
      value: data?.completedMentorships ?? 0,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <DashboardCard key={stat.title}>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {stat.title}
            </p>

            <h2 className="text-3xl font-bold">
              {stat.value}
            </h2>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};

export default MentorStats;