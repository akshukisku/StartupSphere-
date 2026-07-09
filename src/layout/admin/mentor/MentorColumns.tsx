"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import AdminApprovalBadge from "@/components/dashboard/AdminApprovalBadge";
import AdminAccountBadge from "@/components/dashboard/AdminAccountBadge";

import { Mentor } from "@/types/interface/admin.interface";
import { TableColumn } from "@/types/type/table.type";
import MentorActions from "./MentorActions";


export const mentorColumns: TableColumn<Mentor>[] = [
  {
    header: "Mentor",
    key: "full_name",
    render: (mentor) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={mentor.avatar_path ?? ""}
            alt={mentor.full_name}
          />

          <AvatarFallback>
            {mentor.full_name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate font-medium">
            {mentor.full_name}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {mentor.email}
          </p>
        </div>
      </div>
    ),
  },

  {
    header: "Joined",
    key: "created_at",
    render: (mentor) =>
      new Date(
        mentor.created_at
      ).toLocaleDateString(),
  },

  {
    header: "Approval",
    key: "approval_status",
    render: (mentor) => (
      <AdminApprovalBadge
        status={mentor.approval_status}
      />
    ),
  },

  {
    header: "Account",
    key: "is_verified",
    render: (mentor) => (
      <AdminAccountBadge
        isVerified={mentor.is_verified}
      />
    ),
  },

  {
    header: "Actions",
    key: "id",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (mentor) => (
      <MentorActions mentor={mentor} />
    ),
  },
];