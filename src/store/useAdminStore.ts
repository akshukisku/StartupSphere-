import { create } from "zustand";

interface AdminUIStore {
  previewOpen: boolean;
  rejectDialogOpen: boolean;

  selectedStartupId: string | null;
  selectedStartupForRejectId: string | null;

  openStartupPreview: (startupId: string) => void;
  closeStartupPreview: () => void;

  openRejectDialog: (startupId: string) => void;
  closeRejectDialog: () => void;
}

export const useAdminStore = create<AdminUIStore>((set) => ({
  previewOpen: false,
  rejectDialogOpen: false,

  selectedStartupId: null,
  selectedStartupForRejectId: null,

  openStartupPreview: (startupId) =>
    set({
      previewOpen: true,
      selectedStartupId: startupId,
    }),

  closeStartupPreview: () =>
    set({
      previewOpen: false,
      selectedStartupId: null,
    }),

  openRejectDialog: (startupId) =>
    set({
      rejectDialogOpen: true,
      selectedStartupForRejectId: startupId,
    }),

  closeRejectDialog: () =>
    set({
      rejectDialogOpen: false,
      selectedStartupForRejectId: null,
    }),
}));