"use client"
import { useQuery } from "@tanstack/react-query";

import { fetchFounderDashboardStatsFns, fetchInvestorInvestmentStatsFns } from "@/api/function/dashboard.function";

export const useFounderDashboardStats = () => {
  return useQuery({
    queryKey: ["founder-dashboard-stats"],

    queryFn: async () => {
      const response =
        await fetchFounderDashboardStatsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useInvestorInvestmentStats = () => {
  return useQuery({
    queryKey: ["investor-investment-stats"],

    queryFn: async () => {
      const response =
        await fetchInvestorInvestmentStatsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};