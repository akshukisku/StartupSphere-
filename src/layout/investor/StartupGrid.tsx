"use client";

import StartupCard from "./StartupCard";
import StartupPagination from "./StartupPagination";

import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";

import { InvestorStartup } from "@/types/interface/investor.interface";

const SKELETON_COUNT = 9;

interface StartupGridProps {
  startups?: InvestorStartup[];
  savedStartupIds?: Set<string>;
  isLoading?: boolean;
  isError?: boolean;
  totalPages?: number;
  showPagination?: boolean;
}
const StartupGrid = ({
  startups = [],
  savedStartupIds = new Set<string>(),
  isLoading = false,
  isError = false,
  totalPages = 1,
  showPagination = true,
}: StartupGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <StartupCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive p-10 text-center">
        <h3 className="text-lg font-semibold">
          Failed to load startups
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  if (startups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">
          No Startups Found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          No startups matched your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {startups.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            isSaved={savedStartupIds.has(startup.id)}
          />
        ))}
      </div>

      {showPagination && (
        <StartupPagination totalPages={totalPages} />
      )}
    </>
  );
};

export default StartupGrid;