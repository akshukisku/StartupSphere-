import { create } from "zustand";

interface ProfileState {
  avatarFile: File | null;
  avatarPreview: string | null;
  removeAvatarOnSave: boolean;

  setAvatar: (file: File | null) => void;
  removeAvatar: () => void;
  resetAvatar: () => void;
  setSignedAvatar: (url: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  avatarFile: null,
  avatarPreview: null,
  removeAvatarOnSave: false,

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

  setSignedAvatar: (url) => {
    const previous = get().avatarPreview;

    if (previous?.startsWith("blob:")) {
      URL.revokeObjectURL(previous);
    }

    set({
      avatarFile: null,
      avatarPreview: url,
      removeAvatarOnSave: false,
    });
  },
}));