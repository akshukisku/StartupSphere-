import { createInvestmentRequestFns, fetchFounderInvestmentRequestsFns, updateInvestmentRequestStatusFns } from "@/api/function/investment.function";
import { InvestmentRequestPayload } from "@/types/interface/investment.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateInvestmentRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InvestmentRequestPayload) =>
      createInvestmentRequestFns(payload),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      // Future Queries
      queryClient.invalidateQueries({
        queryKey: ["investor-investment-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["founder-investment-requests"],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
};
export const useFounderInvestmentRequests = () => {
  return useQuery({
    queryKey: ["founder-investment-requests"],

    queryFn: async () => {
      const response =
        await fetchFounderInvestmentRequestsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useUpdateInvestmentRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvestmentRequestStatusFns,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["founder-investment-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["investor-investment-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    },
  });
};