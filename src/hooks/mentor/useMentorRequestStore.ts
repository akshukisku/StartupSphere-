import { MentorRequestRow } from "@/types/interface/mentor.interface";
import { create } from "zustand";

interface MentorRequestStore {
  isDetailsDialogOpen: boolean;

  selectedRequest: MentorRequestRow | null;

  openDetailsDialog: (
    request: MentorRequestRow
  ) => void;

  closeDetailsDialog: () => void;
}

export const useMentorRequestStore =
  create<MentorRequestStore>((set) => ({
    isDetailsDialogOpen: false,

    selectedRequest: null,

    openDetailsDialog: (request) =>
      set({
        isDetailsDialogOpen: true,
        selectedRequest: request,
      }),

    closeDetailsDialog: () =>
      set({
        isDetailsDialogOpen: false,
        selectedRequest: null,
      }),
  }));