import { fetchNotificationsFns, markAllNotificationsAsReadFns, markNotificationAsReadFns } from "@/api/function/notification.function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: async () => {
      const response =
        await fetchNotificationsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useMarkNotificationAsRead =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        notificationId: string
      ) =>
        markNotificationAsReadFns(
          notificationId
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "notifications",
          ],
        });
      },
    });
  };

  export const useMarkAllNotificationsAsRead =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        markAllNotificationsAsReadFns,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "notifications",
          ],
        });
      },
    });
  };