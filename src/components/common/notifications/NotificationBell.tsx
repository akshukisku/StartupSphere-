"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useProfile } from "@/hooks/profile/useProfile";
import { useUnreadNotificationCount } from "@/hooks/notifications/useNotification";

const NotificationBell = () => {
  const { data: profile } = useProfile();

  const { toggle } = useNotificationStore();

  const { data: unreadCount = 0 } = useUnreadNotificationCount(profile?.id);

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
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationBell;
