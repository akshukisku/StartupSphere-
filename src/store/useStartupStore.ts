import { create } from "zustand";

import { StartupState } from "@/types/interface/startup.interface";

const MAX_IMAGES = 8;

export const useStartupStore = create<StartupState>((set, get) => ({
  // ==========================================
  // Initial State
  // ==========================================

  logoFile: null,
  logoPreview: null,
  removeLogoOnSave: false,

  coverFile: null,
  coverPreview: null,

  showcaseFiles: [],
  showcasePreviews: [],
  removedShowcaseIds: [],

  avatarFile: null,
  avatarPreview: null,
  removeAvatarOnSave: false,

  // ==========================================
  // Logo
  // ==========================================

  setLogo: (file) => {
    const previous = get().logoPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      logoFile: file,
      logoPreview: file ? URL.createObjectURL(file) : null,
      removeLogoOnSave: false,
    });
  },

  removeLogo: () => {
    const previous = get().logoPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      logoFile: null,
      logoPreview: null,
      removeLogoOnSave: true,
    });
  },

  // ==========================================
  // Cover
  // ==========================================

  setCover: (file) => {
    const previous = get().coverPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      coverFile: file,
      coverPreview: file ? URL.createObjectURL(file) : null,
    });
  },

  removeCover: () => {
    const previous = get().coverPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      coverFile: null,
      coverPreview: null,
    });
  },

  // ==========================================
  // Showcase
  // ==========================================

  addShowcaseFiles: (files) => {
    const currentFiles = get().showcaseFiles;
    const currentPreviews = get().showcasePreviews;

    const availableSlots = MAX_IMAGES - currentFiles.length;

    const selectedFiles = files.slice(0, availableSlots);

    set({
      showcaseFiles: [...currentFiles, ...selectedFiles],
      showcasePreviews: [
        ...currentPreviews,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ],
    });
  },

  removeNewShowcaseFile: (index) => {
    const files = [...get().showcaseFiles];
    const previews = [...get().showcasePreviews];

    const preview = previews[index];

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    files.splice(index, 1);
    previews.splice(index, 1);

    set({
      showcaseFiles: files,
      showcasePreviews: previews,
    });
  },

  removeExistingShowcaseFile: (id) => {
    set((state) => ({
      removedShowcaseIds: [...state.removedShowcaseIds, id],
    }));
  },

  clearShowcaseFiles: () => {
    get().showcasePreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    set({
      showcaseFiles: [],
      showcasePreviews: [],
      removedShowcaseIds: [],
    });
  },

  // ==========================================
  // Avatar
  // ==========================================

  setAvatar: (file) => {
    const previous = get().avatarPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      avatarFile: file,
      avatarPreview: file ? URL.createObjectURL(file) : null,
      removeAvatarOnSave: false,
    });
  },

  removeAvatar: () => {
    const previous = get().avatarPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      avatarFile: null,
      avatarPreview: null,
      removeAvatarOnSave: true,
    });
  },

  resetAvatar: () => {
    const previous = get().avatarPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      avatarFile: null,
      avatarPreview: null,
      removeAvatarOnSave: false,
    });
  },

  // ==========================================
  // Reset All Media
  // ==========================================

  resetMediaState: () => {
    const {
      logoPreview,
      coverPreview,
      showcasePreviews,
      avatarPreview,
    } = get();

    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }

    if (coverPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    if (avatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    showcasePreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    set({
      logoFile: null,
      logoPreview: null,
      removeLogoOnSave: false,

      coverFile: null,
      coverPreview: null,

      showcaseFiles: [],
      showcasePreviews: [],
      removedShowcaseIds: [],

      avatarFile: null,
      avatarPreview: null,
      removeAvatarOnSave: false,
    });
  },
}));