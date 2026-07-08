"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/hooks/notifications/useNotification";

import { useNotificationStore } from "@/store/useNotificationStore";

import NotificationCard from "./NotificationCard";
import EmptyNotification from "./EmptyNotification";

const NotificationDropdown = () => {
  const { isOpen, close } = useNotificationStore();

  const { data = [], isLoading } = useNotifications();
  const unreadCount = data.filter(
    (notification) => !notification.is_read,
  ).length;

  const { mutate: markAllAsRead, isPending } = useMarkAllNotificationsAsRead();

  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 15,
            scale: 0.98,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            absolute
            right-0
            top-14
            z-50
            w-[380px]
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-background/80
            shadow-2xl
            backdrop-blur-2xl
          "
        >
          {/* Header */}
          <div className="border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications</h3>

              {unreadCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {unreadCount} New
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Stay updated with your activity.
            </p>
          </div>

          {/* Body */}
          <div className="max-h-[450px] space-y-3 overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-2xl bg-muted"
                  />
                ))}
              </div>
            ) : data.length === 0 ? (
              <EmptyNotification />
            ) : (
              data.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => {
                    if (!notification.is_read) {
                      markAsRead(notification.id);
                    }

                    // Navigation later
                    // close();
                  }}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {data.length > 0 && (
            <div className="border-t border-white/10 p-4">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                disabled={isPending || unreadCount === 0}
                onClick={() => markAllAsRead()}
              >
                {isPending ? "Updating..." : "Mark all as read"}
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
