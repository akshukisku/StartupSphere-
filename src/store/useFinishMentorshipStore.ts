import { create } from "zustand";

interface FinishMentorshipStore {
  isOpen: boolean;

  assignmentId: string | null;

  startupName: string | null;

  openDialog: (
    assignmentId: string,
    startupName: string
  ) => void;

  closeDialog: () => void;
}

export const useFinishMentorshipStore =
  create<FinishMentorshipStore>((set) => ({
    isOpen: false,

    assignmentId: null,

    startupName: null,

    openDialog: (assignmentId, startupName) =>
      set({
        isOpen: true,
        assignmentId,
        startupName,
      }),

    closeDialog: () =>
      set({
        isOpen: false,
        assignmentId: null,
        startupName: null,
      }),
  }));