import { supabase } from "@/lib/supabase.config";
import { InvestmentStatus, StartupStatus } from "@/types/enum/enum";
import {
  InvestmentRequestPayload,
  UpdateInvestmentStatusPayload,
} from "@/types/interface/investment.interface";

export const createInvestmentRequestFns = async (
  payload: InvestmentRequestPayload,
) => {
  try {
    // 1. Authenticate investor

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    // 2. Fetch startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select(
        `
      id,
      founder_id,
      startup_name,
      status
    `,
      )
      .eq("id", payload.startup_id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        message: "Startup not found.",
      };
    }

    // 3. Validate startup
    if (startup.status !== StartupStatus.APPROVED) {
      return {
        success: false,
        message: "This startup is not available for investment.",
      };
    }

    // 4. Check duplicate request
    if (startup.founder_id === user.id) {
      return {
        success: false,
        message: "You cannot invest in your own startup.",
      };
    }
    const { data: existingRequest } = await supabase
      .from("investment_requests")
      .select("id")
      .eq("startup_id", payload.startup_id)
      .eq("investor_id", user.id)
      .eq("status", InvestmentStatus.PENDING)
      .maybeSingle();

    if (existingRequest) {
      return {
        success: false,
        message:
          "You already have a pending investment request for this startup.",
      };
    }

    // 5. Insert investment request

    const { data: investmentRequest, error: investmentError } = await supabase
      .from("investment_requests")
      .insert({
        startup_id: startup.id,
        startup_name: startup.startup_name,
        founder_id: startup.founder_id,
        investor_id: user.id,

        amount: payload.amount,
        equity_offer: payload.equity_offer,
        message: payload.message,

        status: InvestmentStatus.PENDING,
      })
      .select()
      .single();

    if (investmentError) {
      throw investmentError;
    }

    // 6. Create notification
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: startup.founder_id,

        title: "New Investment Request",

        description: `A new investment request has been submitted for ${startup.startup_name}.`,

        type: "investment_request",

        reference_id: investmentRequest.id,
      });

    if (notificationError) {
      console.error(notificationError);
    }

    // 7. Return response
    return {
      success: true,
      data: investmentRequest,
      message: "Investment request sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchFounderInvestmentRequestsFns = async () => {
  try {
    // 1. Authenticate Founder
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Logged in Founder ID:", user?.id);

    if (!user) {
      return {
        success: false,
        data: [],
        message: "User not authenticated.",
      };
    }

    // 2. Fetch Investment Requests
    const { data, error } = await supabase
      .from("investment_requests")
      .select(
        `
        *,
        investor:profiles!investment_requests_investor_id_fkey(
          id,
          full_name,
          email,
          avatar_path
        )
      `,
      )
      .eq("founder_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Investment requests fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const updateInvestmentRequestStatusFns = async ({
  requestId,
  status,
}: UpdateInvestmentStatusPayload) => {
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

    // 2. Verify request belongs to founder
    const { data: request, error: requestError } = await supabase
      .from("investment_requests")
      .select(
        `
          id,
          founder_id,
          investor_id,
          startup_name
        `,
      )
      .eq("id", requestId)
      .single();

    if (requestError || !request) {
      return {
        success: false,
        message: "Investment request not found.",
      };
    }

    console.log("=================================");
    console.log("Logged in User:", user.id);
    console.log("Request Founder:", request.founder_id);
    console.log("Request:", request);
    console.log("=================================");

    if (request.founder_id !== user.id) {
      return {
        success: false,
        message: "Unauthorized action.",
      };
    }

    // 3. Update status
    const { data: updatedRequest, error: updateError } = await supabase
      .from("investment_requests")
      .update({
        status,
        responded_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select();

    console.log("Status to update:", status);
    console.log("Updated Row:", updatedRequest);
    console.log("Update Error:", updateError);

    if (updateError) {
      throw updateError;
    }

    if (updateError) {
      throw updateError;
    }

    // 4. Notify investor
    await supabase.from("notifications").insert({
      user_id: request.investor_id,

      title:
        status === InvestmentStatus.ACCEPTED
          ? "Investment Request Accepted"
          : "Investment Request Rejected",

      description:
        status === InvestmentStatus.ACCEPTED
          ? `Your investment request for "${request.startup_name}" has been accepted.`
          : `Your investment request for "${request.startup_name}" has been rejected.`,

      type: "investment_status",

      reference_id: request.id,
    });
    console.log("Logged in User:", user.id);
    console.log("Request Founder:", request.founder_id);
    console.log("Request:", request);

    return {
      success: true,
      message:
        status === InvestmentStatus.ACCEPTED
          ? "Investment request accepted successfully."
          : "Investment request rejected successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchInvestorInvestmentRequestsFns = async () => {
  try {
    // 1. Authenticate Investor
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: [],
        message: "User not authenticated.",
      };
    }

    // 2. Fetch Investor Requests
    const { data, error } = await supabase
      .from("investment_requests")
      .select(
        `
          *,
          startup:startups!investment_requests_startup_id_fkey(
            id,
            startup_name,
            logo_url,
            industry,
            funding_stage
          )
        `
      )
      .eq("investor_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Investment requests fetched successfully.",
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