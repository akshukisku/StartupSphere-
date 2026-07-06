"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useInvestorStore } from "@/store/useInvestorStore";

const StartupSearch = () => {
  const { search, setSearch } = useInvestorStore();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search startups..."
        className="h-11 pl-10"
      />
    </div>
  );
};

export default StartupSearch;