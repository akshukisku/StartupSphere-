"use client";

import {
  CheckCircle2,
  Ban,
} from "lucide-react";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import UserActionDialog from "@/app/admin/UserActionDialog";
import AdminActionMenu from "@/components/dashboard/AdminActionMenu";

import { Investor } from "@/types/interface/admin.interface";
import { useUpdateInvestorVerification } from "@/hooks/admin/useInvestorManagement";


interface InvestorActionsProps {
  investor: Investor;
}

const InvestorActions = ({
  investor,
}: InvestorActionsProps) => {
  const { mutateAsync } =
    useUpdateInvestorVerification();

  return (
    <AdminActionMenu>
      {investor.is_verified ? (
        <UserActionDialog
          title="Disable Investor"
          description="Are you sure you want to disable this investor account?"
          onConfirm={() =>
            mutateAsync({
              investorId: investor.id,
              isVerified: false,
            })
          }
          trigger={
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Ban className="mr-2 h-4 w-4" />
              Disable Account
            </DropdownMenuItem>
          }
        />
      ) : (
        <UserActionDialog
          title="Enable Investor"
          description="Are you sure you want to enable this investor account?"
          onConfirm={() =>
            mutateAsync({
              investorId: investor.id,
              isVerified: true,
            })
          }
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Enable Account
            </DropdownMenuItem>
          }
        />
      )}
    </AdminActionMenu>
  );
};

export default InvestorActions;