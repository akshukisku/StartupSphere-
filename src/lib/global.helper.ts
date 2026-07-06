import { getPitchDeckSignedUrlFns } from "@/api/function/pitchDeck.function";

export const downloadPitchDeck = async (
  filePath: string,
  fileName: string
) => {
  const res = await getPitchDeckSignedUrlFns(filePath);

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  // Create a temporary anchor element
  const link = document.createElement("a");

  link.href = res.data;
  link.download = fileName;
  link.target = "_blank";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export const getRelativeTime = (
  date: string
) => {
  const now = new Date();

  const notificationDate =
    new Date(date);

  const seconds = Math.floor(
    (now.getTime() -
      notificationDate.getTime()) /
      1000
  );

  if (seconds < 60)
    return "Just now";

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60)
    return `${minutes} minute${
      minutes > 1 ? "s" : ""
    } ago`;

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24)
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } ago`;

  const days = Math.floor(hours / 24);

  if (days === 1)
    return "Yesterday";

  if (days < 7)
    return `${days} days ago`;

  const weeks = Math.floor(days / 7);

  if (weeks < 5)
    return `${weeks} week${
      weeks > 1 ? "s" : ""
    } ago`;

  const months = Math.floor(days / 30);

  if (months < 12)
    return `${months} month${
      months > 1 ? "s" : ""
    } ago`;

  const years = Math.floor(days / 365);

  return `${years} year${
    years > 1 ? "s" : ""
  } ago`;
};


export const dashboardRoutes = {
  admin: "/admin/dashboard",
  founder: "/founder/dashboard",
  investor: "/investor/dashboard",
  mentor: "/mentor/dashboard",
} as const;

export const getDashboardRoute = (role?: string | null) => {
  if (!role) return "/";

  return (
    dashboardRoutes[
      role as keyof typeof dashboardRoutes
    ] ?? "/"
  );
};