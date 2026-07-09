"use client";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface AdminAccountBadgeProps {
  isVerified: boolean;
}

const AdminAccountBadge = ({
  isVerified,
}: AdminAccountBadgeProps) => {
  return isVerified ? (
    <Badge className="gap-1 bg-emerald-500 text-white hover:bg-emerald-600">
      <CheckCircle2 className="h-3 w-3" />
      Active
    </Badge>
  ) : (
    <Badge
      variant="secondary"
      className="gap-1"
    >
      <XCircle className="h-3 w-3" />
      Disabled
    </Badge>
  );
};

export default AdminAccountBadge;