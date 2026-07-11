import { create } from "zustand";

interface InvestmentStore {
  isInvestmentDialogOpen: boolean;

  openInvestmentDialog: () => void;

  closeInvestmentDialog: () => void;
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  isInvestmentDialogOpen: false,

  openInvestmentDialog: () =>
    set({
      isInvestmentDialogOpen: true,
    }),

  closeInvestmentDialog: () =>
    set({
      isInvestmentDialogOpen: false,
    }),
}));