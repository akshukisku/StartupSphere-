import { getCookie } from "cookies-next";

export const getUserRole = () => getCookie("role");

export const getApprovalStatus = () => getCookie("approval_status");

export const getUser = () => {
  const user = getCookie("user");
  return user ? JSON.parse(user as string) : null;
};

export const getToken = () => getCookie("token");
