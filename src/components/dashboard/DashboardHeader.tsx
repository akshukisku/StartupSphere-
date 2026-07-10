"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ToggleTheme";
import NavUser from "./NavUser";
import NotificationBell from "../common/notifications/NotificationBell";
import NotificationDropdown from "../common/notifications/NotificationDropdown";
import { useProfile } from "@/hooks/profile/useProfile";
import { useNotificationRealtime } from "@/hooks/notifications/useNotificationRealtime";
import { useProfilesRealtime } from "@/hooks/realtime/useProfilesRealtime";
import { useStartupsRealtime } from "@/hooks/realtime/useStartupsRealtime";

const DashboardHeader = ({ title }: { title: string }) => {
  
  const { data: profile } = useProfile();
  useNotificationRealtime(profile?.id);
  useProfilesRealtime();
  useStartupsRealtime();
    console.log("DashboardHeader Rendered");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h2 className="text-xl font-semibold">{title}</h2>
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

export default DashboardHeader;
