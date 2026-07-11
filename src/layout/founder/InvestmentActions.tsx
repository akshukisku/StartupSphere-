"use client";

import { Button } from "@/components/ui/button";

import { FounderInvestmentRow } from "./InvestmentColumns";
import { useUpdateInvestmentRequestStatus } from "@/hooks/investment/useInvestment";
import { InvestmentStatus } from "@/types/enum/enum";
import UserActionDialog from "@/app/admin/UserActionDialog";

interface InvestmentActionsProps {
  request: FounderInvestmentRow;
}

const InvestmentActions = ({ request }: InvestmentActionsProps) => {
  const { mutateAsync } = useUpdateInvestmentRequestStatus();
  const isPending = request.status === InvestmentStatus.PENDING;

  return (
    <div className="flex items-center gap-2">
      <UserActionDialog
        title="Accept Investment Request"
        description="Are you sure you want to accept this investment request?"
        onConfirm={() =>
          mutateAsync({
            requestId: request.id,
            status: InvestmentStatus.ACCEPTED,
          })
        }
        trigger={
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            disabled={!isPending}
          >
            Accept
          </Button>
        }
      />
      <UserActionDialog
        title="Reject Investment Request"
        description="Are you sure you want to reject this investment request?"
        onConfirm={() =>
          mutateAsync({
            requestId: request.id,
            status: InvestmentStatus.REJECTED,
          })
        }
        trigger={
          <Button size="sm" variant="destructive" disabled={!isPending}>
            Reject
          </Button>
        }
      />
    </div>
  );
};

export default InvestmentActions;
