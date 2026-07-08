import { create } from "zustand";

interface MentorSessionStore {
  isScheduleDialogOpen: boolean;

  selectedAssignmentId: string | null;

  selectedStartupName: string;

  openScheduleDialog: (
    assignmentId: string,
    startupName: string
  ) => void;

  closeScheduleDialog: () => void;
}

export const useMentorSessionStore =
  create<MentorSessionStore>((set) => ({
    isScheduleDialogOpen: false,

    selectedAssignmentId: null,

    selectedStartupName: "",

    openScheduleDialog: (
      assignmentId,
      startupName
    ) =>
      set({
        isScheduleDialogOpen: true,
        selectedAssignmentId: assignmentId,
        selectedStartupName: startupName,
      }),

    closeScheduleDialog: () =>
      set({
        isScheduleDialogOpen: false,
        selectedAssignmentId: null,
        selectedStartupName: "",
      }),
  }));