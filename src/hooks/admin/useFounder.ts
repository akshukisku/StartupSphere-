import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFoundersFns, updateFounderVerificationFns } from "@/api/function/founder.function";
import { Founder } from "@/types/interface/founder.interface";
import { toast } from "sonner";

export const useFounders = () => {
  return useQuery<Founder[]>({
    queryKey: ["founders"],
    queryFn: async () => {
      const response = await fetchFoundersFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useUpdateFounderVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      founderId,
      isVerified,
    }: {
      founderId: string;
      isVerified: boolean;
    }) =>
      updateFounderVerificationFns(
        founderId,
        isVerified
      ),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["founders"],
      });
    },

    onError: () => {
      toast.error(
        "Something went wrong."
      );
    },
  });
};