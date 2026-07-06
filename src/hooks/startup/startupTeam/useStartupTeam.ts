import { addTeamMemberFns, deleteTeamMemberFns, fetchTeamMembersFns, updateTeamMemberFns } from "@/api/function/startupTeam.function";
import { StartupTeamPayload } from "@/types/interface/startup.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],

    queryFn: async () => {
      const response = await fetchTeamMembersFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartupTeamPayload) =>
      addTeamMemberFns(payload),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["team-members"],
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

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartupTeamPayload) =>
      updateTeamMemberFns(payload),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["team-members"],
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

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteTeamMemberFns(id),

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["team-members"],
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