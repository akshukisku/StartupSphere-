import { create } from "zustand";

interface AdminUIStore {
  previewOpen: boolean;
  rejectDialogOpen: boolean;

  selectedStartupId: string | null;
  selectedStartupForRejectId: string | null;

  search: {
    founders: string;
    investors: string;
    mentors: string;
    users: string;
    startups: string;
  };
  filters: {
    founders: {
      approval: string;
      account: string;
    };

    investors: {
      approval: string;
      account: string;
    };

    mentors: {
      approval: string;
      account: string;
    };

    users: {
      approval: string;
      account: string;
    };
  };

  setFilter: (
    section: keyof AdminUIStore["filters"],
    key: "approval" | "account",
    value: string,
  ) => void;

  openStartupPreview: (startupId: string) => void;
  closeStartupPreview: () => void;

  openRejectDialog: (startupId: string) => void;
  closeRejectDialog: () => void;

  setSearch: (key: keyof AdminUIStore["search"], value: string) => void;
}

export const useAdminStore = create<AdminUIStore>((set) => ({
  previewOpen: false,
  rejectDialogOpen: false,

  selectedStartupId: null,
  selectedStartupForRejectId: null,

  search: {
    founders: "",
    investors: "",
    mentors: "",
    users: "",
    startups: "",
  },
  filters: {
    founders: {
      approval: "all",
      account: "all",
    },
    investors: {
      approval: "all",
      account: "all",
    },
    mentors: {
      approval: "all",
      account: "all",
    },
    users: {
      approval: "all",
      account: "all",
    },
  },

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

  setSearch: (key, value) =>
    set((state) => ({
      search: {
        ...state.search,
        [key]: value,
      },
    })),
  setFilter: (section, key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [section]: {
          ...state.filters[section],
          [key]: value,
        },
      },
    })),
}));
