"use client";

import { useAssignedStartups } from "@/hooks/mentor/useMentor";
import MentorStartupCard from "./MentorStartupCard";

const MentorStartupGrid = () => {
  const {
    data,
    isPending,
    isError,
  } = useAssignedStartups();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (!data?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No startups assigned yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((startup) => (
        <MentorStartupCard
          key={startup.id}
          startup={startup}
        />
      ))}
    </div>
  );
};

export default MentorStartupGrid;