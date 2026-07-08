import { create } from "zustand";

interface CompleteSessionStore {
  isOpen: boolean;

  sessionId: string | null;

  sessionTitle: string;

  openDialog: (
    sessionId: string,
    sessionTitle: string
  ) => void;

  closeDialog: () => void;
}

export const useCompleteSessionStore =
  create<CompleteSessionStore>((set) => ({
    isOpen: false,

    sessionId: null,

    sessionTitle: "",

    openDialog: (
      sessionId,
      sessionTitle
    ) =>
      set({
        isOpen: true,
        sessionId,
        sessionTitle,
      }),

    closeDialog: () =>
      set({
        isOpen: false,
        sessionId: null,
        sessionTitle: "",
      }),
  }));