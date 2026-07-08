"use client";

import StartupCard from "@/layout/investor/StartupCard";
import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";

import { useAssignedStartups } from "@/hooks/mentor/useMentor";

const MentorAssignedStartups = () => {
  const {
    data,
    isPending,
    isError,
  } = useAssignedStartups();

  if (isPending) {
    return (
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold">
            Assigned Startups
          </h2>

          <p className="text-muted-foreground">
            Startups assigned to you for mentorship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <StartupCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold">
            Assigned Startups
          </h2>

          <p className="text-muted-foreground">
            Startups assigned to you for mentorship.
          </p>
        </div>

        <div className="rounded-xl border border-destructive p-8 text-center">
          Failed to load assigned startups.
        </div>
      </section>
    );
  }

  if (!data?.length) {
    return (
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold">
            Assigned Startups
          </h2>

          <p className="text-muted-foreground">
            Startups assigned to you for mentorship.
          </p>
        </div>

        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="text-muted-foreground">
            No startups assigned yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Assigned Startups
        </h2>

        <p className="text-muted-foreground">
          Startups assigned to you for mentorship.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            isSaved={false}
          />
        ))}
      </div>
    </section>
  );
};

export default MentorAssignedStartups;