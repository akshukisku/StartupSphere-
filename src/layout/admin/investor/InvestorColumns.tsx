"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



import { Investor } from "@/types/interface/admin.interface";
import { TableColumn } from "@/types/type/table.type";

import AdminApprovalBadge from "@/components/dashboard/AdminApprovalBadge";
import AdminAccountBadge from "@/components/dashboard/AdminAccountBadge";
import InvestorActions from "./InvestorActions";

export const investorColumns: TableColumn<Investor>[] = [
  {
    header: "Investor",
    key: "full_name",
    render: (investor) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={investor.avatar_path ?? ""}
            alt={investor.full_name}
          />

          <AvatarFallback>
            {investor.full_name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate font-medium">
            {investor.full_name}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {investor.email}
          </p>
        </div>
      </div>
    ),
  },

  {
    header: "Joined",
    key: "created_at",
    render: (investor) =>
      new Date(
        investor.created_at
      ).toLocaleDateString(),
  },

  {
    header: "Approval",
    key: "approval_status",
    render: (investor) => (
      <AdminApprovalBadge
        status={investor.approval_status}
      />
    ),
  },

  {
    header: "Account",
    key: "is_verified",
    render: (investor) => (
      <AdminAccountBadge
        isVerified={investor.is_verified}
      />
    ),
  },

  {
    header: "Actions",
    key: "id",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (investor) => (
      <InvestorActions investor={investor} />
    ),
  },
];