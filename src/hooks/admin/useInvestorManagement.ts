"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchInvestorsFns, updateInvestorVerificationFns } from "@/api/function/admin.function";
import { toast } from "sonner";

export const useInvestorManagement = () => {
  return useQuery({
    queryKey: ["admin-investors"],

    queryFn: async () => {
      const res = await fetchInvestorsFns();

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
  });
};
export const useUpdateInvestorVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      investorId,
      isVerified,
    }: {
      investorId: string;
      isVerified: boolean;
    }) =>
      updateInvestorVerificationFns(
        investorId,
        isVerified
      ),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-investors"],
      });
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};