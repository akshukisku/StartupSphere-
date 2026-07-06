"use client";

import StartupSearch from "./StartupSearch";
import StartupFilters from "./StartupFilters";
import StartupGrid from "./StartupGrid";

const BrowseStartups = () => {
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

      <StartupGrid />
    </div>
  );
};

export default BrowseStartups;