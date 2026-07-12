"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { InvestorInvestmentRow } from "@/layout/investor/InvestmentColumns";
import { useInvestmentStore } from "@/store/useInvestmentStore";



const InvestmentDetailsDialog = () => {

    const {
  isInvestmentDetailsDialogOpen,
  selectedRequest,
  closeInvestmentDetailsDialog,
} = useInvestmentStore();

if (!selectedRequest) return null;

  return (
<Dialog
  open={isInvestmentDetailsDialogOpen}
  onOpenChange={(open) => {
    if (!open) {
      closeInvestmentDetailsDialog();
    }
  }}
>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Investment Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          <div>
            <h3 className="text-sm text-muted-foreground">
              Startup
            </h3>

            <p className="font-semibold">
              {selectedRequest.startup.startup_name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <h3 className="text-sm text-muted-foreground">
                Investment Amount
              </h3>

              <p className="font-medium">
                ₹{selectedRequest.amount.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground">
                Equity Offered
              </h3>

              <p className="font-medium">
                {selectedRequest.equity_offer}%
              </p>
            </div>

          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">
              Status
            </h3>

            <Badge>
              {selectedRequest.status}
            </Badge>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">
              Message
            </h3>

            <p className="rounded-lg border p-4 text-sm leading-6">
              {selectedRequest.message}
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDetailsDialog;