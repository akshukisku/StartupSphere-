"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/notifications/useNotification";
import { useNotificationStore } from "@/store/useNotificationStore";



const NotificationBell = () => {
  const { data = [] } =
    useNotifications();
    const { toggle } =
  useNotificationStore();

  const unreadCount =
  data?.reduce(
    (count, notification) =>
      notification.is_read
        ? count
        : count + 1,
    0
  ) ?? 0;

  return (
    <Button
      size="icon"
      variant="ghost"
      className="relative rounded-full"
      onClick={toggle}
    >
      <Bell className="h-5 w-5" />

      {unreadCount > 0 && (
        <Badge
          className="
            absolute
            -right-1
            -top-1
            h-5
            min-w-5
            rounded-full
            px-1
            text-[10px]
          "
        >
          {unreadCount > 99
            ? "99+"
            : unreadCount}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationBell;