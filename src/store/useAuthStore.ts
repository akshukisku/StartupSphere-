import {
  loginUserFns,
  logoutUserFns,
  registerUserFns,
} from "@/api/function/auth.function";
import { AuthState, Profile, RegisterPayload } from "@/types/interface/auth.interface";
import { getCookie } from "cookies-next";
import { create } from "zustand";

const readProfileFromCookie = (): Profile | null => {
  const user = getCookie("user");
  if (!user) return null;

  try {
    return JSON.parse(user as string) as Profile;
  } catch {
    return null;
  }
};

const initialProfile = readProfileFromCookie();
const token = getCookie("token");

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  isAuthenticated: !!token,

  profile: initialProfile,
  role: initialProfile?.role ?? null,

  isError: null,

  registerUser: async (payload: RegisterPayload) => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await registerUserFns(payload);

    set({
      isLoading: false,
      isError: response.success ? null : response.message,
    });

    return response.success;
  },

  login: async (email, password) => {
    set({
      isLoading: true,
      isError: null,
    });

    const response = await loginUserFns(email, password);

    // profile/token cookies are expected to be set by the API response
    // handler by this point, so re-read them here.
    const profile = response.success ? readProfileFromCookie() : null;

    set({
      isLoading: false,
      isAuthenticated: response.success,
      isError: response.success ? null : response.message,
      profile,
      role: profile?.role ?? null,
    });

    return response.success;
  },

  logout: async () => {
    const response = await logoutUserFns();

    if (response.success) {
      set({
        isAuthenticated: false,
        isError: null,
        profile: null,
        role: null,
      });
    } else {
      set({
        isError: response.message,
      });
    }
  },

  // Call this if the "user" cookie can change outside of login/logout
  // (e.g. after a profile update elsewhere) to resync role/profile.
  refreshProfileFromCookie: () => {
    const profile = readProfileFromCookie();
    set({
      profile,
      role: profile?.role ?? null,
    });
  },
  clearProfile: () =>
  set({
    profile: null,
   }),
}));