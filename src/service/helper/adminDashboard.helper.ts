import { AdminDashboardStats, RoleDistribution, StartupStatus } from "@/types/interface/admin.interface";
import { MonthlyGrowth } from "@/types/interface/admin.interface";


interface BuildDashboardStatsParams {
  users: {
    role: string;
    approval_status: string;
  }[];

  startups: {
    status: string;
  }[];

  mentorAssignments: {
    status: string;
  }[];
}

interface BuildStartupStatusParams {
  startups: {
    status: string;
  }[];
}


export const buildDashboardStats = ({
  users,
  startups,
  mentorAssignments,
}: BuildDashboardStatsParams): AdminDashboardStats => {
  return {
    totalUsers: users.length,

    pendingUsers: users.filter(
      (user) => user.approval_status === "pending"
    ).length,

    approvedUsers: users.filter(
      (user) => user.approval_status === "approved"
    ).length,

    rejectedUsers: users.filter(
      (user) => user.approval_status === "rejected"
    ).length,

    founders: users.filter(
      (user) => user.role === "founder"
    ).length,

    investors: users.filter(
      (user) => user.role === "investor"
    ).length,

    mentors: users.filter(
      (user) => user.role === "mentor"
    ).length,

    totalStartups: startups.length,

    pendingStartups: startups.filter(
      (startup) => startup.status === "pending"
    ).length,

    approvedStartups: startups.filter(
      (startup) => startup.status === "approved"
    ).length,

    rejectedStartups: startups.filter(
      (startup) => startup.status === "rejected"
    ).length,

    activeMentorships: mentorAssignments.filter(
      (assignment) => assignment.status === "assigned"
    ).length,

    completedMentorships: mentorAssignments.filter(
      (assignment) => assignment.status === "completed"
    ).length,
  };
};

interface BuildMonthlyGrowthParams {
  users: {
    created_at: string;
  }[];
}

export const buildMonthlyGrowth = ({
  users,
}: BuildMonthlyGrowthParams): MonthlyGrowth[] => {
  const monthMap = new Map<string, number>();

  users.forEach((user) => {
    const month = new Date(user.created_at).toLocaleString("default", {
      month: "short",
    });

    monthMap.set(month, (monthMap.get(month) ?? 0) + 1);
  });

  let cumulative = 0;

  return Array.from(monthMap.entries()).map(([month, count]) => {
    cumulative += count;

    return {
      month,
      users: cumulative,
    };
  });
};

interface BuildRoleDistributionParams {
  users: {
    role: string;
  }[];
}

export const buildRoleDistribution = ({
  users,
}: BuildRoleDistributionParams): RoleDistribution[] => {
  const roles = ["founder", "mentor", "investor"];

  return roles.map((role) => ({
    role:
      role.charAt(0).toUpperCase() +
      role.slice(1),

    count: users.filter(
      (user) => user.role === role
    ).length,
  }));
};

export const buildStartupStatus = ({
  startups,
}: BuildStartupStatusParams): StartupStatus[] => {
  const statuses = [
    "draft",
    "pending",
    "approved",
    "rejected",
  ];

  return statuses.map((status) => ({
    status:
      status.charAt(0).toUpperCase() +
      status.slice(1),

    count: startups.filter(
      (startup) => startup.status === status
    ).length,
  }));
};