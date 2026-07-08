import { create } from "zustand";

import { InvestorState } from "@/types/interface/investor.interface";

export const useInvestorStore = create<InvestorState>((set) => ({
  // -------------------------
  // Filters
  // -------------------------
  search: "",
  industry: "all",
  fundingStage: "all",
  page: 1,
  limit: 9,

  // -------------------------
  // Data
  // -------------------------
  startups: [],
  savedStartupIds: new Set<string>(),

  isLoading: false,
  isError: false,

  totalPages: 1,

  // -------------------------
  // Actions
  // -------------------------
  setSearch: (search) =>
    set({
      search,
      page: 1,
    }),

  setIndustry: (industry) =>
    set({
      industry,
      page: 1,
    }),

  setFundingStage: (fundingStage) =>
    set({
      fundingStage,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  setLimit: (limit) =>
    set({
      limit,
      page: 1,
    }),

  resetFilters: () =>
    set({
      search: "",
      industry: "all",
      fundingStage: "all",
      page: 1,
      limit: 9,
    }),
}));