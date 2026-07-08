import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchAllStartupsFns } from "@/api/function/investor.function";
import { useInvestorStore } from "@/store/useInvestorStore";

export const useStartups = () => {
  const { page, limit, search, industry, fundingStage } = useInvestorStore();

  return useQuery({
    queryKey: ["startups", page, limit, search, industry, fundingStage],

    queryFn: async () => {
      const response = await fetchAllStartupsFns({
        page,
        limit,
        search,
        industry,
        fundingStage,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    placeholderData: keepPreviousData,
  });
};
