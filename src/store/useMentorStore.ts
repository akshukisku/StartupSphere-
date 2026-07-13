import { create } from "zustand";

interface Mentor {
  id: string;
  full_name: string;
  email: string;
  avatar_path: string | null;
}

interface MentorStore {
  isRequestDialogOpen: boolean;

  selectedMentor: Mentor | null;

  openRequestDialog: (mentor: Mentor) => void;

  closeRequestDialog: () => void;
}

export const useMentorStore = create<MentorStore>((set) => ({
  isRequestDialogOpen: false,

  selectedMentor: null,

  openRequestDialog: (mentor) =>
    set({
      isRequestDialogOpen: true,
      selectedMentor: mentor,
    }),

  closeRequestDialog: () =>
    set({
      isRequestDialogOpen: false,
      selectedMentor: null,
    }),
}));