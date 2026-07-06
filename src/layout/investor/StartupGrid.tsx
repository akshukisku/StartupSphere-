"use client";

import { useInvestorStore } from "@/store/useInvestorStore";
import StartupCard from "./StartupCard";
import { useStartups } from "@/hooks/investor/useInvestor";
import StartupPagination from "./StartupPagination";
import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";

const StartupGrid = () => {
  const { page, limit, search, industry, fundingStage } = useInvestorStore();

  const { data, isPending, isError } = useStartups({
    page,
    limit,
    search,
    industry,
    fundingStage,
  });

if (isPending) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <StartupCardSkeleton key={index} />
      ))}
    </div>
  );
}

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive p-10 text-center">
        <h3 className="text-lg font-semibold">Failed to load startups</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data.startups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">No Startups Found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Check back later for newly approved startups.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
      <StartupPagination totalPages={data.totalPages} />
    </>
  );
};

export default StartupGrid;
