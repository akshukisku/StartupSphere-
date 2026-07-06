import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deletePitchDeckFns,
  fetchPitchDeckFns,
  updatePitchDeckFns,
  uploadPitchDeckFns,
} from "@/api/function/pitchDeck.function";

import { toast } from "sonner";
import { PitchDeckPayload, PitchDeck } from "@/types/interface/pitchDeck.interface";

export const usePitchDeck = () => {
  return useQuery({
    queryKey: ["pitch-deck"],
    queryFn: async () => {
      const response = await fetchPitchDeckFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useCreatePitchDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PitchDeckPayload) =>
      uploadPitchDeckFns(payload),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["pitch-deck"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePitchDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pitchDeck: PitchDeck) => {
      return await deletePitchDeckFns(pitchDeck);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["pitch-deck"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePitchDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePitchDeckFns,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["pitch-deck"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};