import { create } from "zustand";

import { MentorSessionFormValues } from "@/service/validation/mentor.validation";

interface EditSessionStore {
  isOpen: boolean;

  sessionId: string | null;

  sessionData: Partial<MentorSessionFormValues> | null;

  openDialog: (
    sessionId: string,
    sessionData: Partial<MentorSessionFormValues>
  ) => void;

  closeDialog: () => void;
}

export const useEditSessionStore = create<EditSessionStore>((set) => ({
  isOpen: false,

  sessionId: null,

  sessionData: null,

  openDialog: (sessionId, sessionData) =>
    set({
      isOpen: true,
      sessionId,
      sessionData,
    }),

  closeDialog: () =>
    set({
      isOpen: false,
      sessionId: null,
      sessionData: null,
    }),
}));