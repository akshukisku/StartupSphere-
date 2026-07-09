"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface AdminApprovalBadgeProps {
  status: "approved" | "pending" | "rejected";
}

const AdminApprovalBadge = ({
  status,
}: AdminApprovalBadgeProps) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="gap-1 bg-emerald-500 text-white hover:bg-emerald-600">
          <CheckCircle2 className="h-3 w-3" />
          Approved
        </Badge>
      );

    case "pending":
      return (
        <Badge className="gap-1 bg-amber-500 text-white hover:bg-amber-600">
          <Clock3 className="h-3 w-3" />
          Pending
        </Badge>
      );

    case "rejected":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      );

    default:
      return null;
  }
};

export default AdminApprovalBadge;