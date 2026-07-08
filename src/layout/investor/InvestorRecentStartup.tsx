"use client";

import { useRecentStartups } from "@/hooks/investor/useInvestor";

import StartupCard from "./StartupCard";
import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";
import { useSavedStartups } from "@/hooks/investor/useSavedStartup";

const InvestorRecentStartups = () => {
  const { data, isPending, isError } = useRecentStartups();

  const { data: savedData } = useSavedStartups();

  if (isPending) {
    return (
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold">
            Recently Added Startups
          </h2>

          <p className="text-muted-foreground">
            Newly approved startups looking for investors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
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
            Recently Added Startups
          </h2>

          <p className="text-muted-foreground">
            Newly approved startups looking for investors.
          </p>
        </div>

        <div className="rounded-xl border border-destructive p-8 text-center">
          Failed to load recent startups.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Recently Added Startups
        </h2>

        <p className="text-muted-foreground">
          Newly approved startups looking for investors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            isSaved={
              savedData?.savedStartupIds.has(startup.id) ?? false
            }
          />
        ))}
      </div>
    </section>
  );
};

export default InvestorRecentStartups;