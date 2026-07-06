"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  founderMenu,
  mentorMenu,
  investorMenu,
  adminMenu,
} from "@/constants/sidebar.constant";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut, Settings, UserCircle2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarFooter } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfile } from "@/hooks/profile/useProfile";

export const AppSidebar = () => {
  const pathname = usePathname();

  // Adjust the selector below to match your store's actual shape,
  // e.g. useAuthStore((s) => s.user?.role)

  const sidebarMenus = {
    founder: founderMenu,
    mentor: mentorMenu,
    investor: investorMenu,
    admin: adminMenu,
  };
  const { role, logout } = useAuthStore();

    const { data: user } = useProfile();
  
  const menu = sidebarMenus[role as keyof typeof sidebarMenus] || [];

  const isItemActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);



  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="font-semibold tracking-tight">
                StartupSphere+
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {!role ? (
              // Loading state while the role hasn't resolved yet
              Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))
            ) : menu.length === 0 ? (
              <SidebarMenuItem>
                <span className="px-2 text-xs text-muted-foreground">
                  No menu items available
                </span>
              </SidebarMenuItem>
            ) : (
              menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isItemActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          border
          border-border/50
          p-2
          transition-colors
          hover:bg-accent
        "
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />

                <AvatarFallback>
                  {user?.full_name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-left">
                <p className="truncate text-sm font-semibold">
                  {user?.full_name ?? "Guest"}
                </p>

                <p className="truncate text-xs text-muted-foreground">{role}</p>
              </div>

              <ChevronsUpDown className="h-4 w-4 opacity-60" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href={`/${role}/profile`}>
                <UserCircle2 className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem className="text-destructive" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
