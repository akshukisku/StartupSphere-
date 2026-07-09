"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminFiltersProps {
  approval: string;
  account: string;

  onApprovalChange: (value: string) => void;
  onAccountChange: (value: string) => void;
}

const AdminFilters = ({
  approval,
  account,
  onApprovalChange,
  onAccountChange,
}: AdminFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={approval}
        onValueChange={onApprovalChange}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Approval" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Approval</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={account}
        onValueChange={onAccountChange}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Account" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Accounts</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="disabled">Disabled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AdminFilters;