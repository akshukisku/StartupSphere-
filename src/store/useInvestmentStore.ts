import { create } from "zustand";

import { InvestorInvestmentRow } from "@/layout/investor/InvestmentColumns";

interface InvestmentStore {
  // ----------------------------
  // Create Investment Dialog
  // ----------------------------
  isInvestmentDialogOpen: boolean;

  openInvestmentDialog: () => void;

  closeInvestmentDialog: () => void;

  // ----------------------------
  // Investment Details Dialog
  // ----------------------------
  isInvestmentDetailsDialogOpen: boolean;

  selectedRequest: InvestorInvestmentRow | null;

  openInvestmentDetailsDialog: (
    request: InvestorInvestmentRow
  ) => void;

  closeInvestmentDetailsDialog: () => void;
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  // ----------------------------
  // Create Investment Dialog
  // ----------------------------
  isInvestmentDialogOpen: false,

  openInvestmentDialog: () =>
    set({
      isInvestmentDialogOpen: true,
    }),

  closeInvestmentDialog: () =>
    set({
      isInvestmentDialogOpen: false,
    }),

  // ----------------------------
  // Investment Details Dialog
  // ----------------------------
  isInvestmentDetailsDialogOpen: false,

  selectedRequest: null,

  openInvestmentDetailsDialog: (request) =>
    set({
      isInvestmentDetailsDialogOpen: true,
      selectedRequest: request,
    }),

  closeInvestmentDetailsDialog: () =>
    set({
      isInvestmentDetailsDialogOpen: false,
      selectedRequest: null,
    }),
}));