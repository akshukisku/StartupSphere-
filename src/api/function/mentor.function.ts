import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase.config";
import {
  CreateMentorRequestPayload,
  MentorEvaluationPayload,
  MentorProfilePayload,
  MentorRequestRow,
  MentorSessionPayload,
  UpdateMentorProfilePayload,
  UpdateMentorRequestPayload,
} from "@/types/interface/mentor.interface";

export const fetchMentorProfileFns = async () => {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("mentor_profiles")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Mentor profile fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchMentorDashboardStatsFns = async () => {
  try {
    const user = await getCurrentUser();

    // Get mentor profile
    const { data: mentorProfile, error: mentorError } = await supabase
      .from("mentor_profiles")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (mentorError) throw mentorError;

    // Active mentorships
    const { count: assignedStartups, error: assignedError } = await supabase
      .from("mentor_assignments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("mentor_profile_id", mentorProfile.id)
      .eq("status", "assigned");

    if (assignedError) throw assignedError;

    // Completed mentorships
    const { count: completedMentorships, error: completedAssignmentError } =
      await supabase
        .from("mentor_assignments")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("mentor_profile_id", mentorProfile.id)
        .eq("status", "completed");

    if (completedAssignmentError) throw completedAssignmentError;

    // Fetch mentor sessions
    const { data: sessions, error: sessionError } = await supabase
      .from("mentor_sessions")
      .select(
        `
          id,
          status,
          session_date,
          mentor_assignments!inner(
            mentor_profile_id
          )
        `,
      )
      .eq("mentor_assignments.mentor_profile_id", mentorProfile.id);

    if (sessionError) throw sessionError;

    const now = new Date();

    const upcomingSessions =
      sessions?.filter(
        (session) =>
          session.status === "scheduled" &&
          new Date(session.session_date) > now,
      ).length ?? 0;

    const completedSessions =
      sessions?.filter((session) => session.status === "completed").length ?? 0;

    return {
      success: true,
      data: {
        assignedStartups: assignedStartups ?? 0,
        upcomingSessions,
        completedSessions,
        completedMentorships: completedMentorships ?? 0,
      },
      message: "Mentor dashboard stats fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchAssignedStartupsFns = async () => {
  try {
    const user = await getCurrentUser();

    // Step 1: Get mentor profile
    const { data: mentorProfile, error: mentorError } = await supabase
      .from("mentor_profiles")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (mentorError) throw mentorError;

    // Step 2: Get assigned startup ids
    const { data: assignments, error: assignmentError } = await supabase
      .from("mentor_assignments")
      .select("id, startup_id, assigned_at")
      .eq("mentor_profile_id", mentorProfile.id)
      .eq("status", "assigned");

    if (assignmentError) throw assignmentError;

    if (!assignments?.length) {
      return {
        success: true,
        data: [],
        message: "No assigned startups.",
      };
    }

    // Step 3: Fetch startup details
    const startupIds = assignments.map((assignment) => assignment.startup_id);

    const { data: startups, error: startupError } = await supabase
      .from("investor_startups")
      .select("*")
      .in("id", startupIds);

    if (startupError) throw startupError;

    const assignedStartups = (startups ?? []).map((startup) => {
      const assignment = assignments.find(
        (item) => item.startup_id === startup.id,
      );

      return {
        ...startup,
        assignment_id: assignment?.id,
        assigned_at: assignment?.assigned_at,
      };
    });

    return {
      success: true,
      data: assignedStartups,
      message: "Assigned startups fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const createMentorProfileFns = async (payload: MentorProfilePayload) => {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("mentor_profiles")
      .insert({
        profile_id: user.id,
        ...payload,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Mentor profile created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const updateMentorProfileFns = async (payload: MentorProfilePayload) => {
  try {
    const user = await getCurrentUser();

    const { data, error } = await supabase
      .from("mentor_profiles")
      .update(payload)
      .eq("profile_id", user.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Mentor profile updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchMentorSessionsFns = async () => {
  try {
    const user = await getCurrentUser();

    const { data: mentorProfile, error: mentorError } = await supabase
      .from("mentor_profiles")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (mentorError) throw mentorError;

    const { data, error } = await supabase
      .from("mentor_sessions")
      .select(
        `
    *,
    mentor_assignments!inner(
      id,
      startup_id,
      mentor_profile_id,
      startups(
        id,
        startup_name,
        logo_path
      )
    )
  `,
      )
      .eq("mentor_assignments.mentor_profile_id", mentorProfile.id)
      .order("session_date", {
        ascending: true,
      });

    // console.log("Data:", data);
    // console.log("Error:", error);
    if (error) throw error;

    return {
      success: true,
      data,
      message: "Sessions fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchMentorSessionDetailsFns = async (sessionId: string) => {
  try {
    const { data, error } = await supabase
      .from("mentor_sessions")
      .select(
        `
  *,
  mentor_assignments(
    id,
    startup_id,
    mentor_profile_id,
    startups(
      id,
      founder_id,
      startup_name,
      tagline,
      description,
      logo_url,
      industry,
      funding_stage,
      website,
      linkedin,
      github,
      twitter
    )
  )
`,
      )
      .eq("id", sessionId)
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Session fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const createMentorSessionFns = async (payload: MentorSessionPayload) => {
  try {
    const { data, error } = await supabase
      .from("mentor_sessions")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Session scheduled successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const updateMentorSessionFns = async (
  sessionId: string,
  payload: MentorSessionPayload,
) => {
  try {
    const { data, error } = await supabase
      .from("mentor_sessions")
      .update(payload)
      .eq("id", sessionId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Session updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const completeMentorSessionFns = async (
  sessionId: string,
  notes: string,
) => {
  try {
    const { data, error } = await supabase
      .from("mentor_sessions")
      .update({
        status: "completed",
        notes,
      })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Session completed successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const finishMentorshipFns = async (assignmentId: string) => {
  try {
    const { error } = await supabase
      .from("mentor_assignments")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", assignmentId);

    if (error) throw error;

    return {
      success: true,
      message: "Mentorship completed successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const createMentorEvaluationFns = async (
  payload: MentorEvaluationPayload,
) => {
  try {
    const { data, error } = await supabase
      .from("mentor_evaluations")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Evaluation submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchMentorEvaluationFns = async (sessionId: string) => {
  try {
    const { data, error } = await supabase
      .from("mentor_evaluations")
      .select("*")
      .eq("mentor_session_id", sessionId)
      .maybeSingle();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Evaluation fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const fetchAvailableMentorsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        email,
        avatar_path
      `,
      )
      .eq("role", "mentor")
      .eq("approval_status", "approved");

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Mentors fetched successfully.",
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
export const fetchFounderStartupsFns = async () => {
  try {
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

    const { data, error } = await supabase
      .from("startups")
      .select(
        `
        id,
        startup_name
      `,
      )
      .eq("founder_id", user.id)
      .eq("status", "approved")
      .order("startup_name");

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Founder startups fetched successfully.",
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

export const createMentorRequestFns = async ({
  mentorId,
  message,
}: CreateMentorRequestPayload) => {
  try {
    // Current logged in founder
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    // Find founder's startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError) {
      throw startupError;
    }

    // Prevent duplicate pending request
    const { data: existingRequest } = await supabase
      .from("mentor_requests")
      .select("id")
      .eq("startup_id", startup.id)
      .eq("mentor_id", mentorId)
      .eq("status", "pending")
      .maybeSingle();

    if (existingRequest) {
      return {
        success: false,
        message: "You already have a pending request for this mentor.",
      };
    }

    // Create request
    const { error } = await supabase.from("mentor_requests").insert({
      founder_id: user.id,
      startup_id: startup.id,
      mentor_id: mentorId,
      message,
      status: "pending",
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Mentor request sent successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const fetchMentorRequestsFns = async () => {
  try {
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

    const { data, error } = await supabase
      .from("mentor_requests")
      .select(
        `
        id,
        message,
        status,
        created_at,
        startup:startups(
          startup_name,
          industry,
          logo_url
        ),
        founder:profiles!mentor_requests_founder_id_fkey(
          full_name,
          email
        )
      `,
      )
      .eq("mentor_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }
    const requests: MentorRequestRow[] = (data ?? []).map((item) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      created_at: item.created_at,

      startup: item.startup?.[0] ?? {
        startup_name: "",
        industry: null,
        logo_url: null,
      },

      founder: item.founder?.[0] ?? {
        full_name: "",
        email: "",
      },
    }));

    return {
      success: true,
      data:requests,
      message: "Mentor requests fetched successfully.",
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
export const updateMentorRequestStatusFns = async ({
  requestId,
  status,
}: UpdateMentorRequestPayload) => {
  try {
    // Current mentor
    const user = await getCurrentUser();

    // Get mentor pro file
    const { data: mentorProfile, error: mentorProfileError } = await supabase
      .from("mentor_profiles")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (mentorProfileError) throw mentorProfileError;

    // Get request details
    const { data: request, error: requestError } = await supabase
      .from("mentor_requests")
      .select("startup_id")
      .eq("id", requestId)
      .single();

    if (requestError) throw requestError;

    // Update request status
    const { error: updateError } = await supabase
      .from("mentor_requests")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (updateError) throw updateError;

    // Only create assignment when accepted
    if (status === "accepted") {
      // Prevent duplicate assignment
      const { data: existingAssignment } = await supabase
        .from("mentor_assignments")
        .select("id")
        .eq("mentor_request_id", requestId)
        .maybeSingle();

      if (!existingAssignment) {
        const { error: assignmentError } = await supabase
          .from("mentor_assignments")
          .insert({
            mentor_profile_id: mentorProfile.id,
            startup_id: request.startup_id,
            mentor_request_id: requestId,
            status: "assigned",
            assigned_at: new Date().toISOString(),
          });

        console.log("========== Mentor Assignment Debug ==========");
        console.log("Mentor Profile:", mentorProfile);
        console.log("Request:", request);
        console.log("Assignment Error:", assignmentError);
        console.log("============================================");

        if (assignmentError) {
          throw assignmentError;
        }

        if (assignmentError) throw assignmentError;
      }
    }

    return {
      success: true,
      message: `Request ${status} successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
