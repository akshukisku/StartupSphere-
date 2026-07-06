"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { toast } from "sonner";

import { useAuthStore } from "@/store/useAuthStore";

import { useProfile, useProfileAvatar } from "@/hooks/profile/useProfile";

const NavUser = () => {
  const router = useRouter();

  const { logout } = useAuthStore();

  const { data: profile } = useProfile();

  const avatarUrl = useProfileAvatar(
    profile?.avatar_url
  );

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((name:any) => name[0])
      .join("")
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          {avatarUrl ? (
            <AvatarImage
              src={avatarUrl}
              alt={profile?.full_name}
            />
          ) : (
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <div className="space-y-1 px-3 py-3">
          <p className="font-semibold">
            {profile?.full_name ?? "User"}
          </p>

          <p className="text-xs text-muted-foreground">
            {profile?.email}
          </p>

          <p className="text-xs font-medium capitalize text-primary">
            {profile?.role}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            router.push("/profile")
          }
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;