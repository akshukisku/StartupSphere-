"use client";

import StartupCard from "@/layout/investor/StartupCard";

import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";

import { useAssignedStartups } from "@/hooks/mentor/useMentor";

import { useMentorSessionStore } from "@/store/useMentorSessionStore";
import ScheduleSessionDialog from "./startups/ScheduleSessionDialog";

const MentorStartupList = () => {
  const { data, isPending, isError } = useAssignedStartups();
  console.log(data);

  const openScheduleDialog = useMentorSessionStore(
    (state) => state.openScheduleDialog
  );

  if (isPending) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <StartupCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive p-10 text-center">
        Failed to load assigned startups.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        No startups have been assigned yet.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            variant="mentor"
            onSchedule={() =>
              openScheduleDialog(
                startup.assignment_id,
                startup.startup_name
              )
            }
          />
        ))}
      </div>

      <ScheduleSessionDialog />
    </>
  );
};

export default MentorStartupList;