"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { TableColumn } from "@/types/type/table.type";
import { Founder } from "@/types/interface/founder.interface";

import FounderActions from "./FounderActions";
import AdminApprovalBadge from "@/components/dashboard/AdminApprovalBadge";
import AdminAccountBadge from "@/components/dashboard/AdminAccountBadge";



export const founderColumns: TableColumn<Founder>[] = [
  {
    header: "Founder",
    key: "full_name",

    render: (founder) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={founder.avatar_path ?? ""}
            alt={founder.full_name}
          />

          <AvatarFallback>
            {founder.full_name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate font-medium">
            {founder.full_name}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {founder.email}
          </p>
        </div>
      </div>
    ),
  },

  {
    header: "Startup",
    key: "startup",

    render: (founder) =>
      founder.startup ? (
        <Badge variant="outline">
          {founder.startup.startup_name}
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">
          No Startup
        </span>
      ),
  },

  {
    header: "Approval",
    key: "approval_status",

    render: (founder) => (
      <AdminApprovalBadge
        status={founder.approval_status}
      />
    ),
  },

  {
    header: "Account",
    key: "is_verified",

    render: (founder) => (
    <AdminAccountBadge
  isVerified={founder.is_verified}
/>
    ),
  },

  {
    header: "Joined",
    key: "created_at",

    render: (founder) =>
      new Date(founder.created_at).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
  },

  {
    header: "Actions",
    key: "id",
    headerClassName: "text-right",
    cellClassName: "text-right",

    render: (founder) => (
      <FounderActions founder={founder} />
    ),
  },
];