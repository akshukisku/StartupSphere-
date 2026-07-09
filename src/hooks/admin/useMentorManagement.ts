"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  fetchMentorsFns,
  updateMentorVerificationFns,
} from "@/api/function/admin.function";

export const useMentorManagement = () => {
  return useQuery({
    queryKey: ["admin-mentors"],

    queryFn: async () => {
      const res = await fetchMentorsFns();

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },
  });
};

export const useUpdateMentorVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mentorId,
      isVerified,
    }: {
      mentorId: string;
      isVerified: boolean;
    }) =>
      updateMentorVerificationFns(
        mentorId,
        isVerified
      ),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-mentors"],
      });
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};