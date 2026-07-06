"use client";

import { getRelativeTime } from "@/lib/global.helper";
import { Notification } from "@/types/interface/notification.interface";

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationCard = ({ notification, onClick }: NotificationCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        hover:bg-accent
        ${
          notification.is_read
            ? "border-transparent"
            : "border-primary/30 bg-primary/5"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="font-medium">{notification.title}</h4>

          {notification.description && (
            <p className="text-sm text-muted-foreground">
              {notification.description}
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            <p className="text-xs text-muted-foreground">
              {getRelativeTime(notification.created_at)}
            </p>
          </p>
        </div>

        {!notification.is_read && (
          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
        )}
      </div>
    </button>
  );
};

export default NotificationCard;
