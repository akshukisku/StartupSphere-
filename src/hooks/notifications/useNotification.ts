"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createNotification,
  fetchFounderNotificationsFns,
  fetchNotifications,
  fetchUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/api/function/notification.function";
import { NotificationType } from "@/types/enum/enum";

export const useNotifications = (userId?: string) => {
  return useQuery({
    queryKey: ["notifications", userId],

    queryFn: async () => {
      const res = await fetchNotifications(userId!);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },

    enabled: !!userId,
  });
};

export const useUnreadNotificationCount = (userId?: string) => {
  return useQuery({
    queryKey: ["notifications", "unread-count", userId],

    queryFn: async () => {
      const res = await fetchUnreadNotificationCount(userId!);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.count;
    },

    enabled: !!userId,
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      title,
      description,
      type,
      referenceId,
    }: {
      userId: string;
      title: string;
      description: string;
      type: NotificationType;
      referenceId?: string;
    }) =>
      createNotification({
        userId,
        title,
        description,
        type,
        referenceId,
      }),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => markAllNotificationsAsRead(userId),

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },

    onError: () => {
      toast.error("Something went wrong.");
    },
  });
};
export const useFounderNotifications = () => {
  return useQuery({
    queryKey: ["founder-notifications"],

    queryFn: async () => {
      const response =
        await fetchFounderNotificationsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};