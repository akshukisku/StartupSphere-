"use client";

import { Button } from "@/components/ui/button";

import { InvestorInvestmentRow } from "./InvestmentColumns";
import { useInvestmentStore } from "@/store/useInvestmentStore";

interface InvestmentActionsProps {
  request: InvestorInvestmentRow;
}

const InvestmentActions = ({
  request,
}: InvestmentActionsProps) => {
const { openInvestmentDetailsDialog } = useInvestmentStore();  return (
 <Button
  size="sm"
  variant="outline"
  onClick={() => openInvestmentDetailsDialog(request)}
>
  View Details
</Button>
  );
};

export default InvestmentActions;