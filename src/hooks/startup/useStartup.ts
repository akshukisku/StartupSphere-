import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createStartupFns, deleteStartupFns, fetchMyStartupFns, submitStartupForReviewFns, updateStartupFns } from "@/api/function/startup.function";
import { toast } from "sonner";
import { StartupPayload } from "@/types/interface/startup.interface";

interface UpdateStartupMutation {
  payload: StartupPayload;
  removedShowcaseIds: string[];
}


export const useStartup = () => {
  return useQuery({
    queryKey: ["startup"],
    queryFn: async () => {
      const response = await fetchMyStartupFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useCreateStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartupPayload) =>
      createStartupFns(payload),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["startup"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useUpdateStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      removedShowcaseIds,
    }: UpdateStartupMutation) =>
      updateStartupFns(payload, removedShowcaseIds),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["startup"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useDeleteStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStartupFns,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["startup"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSubmitStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitStartupForReviewFns,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["startup"],
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
