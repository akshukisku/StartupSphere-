"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { TableColumn } from "@/types/type/table.type";
import { Founder } from "@/types/interface/founder.interface";
import FounderActions from "./FounderActions";


export const founderColumns: TableColumn<Founder>[] = [
  {
    header: "Founder",
    key: "full_name",

    render: (founder) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={founder.avatar_path ?? ""} />

          <AvatarFallback>
            {founder.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-medium">
            {founder.full_name}
          </p>

          <p className="text-sm text-muted-foreground">
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
        <span className="text-muted-foreground">
          No Startup
        </span>
      ),
  },

  {
    header: "Approval",
    key: "approval_status",

    render: (founder) => (
      <Badge
        variant={
          founder.approval_status === "approved"
            ? "default"
            : founder.approval_status === "pending"
            ? "secondary"
            : "destructive"
        }
      >
        {founder.approval_status}
      </Badge>
    ),
  },

  {
    header: "Account",
    key: "is_verified",

    render: (founder) => (
      <Badge
        variant={
          founder.is_verified
            ? "default"
            : "secondary"
        }
      >
        {founder.is_verified
          ? "Active"
          : "Disabled"}
      </Badge>
    ),
  },

  {
    header: "Joined",
    key: "created_at",

    render: (founder) =>
      new Date(founder.created_at).toLocaleDateString(),
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