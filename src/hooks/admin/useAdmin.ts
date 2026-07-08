import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    approveStartupFns,
  approveUserFns,
  fetchAdminDashboardFns,
  fetchAdminStatsFns,
  fetchPendingStartupsFns,
  fetchPendingUsersFns,
  fetchStartupByIdFns,
  rejectStartupFns,
  rejectUserFns,
} from "@/api/function/admin.function";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-dashboard"],

    queryFn: async () => {
      const response = await fetchAdminDashboardFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const usePendingStartups = () => {
  return useQuery({
    queryKey: ["admin-pending-startups"],

    queryFn: async () => {
      const response =
        await fetchPendingStartupsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useApproveStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      startupId,
      adminId,
    }: {
      startupId: string;
      adminId: string;
    }) =>
      approveStartupFns(
        startupId,
        adminId
      ),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [
          "admin-pending-startups",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "admin-dashboard",
        ],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useRejectStartup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      startupId,
      adminId,
      reason,
    }: {
      startupId: string;
      adminId: string;
      reason: string;
    }) =>
      rejectStartupFns  (
        startupId,
        adminId,
        reason
      ),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [
          "admin-pending-startups",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "admin-dashboard",
        ],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useStartupPreview = (
  startupId?: string
) => {
  return useQuery({
    queryKey: [
      "admin-startup-preview",
      startupId,
    ],

    queryFn: async () => {
      const response =
        await fetchStartupByIdFns(
          startupId!
        );

      if (!response.success) {
        throw new Error(
          response.message
        );
      }

      return response.data;
    },

    enabled: !!startupId,
  });
};
export const usePendingUsers = () => {
  return useQuery({
    queryKey: ["admin-pending-users"],

    queryFn: async () => {
      const response =
        await fetchPendingUsersFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useApproveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      approveUserFns(userId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-pending-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRejectUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      rejectUserFns(userId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-pending-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
