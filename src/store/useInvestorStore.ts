import { InvestorState } from "@/types/interface/investor.interface";
import { create } from "zustand";

export const useInvestorStore = create<InvestorState>((set) => ({
  search: "",
  industry: "all",
  fundingStage: "all",
  page: 1,
  limit: 9,

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
