import {
  approveUserFns,
  fetchAdminStatsFns,
  fetchPendingUsersFns,
  rejectUserFns,
  fetchPendingStartupsFns,
  fetchStartupByIdFns,
  approveStartupFns,
  rejectStartupFns,
} from "@/api/function/admin.function";

import { create } from "zustand";

import { AdminState } from "@/types/interface/admin.interface";
import { useAuthStore } from "./useAuthStore";

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  pendingStartups: [],
  stats: null,

  isLoading: false,
  isError: null,
  previewOpen: false,

  selectedStartup: null,
  startupPreviewOpen: false,
  rejectDialogOpen: false,

  selectedStartupForReject: null,

  // ==========================
  // Pending Users
  // ==========================

  fetchPendingUsers: async () => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await fetchPendingUsersFns();

    set({
      users: response.data,
      isLoading: false,
      isError: response.success ? null : response.message,
    });
  },

  approveUser: async (userId: string) => {
    const response = await approveUserFns(userId);

    if (response.success) {
      await get().fetchPendingUsers();
    } else {
      set({
        isError: response.message,
      });
    }

    return response.success;
  },

  rejectUser: async (userId: string) => {
    const response = await rejectUserFns(userId);

    if (response.success) {
      await get().fetchPendingUsers();
    } else {
      set({
        isError: response.message,
      });
    }

    return response.success;
  },

  // ==========================
  // Pending Startups
  // ==========================

  fetchPendingStartups: async () => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await fetchPendingStartupsFns();

    if (response.success) {
      set({
        pendingStartups: response.data,
        isLoading: false,
        isError: null,
      });
    } else {
      set({
        pendingStartups: [],
        isLoading: false,
        isError: response.message,
      });
    }
  },
  fetchStartupById: async (startupId: string) => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await fetchStartupByIdFns(startupId);

    if (response.success) {
      set({
        selectedStartup: response.data,
        startupPreviewOpen: true,
        isLoading: false,
      });
      console.log("Preview opened");
    } else {
      set({
        selectedStartup: null,
        startupPreviewOpen: false,
        isLoading: false,
        isError: response.message,
      });
    }
  },

  approveStartup: async (startupId: string) => {
    console.log("Approve");
    const admin = useAuthStore.getState().profile;

    if (!admin) {
      set({
        isError: "Admin not found.",
      });

      return false;
    }

    const response = await approveStartupFns(startupId, admin.id);

    console.log(response);
    if (response.success) {
      await get().fetchPendingStartups();

      get().closeStartupPreview();
    } else {
      set({
        isError: response.message,
      });
    }

    return response.success;
  },

  rejectStartup: async (startupId, reason) => {
    const admin = useAuthStore.getState().profile;

    if (!admin) {
      set({
        isError: "Admin not found.",
      });

      return false;
    }

    const response = await rejectStartupFns(startupId, admin.id, reason);

    if (response.success) {
      await get().fetchPendingStartups();

      get().closeStartupPreview();
    } else {
      set({
        isError: response.message,
      });
    }

    return response.success;
  },

  fetchDashboardStats: async () => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await fetchAdminStatsFns();

    if (response.success) {
      set({
        stats: response.data,
        isLoading: false,
      });
    } else {
      set({
        isError: response.message,
        isLoading: false,
      });
    }
  },
  openStartupPreview: (startup) => {
    set({
      previewOpen: true,
      selectedStartup: startup,
    });
  },

  closeStartupPreview: () => {
    set({
      previewOpen: false,
      selectedStartup: null,
    });
  },
  openRejectDialog: (startup) => {
    set({
      rejectDialogOpen: true,
      selectedStartupForReject: startup,
    });
  },

  closeRejectDialog: () => {
    set({
      rejectDialogOpen: false,
      selectedStartupForReject: null,
    });
  },
}));
