import { supabase } from "@/lib/supabase.config";

interface FetchStartupsParams {
  page?: number;
  limit?: number;
  search?: string;
  industry?: string;
  fundingStage?: string;
}

export const fetchInvestorDashboardStatsFns = async () => {
  const { count, error } = await supabase
    .from("startups")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "approved");

  //   console.log("COUNT:", count);
  //   console.log("ERROR:", error);

  if (error) {
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }

  return {
    success: true,
    data: {
      totalStartups: count ?? 0,
      savedStartups: 0,
      interestedStartups: 0,
    },
    message: "Dashboard stats fetched successfully.",
  };
};

export const fetchRecentStartupsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("investor_startups")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(6);

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Recent startups fetched successfully.",
    };
  } catch (error) {
    console.error(error);

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



export const fetchAllStartupsFns = async ({
  page = 1,
  limit = 9,
  search = "",
  industry = "",
  fundingStage = "",
}: FetchStartupsParams) => {
  try {
    let query = supabase
      .from("investor_startups")
      .select("*", {
        count: "exact",
      });

    if (search) {
      query = query.ilike("startup_name", `%${search}%`);
    }

    if (industry && industry !== "all") {
      query = query.eq("industry", industry);
    }

    if (fundingStage && fundingStage !== "all") {
      query = query.eq("funding_stage", fundingStage);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order("created_at", {
        ascending: false,
      })
      .range(from, to);

    if (error) throw error;

    return {
      success: true,
      data: {
        startups: data,
        total: count ?? 0,
        page,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
      message: "Startups fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};

export const fetchStartupDetailsFns = async (
  startupId: string
) => {
  try {
    const { data, error } = await supabase
      .from("investor_startups")
      .select("*")
      .eq("id", startupId)
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Startup details fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};