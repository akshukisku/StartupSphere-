import { create } from "zustand";

interface MentorEvaluationStore {
  isOpen: boolean;

  sessionId: string | null;

  assignmentId: string | null;

  startupName: string | null;

  openDialog: (
    sessionId: string,
    assignmentId: string,
    startupName: string
  ) => void;

  closeDialog: () => void;
}

export const useMentorEvaluationStore =
  create<MentorEvaluationStore>((set) => ({
    isOpen: false,

    sessionId: null,

    assignmentId: null,

    startupName: null,

    openDialog: (
      sessionId,
      assignmentId,
      startupName
    ) =>
      set({
        isOpen: true,
        sessionId,
        assignmentId,
        startupName,
      }),

    closeDialog: () =>
      set({
        isOpen: false,
        sessionId: null,
        assignmentId: null,
        startupName: null,
      }),
  }));