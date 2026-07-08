import { fetchSavedStartupDetailsFns, getSavedStartupsFns, saveStartupFns, unsaveStartupFns } from "@/api/function/savedStartup.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSavedStartups = () => {
  return useQuery({
    queryKey: ["saved-startups"],

    queryFn: async () => {
      const response =
        await getSavedStartupsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },

    select: (savedStartups) => ({
      savedStartups,

      savedStartupIds: new Set(
        savedStartups.map(
          (startup) =>
            startup.startup_id
        )
      ),
    }),
  });
};

export const useSaveStartup = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      startupId: string
    ) => saveStartupFns(startupId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "saved-startups",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["startups"],
      });
    },
  });
};

export const useUnsaveStartup =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        startupId: string
      ) =>
        unsaveStartupFns(
          startupId
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "saved-startups",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "startups",
          ],
        });
      },
    });
  };
export const useSavedStartupDetails = () => {
  return useQuery({
    queryKey: ["saved-startup-details"],

    queryFn: async () => {
      const response =
        await fetchSavedStartupDetailsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};