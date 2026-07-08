"use client";

import { useMemo } from "react";


import { useSavedStartups } from "@/hooks/investor/useSavedStartup";
import { useSavedStartupDetails } from "@/hooks/investor/useSavedStartup";
import StartupGrid from "@/layout/investor/StartupGrid";

const SavedStartupsPage = () => {
  const {
    data: startups = [],
    isPending,
    isError,
  } = useSavedStartupDetails();

  const { data: savedData } = useSavedStartups();

  const savedStartupIds = useMemo(
    () => savedData?.savedStartupIds ?? new Set<string>(),
    [savedData]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Saved Startups
        </h1>

        <p className="mt-2 text-muted-foreground">
          Browse and manage the startups you've saved for future review.
        </p>
      </div>

      <StartupGrid
        startups={startups}
        savedStartupIds={savedStartupIds}
        isLoading={isPending}
        isError={isError}
        showPagination={false}
      />
    </div>
  );
};

export default SavedStartupsPage;