import { supabase } from "@/lib/supabase.config";
import {
  buildDashboardStats,
  buildMonthlyGrowth,
  buildRoleDistribution,
  buildStartupStatus,
} from "@/service/helper/adminDashboard.helper";
import { StartupStatus } from "@/types/enum/enum";

export const fetchPendingUsersFns = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("approval_status", "pending");

    // console.log("PENDING USERS:", data);
    // console.log("QUERY ERROR:", error);

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Pending users fetched successfully",
    };
  } catch (error) {
    console.error(error);

    const err = error as Error;

    return {
      success: false,
      data: [],
      message: err.message,
    };
  }
};
export const approveUserFns = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        approval_status: "approved",
        approved_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;

    return {
      success: true,
      message: "User approved successfully",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message || "Failed to approve user",
    };
  }
};

export const rejectUserFns = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        approval_status: "rejected",
      })
      .eq("id", userId);

    if (error) throw error;

    return {
      success: true,
      message: "User rejected successfully",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message || "Failed to reject user",
    };
  }
};
export const fetchAdminStatsFns = async () => {
  try {
    const [
      { data: users, error: userError },
      { data: startups, error: startupError },
      { data: mentorAssignments, error: mentorAssignmentError },
    ] = await Promise.all([
      supabase.from("profiles").select("role, approval_status"),

      supabase.from("startups").select("status"),

      supabase.from("mentor_assignments").select("status"),
    ]);

    if (userError) throw userError;
    if (startupError) throw startupError;
    if (mentorAssignmentError) throw mentorAssignmentError;

    const stats = {
      // ==========================
      // Users
      // ==========================
      totalUsers: users?.length ?? 0,

      pendingUsers:
        users?.filter((user) => user.approval_status === "pending").length ?? 0,

      approvedUsers:
        users?.filter((user) => user.approval_status === "approved").length ??
        0,

      rejectedUsers:
        users?.filter((user) => user.approval_status === "rejected").length ??
        0,

      founders: users?.filter((user) => user.role === "founder").length ?? 0,

      investors: users?.filter((user) => user.role === "investor").length ?? 0,

      mentors: users?.filter((user) => user.role === "mentor").length ?? 0,

      // ==========================
      // Startups
      // ==========================
      totalStartups: startups?.length ?? 0,

      pendingStartups:
        startups?.filter((startup) => startup.status === "pending").length ?? 0,

      approvedStartups:
        startups?.filter((startup) => startup.status === "approved").length ??
        0,

      rejectedStartups:
        startups?.filter((startup) => startup.status === "rejected").length ??
        0,

      // ==========================
      // Mentorships
      // ==========================
      activeMentorships:
        mentorAssignments?.filter(
          (assignment) => assignment.status === "assigned",
        ).length ?? 0,

      completedMentorships:
        mentorAssignments?.filter(
          (assignment) => assignment.status === "completed",
        ).length ?? 0,
    };

    return {
      success: true,
      data: stats,
      message: "Dashboard statistics fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchPendingStartupsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("startups")
      .select(
        `
        id,
        startup_name,
        logo_url,
        industry,
        status,
        submitted_at,
        founder:profiles!startups_founder_id_fkey (
          id,
          full_name,
          email
        )
      `,
      )
      .eq("status", StartupStatus.PENDING)
      .order("submitted_at", {
        ascending: false,
      });

    if (error) {
      return {
        success: false,
        data: [],
        message: error.message,
      };
    }

    const startups =
      data?.map((startup) => ({
        ...startup,
        founder: Array.isArray(startup.founder)
          ? (startup.founder[0] ?? null)
          : startup.founder,
      })) ?? [];

    return {
      success: true,
      data: startups,
      message: "Pending startups fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: "Something went wrong.",
    };
  }
};
export const fetchStartupByIdFns = async (startupId: string) => {
  try {
    const { data, error } = await supabase
      .from("startups")
      .select(
        `
        *,
        startup_team(*),
        startup_media(*)
      `,
      )
      .eq("id", startupId)
      .single();

    if (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: "Startup fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: "Something went wrong.",
    };
  }
};

export const approveStartupFns = async (startupId: string, adminId: string) => {
  try {
    const { error } = await supabase
      .from("startups")
      .update({
        status: StartupStatus.APPROVED,
        approved_at: new Date().toISOString(),
        approved_by: adminId,
        rejection_reason: null,
      })
      .eq("id", startupId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Startup approved successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};

export const rejectStartupFns = async (
  startupId: string,
  adminId: string,
  reason: string,
) => {
  try {
    const { error } = await supabase
      .from("startups")
      .update({
        status: StartupStatus.REJECTED,
        rejection_reason: reason,
        approved_by: adminId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", startupId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Startup rejected successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};

export const fetchAdminDashboardStatsFns = async () => {
  try {
    // Pending Startups
    const { count: pendingStartups, error: startupError } = await supabase
      .from("investor_startups")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending");

    if (startupError) throw startupError;

    // Pending Mentors
    const { count: pendingMentors, error: mentorError } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("role", "mentor")
      .eq("approval_status", "pending");

    if (mentorError) throw mentorError;

    // Pending Investors
    const { count: pendingInvestors, error: investorError } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("role", "investor")
      .eq("approval_status", "pending");

    if (investorError) throw investorError;

    // Active Mentorships
    const { count: activeMentorships, error: activeError } = await supabase
      .from("mentor_assignments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "assigned");

    if (activeError) throw activeError;

    // Completed Mentorships
    const { count: completedMentorships, error: completedError } =
      await supabase
        .from("mentor_assignments")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "completed");

    if (completedError) throw completedError;

    // Total Users
    const { count: totalUsers, error: userError } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (userError) throw userError;

    return {
      success: true,
      data: {
        pendingStartups: pendingStartups ?? 0,
        pendingMentors: pendingMentors ?? 0,
        pendingInvestors: pendingInvestors ?? 0,
        activeMentorships: activeMentorships ?? 0,
        completedMentorships: completedMentorships ?? 0,
        totalUsers: totalUsers ?? 0,
      },
      message: "Admin dashboard statistics fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchAdminDashboardFns = async () => {
  try {
    const [
      { data: users, error: userError },
      { data: startups, error: startupError },
      { data: mentorAssignments, error: mentorAssignmentError },
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select("role, approval_status, created_at")
        .order("created_at", { ascending: true }),

      supabase.from("startups").select("status"),

      supabase.from("mentor_assignments").select("status"),
    ]);

    if (userError) throw userError;
    if (startupError) throw startupError;
    if (mentorAssignmentError) throw mentorAssignmentError;

    return {
      success: true,
      data: {
        stats: buildDashboardStats({
          users: users ?? [],
          startups: startups ?? [],
          mentorAssignments: mentorAssignments ?? [],
        }),

        monthlyGrowth: buildMonthlyGrowth({
          users: users ?? [],
        }),
        roleDistribution: buildRoleDistribution({
          users: users ?? [],
        }),
        startupStatus: buildStartupStatus({
  startups: startups ?? [],
}),
        mentorshipStatus: [],
      },
      message: "Dashboard fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,

      data: null,

      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
