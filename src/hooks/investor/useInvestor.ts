  import { useQuery } from "@tanstack/react-query";

  import {
      fetchAllStartupsFns,
    fetchInvestorDashboardStatsFns,
    fetchRecentStartupsFns,
    fetchStartupDetailsFns,
  } from "@/api/function/investor.function";

  interface UseStartupsParams {
    page?: number;
    limit?: number;
    search?: string;
    industry?: string;
    fundingStage?: string;
  }

  export const useStartups = (
    params: UseStartupsParams
  ) => {
    return useQuery({
      queryKey: ["startups", params],

      queryFn: async () => {
        const res = await fetchAllStartupsFns(
          params
        );

        if (!res.success) {
          throw new Error(res.message);
        }

        return res.data;
      },
    });
  };

  export const useInvestorDashboard = () => {
    return useQuery({
      queryKey: ["investor-dashboard"],

      queryFn: async () => {
        const res =
          await fetchInvestorDashboardStatsFns();

        if (!res.success) {
          throw new Error(res.message);
        }

        return res.data;
      },
    });
  };

  export const useRecentStartups = () => {
    return useQuery({
      queryKey: ["recent-startups"],

      queryFn: async () => {
        const res =
          await fetchRecentStartupsFns();

        if (!res.success) {
          throw new Error(res.message);
        }

        return res.data;
      },
    });
  };

  export const useStartupDetails = (
    startupId: string
  ) => {
    return useQuery({
      queryKey: ["startup-details", startupId],

      queryFn: async () => {
        const res = await fetchStartupDetailsFns(
          startupId
        );

        if (!res.success) {
          throw new Error(res.message);
        }

        return res.data;
      },

      enabled: !!startupId,
    });
  };