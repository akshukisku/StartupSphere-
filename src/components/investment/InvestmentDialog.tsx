"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import InvestmentSummary from "./InvestmentSummary";
import InvestmentForm from "./InvestmentForm";

import { useInvestmentStore } from "@/store/useInvestmentStore";
import { InvestorStartup } from "@/types/interface/investor.interface";

interface InvestmentDialogProps {
  startup: InvestorStartup;
}

const InvestmentDialog = ({
  startup,
}: InvestmentDialogProps) => {
  const {
    isInvestmentDialogOpen,
    closeInvestmentDialog,
  } = useInvestmentStore();

  return (
    <Dialog
      open={isInvestmentDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeInvestmentDialog();
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invest in Startup</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <InvestmentSummary startup={startup} />
          <InvestmentForm startup={startup} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDialog;