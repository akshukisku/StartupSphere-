import { supabase } from "@/lib/supabase.config";
import { InvestmentStatus } from "@/types/enum/enum";

export const fetchFounderDashboardStatsFns = async () => {
  try {
    // 1. Authenticate Founder
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    // 2. Fetch dashboard data in parallel
    const [pendingResult, acceptedResult, fundingResult, rejectedResult] =
      await Promise.all([
        supabase
          .from("investment_requests")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("founder_id", user.id)
          .eq("status", InvestmentStatus.PENDING),

        supabase
          .from("investment_requests")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("founder_id", user.id)
          .eq("status", InvestmentStatus.ACCEPTED),

        supabase
          .from("investment_requests")
          .select("amount")
          .eq("founder_id", user.id)
          .eq("status", InvestmentStatus.ACCEPTED),
        supabase
          .from("investment_requests")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("founder_id", user.id)
          .eq("status", InvestmentStatus.REJECTED),
      ]);

    // 3. Check Errors
    if (
      rejectedResult.error ||
      pendingResult.error ||
      acceptedResult.error ||
      fundingResult.error
    ) {
      throw (
        rejectedResult.error ||
        pendingResult.error ||
        acceptedResult.error ||
        fundingResult.error
      );
    }

    // 4. Calculate Total Funding
    const totalFunding =
      fundingResult.data?.reduce(
        (total, request) => total + (request.amount ?? 0),
        0,
      ) ?? 0;

    // 5. Return Response
    return {
      success: true,

      data: {
        pendingRequests: pendingResult.count ?? 0,
        acceptedRequests: acceptedResult.count ?? 0,
        rejectedRequests: rejectedResult.count ?? 0,
        totalFunding,
      },

      message: "Founder dashboard statistics fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong.",

      data: {
        pendingRequests: 0,
        acceptedRequests: 0,
        rejectedRequests: 0,
        totalFunding: 0,
      },
    };
  }
};
export const fetchInvestorInvestmentStatsFns = async () => {
  try {
    // 1. Authenticate Investor
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not authenticated.",
      };
    }

    // 2. Fetch investment statistics
    const [
      totalResult,
      acceptedResult,
      pendingResult,
      investedResult,
    ] = await Promise.all([
      supabase
        .from("investment_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("investor_id", user.id),

      supabase
        .from("investment_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("investor_id", user.id)
        .eq("status", "accepted"),

      supabase
        .from("investment_requests")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("investor_id", user.id)
        .eq("status", "pending"),

      supabase
        .from("investment_requests")
        .select("amount")
        .eq("investor_id", user.id)
        .eq("status", "accepted"),
    ]);

    if (
      totalResult.error ||
      acceptedResult.error ||
      pendingResult.error ||
      investedResult.error
    ) {
      throw (
        totalResult.error ||
        acceptedResult.error ||
        pendingResult.error ||
        investedResult.error
      );
    }

    const totalInvested =
      investedResult.data?.reduce(
        (sum, item) => sum + (item.amount ?? 0),
        0,
      ) ?? 0;

    return {
      success: true,
      data: {
        totalInvestments: totalResult.count ?? 0,
        activeInvestments: acceptedResult.count ?? 0,
        pendingInvestments: pendingResult.count ?? 0,
        totalInvested,
      },
      message: "Investment statistics fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: {
        totalInvestments: 0,
        activeInvestments: 0,
        pendingInvestments: 0,
        totalInvested: 0,
      },
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};