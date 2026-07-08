import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase.config";
import { SavedStartup } from "@/types/interface/savedStartup.interface";

export const saveStartupFns = async (startupId: string) => {
  try {
    const user = await getCurrentUser();

    const { error } = await supabase.from("saved_startups").insert({
      investor_id: user.id,
      startup_id: startupId,
    });

    if (error) throw error;

    return {
      success: true,
      message: "Startup saved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const unsaveStartupFns = async (startupId: string) => {
  try {
    const user = await getCurrentUser();

    const { error } = await supabase
      .from("saved_startups")
      .delete()
      .eq("investor_id", user.id)
      .eq("startup_id", startupId);

    if (error) throw error;

    return {
      success: true,
      message: "Startup removed successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const getSavedStartupsFns = async () => {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("saved_startups")
      .select("*")
      .eq("investor_id", user.id);

    if (error) throw error;

    return {
      success: true,
      data: data ?? [],
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchSavedStartupDetailsFns = async () => {
  try {
    const user = await getCurrentUser();

    // 1️⃣ Get saved startup IDs
    const { data: savedData, error: savedError } = await supabase
      .from("saved_startups")
      .select("startup_id")
      .eq("investor_id", user.id);

    if (savedError) throw savedError;

    const startupIds =
      savedData?.map((item) => item.startup_id) ?? [];

    // No saved startups
    if (startupIds.length === 0) {
      return {
        success: true,
        data: [],
        message: "No saved startups found.",
      };
    }

    // 2️⃣ Fetch full startup details from the VIEW
    const { data: startups, error: startupError } = await supabase
      .from("investor_startups")
      .select("*")
      .in("id", startupIds);

    if (startupError) throw startupError;

    return {
      success: true,
      data: startups ?? [],
      message: "Saved startups fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};
