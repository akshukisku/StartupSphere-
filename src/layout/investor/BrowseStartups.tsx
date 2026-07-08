"use client";

import StartupSearch from "./StartupSearch";
import StartupFilters from "./StartupFilters";
import StartupGrid from "./StartupGrid";

import { useStartups } from "@/hooks/investor/useStartups";
import { useSavedStartups } from "@/hooks/investor/useSavedStartup";

const BrowseStartups = () => {
  const {
    data,
    isPending,
    isError,
  } = useStartups();

  const { data: savedData } =
    useSavedStartups();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Browse Startups
        </h1>

        <p className="text-muted-foreground">
          Discover innovative startups seeking investment.
        </p>
      </div>

      <StartupSearch />

      <StartupFilters />

      <StartupGrid
        startups={data?.startups ?? []}
        savedStartupIds={
          savedData?.savedStartupIds ??
          new Set()
        }
        isLoading={isPending}
        isError={isError}
        totalPages={data?.totalPages ?? 1}
      />
    </div>
  );
};

export default BrowseStartups;