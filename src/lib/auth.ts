import { getCookie } from "cookies-next";

import { supabase } from "@/lib/supabase.config";

export const getUserRole = () => getCookie("role");

export const getApprovalStatus = () => getCookie("approval_status");

export const getUser = () => {
  const user = getCookie("user");
  return user ? JSON.parse(user as string) : null;
};

export const getToken = () => getCookie("token");

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  return user;
};
