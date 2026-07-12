"use client";

import { Bell } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { useFounderNotifications } from "@/hooks/notifications/useNotification";

const LatestNotifications = () => {
  const { data, isPending } = useFounderNotifications();

  if (isPending) {
    return (
      <DashboardCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Latest Notifications
          </h3>

          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            Latest Notifications
          </h3>

          <p className="text-sm text-muted-foreground">
            Your recent activity and updates.
          </p>
        </div>

        {!data?.length ? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 rounded-xl border border-border/50 p-4 transition-colors hover:bg-muted/40"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <Bell className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium">
                    {notification.title}
                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.description}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {/* {formatDistanceToNow(
                      new Date(notification.created_at),
                      {
                        addSuffix: true,
                      }
                    )} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default LatestNotifications;