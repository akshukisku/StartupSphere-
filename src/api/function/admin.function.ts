import { supabase } from "@/lib/supabase.config";
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
export const approveUserFns = async (
  userId: string
) => {
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
      message:
        err.message || "Failed to approve user",
    };
  }
};

export const rejectUserFns = async (
  userId: string
) => {
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
      message:
        err.message || "Failed to reject user",
    };
  }
};
export const fetchAdminStatsFns = async () => {
  try {
    const [{ data: users, error: userError }, { data: startups, error: startupError }] =
      await Promise.all([
        supabase.from("profiles").select("role, approval_status"),
        supabase.from("startups").select("approval_status"),
      ]);

    if (userError) throw userError;
    if (startupError) throw startupError;

    const stats = {
      // ==========================
      // Users
      // ==========================
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

      // ==========================
      // Startups
      // ==========================
      pendingStartups: startups.filter(
        (startup) => startup.approval_status === "pending"
      ).length,

      approvedStartups: startups.filter(
        (startup) => startup.approval_status === "approved"
      ).length,

      rejectedStartups: startups.filter(
        (startup) => startup.approval_status === "rejected"
      ).length,
    };

    return {
      success: true,
      data: stats,
      message: "Dashboard stats fetched successfully",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      data: null,
      message:
        err.message ?? "Failed to fetch dashboard stats",
    };
  }
};

export const fetchPendingStartupsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("startups")
      .select(`
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
      `)
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
          ? startup.founder[0] ?? null
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
      .select(`
        *,
        startup_team(*),
        startup_media(*)
      `)
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

export const approveStartupFns = async (
  startupId: string,
  adminId: string
) => {
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
  reason: string
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