"use client";

import {  useMentorSessions } from "@/hooks/mentor/useMentor";
import MentorSessionCard from "./MentorSessionCard";

import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";


const MentorSessionList = () => {
const {
  data,
  isPending,
  isError,
} = useMentorSessions();
console.log(data);

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
        Failed to load mentor sessions.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        No mentorship sessions found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((session) => (
        <MentorSessionCard
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
};

export default MentorSessionList;