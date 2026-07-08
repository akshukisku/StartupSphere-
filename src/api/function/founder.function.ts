import { supabase } from "@/lib/supabase.config";

export const fetchFoundersFns = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        email,
        avatar_path,
        approval_status,
        is_verified,
        created_at,
        startups (
          id,
          startup_name,
          status
        )
      `,
      )
      .eq("role", "founder")
      .order("created_at", { ascending: false });

    if (error) {
      return {
        success: false,
        data: [],
        message: error.message,
      };
    }

    const founders = (data ?? []).map((founder) => ({
      ...founder,
      startup: founder.startups?.[0] ?? null,
    }));

    return {
      success: true,
      data: founders,
      message: "Founders fetched successfully.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      data: [],
      message: err.message,
    };
  }
};
export const updateFounderVerificationFns = async (
  founderId: string,
  isVerified: boolean
) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        is_verified: isVerified,
      })
      .eq("id", founderId);

    if (error) throw error;

    return {
      success: true,
      message: isVerified
        ? "Founder enabled successfully."
        : "Founder disabled successfully.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message:
        err.message ??
        "Failed to update founder.",
    };
  }
};
