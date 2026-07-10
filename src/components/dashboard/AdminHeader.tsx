"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

import ThemeToggle from "../ToggleTheme";
import NavUser from "./NavUser";
import NotificationBell from "../common/notifications/NotificationBell";
import NotificationDropdown from "../common/notifications/NotificationDropdown";

import { useProfile } from "@/hooks/profile/useProfile";
import { useNotificationRealtime } from "@/hooks/notifications/useNotificationRealtime";
import { useProfilesRealtime } from "@/hooks/realtime/useProfilesRealtime";
import { useRealtimeTest } from "@/hooks/realtime/useRealtimeTest";

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

const AdminHeader = ({
  title = "Admin Panel",
  description = "Manage users and platform operations",
}: AdminHeaderProps) => {
  const { data: profile } = useProfile();

  useNotificationRealtime(profile?.id);
  useProfilesRealtime();
useRealtimeTest()
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <NotificationDropdown />

        <ThemeToggle />

        <NavUser />
      </div>
    </header>
  );
};

export default AdminHeader;