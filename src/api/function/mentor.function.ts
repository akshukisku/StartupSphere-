import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase.config";
import {
  MentorEvaluationPayload,
  MentorProfilePayload,
  MentorSessionPayload,
  UpdateMentorProfilePayload,
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
    const {
      count: assignedStartups,
      error: assignedError,
    } = await supabase
      .from("mentor_assignments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("mentor_profile_id", mentorProfile.id)
      .eq("status", "assigned");

    if (assignedError) throw assignedError;

    // Completed mentorships
    const {
      count: completedMentorships,
      error: completedAssignmentError,
    } = await supabase
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
        `
      )
      .eq(
        "mentor_assignments.mentor_profile_id",
        mentorProfile.id
      );

    if (sessionError) throw sessionError;

    const now = new Date();

    const upcomingSessions =
      sessions?.filter(
        (session) =>
          session.status === "scheduled" &&
          new Date(session.session_date) > now
      ).length ?? 0;

    const completedSessions =
      sessions?.filter(
        (session) => session.status === "completed"
      ).length ?? 0;

    return {
      success: true,
      data: {
        assignedStartups: assignedStartups ?? 0,
        upcomingSessions,
        completedSessions,
        completedMentorships:
          completedMentorships ?? 0,
      },
      message: "Mentor dashboard stats fetched successfully.",
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
  .select(`
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
  `)
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

export const fetchMentorSessionDetailsFns = async (
  sessionId: string
) => {
  try {
    const { data, error } = await supabase
      .from("mentor_sessions")
      .select(`
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
`)
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
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
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
export const finishMentorshipFns = async (
  assignmentId: string
) => {
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
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
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
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};
export const fetchMentorEvaluationFns = async (
  sessionId: string,
) => {
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
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};