import { supabase } from "@/lib/supabase.config";

import { uploadSingleImage, deleteSingleImage } from "../media/media.function";

import { StartupTeamPayload } from "@/types/interface/startup.interface";

export const addTeamMemberFns = async (payload: StartupTeamPayload) => {
  try {
    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not authenticated",
      };
    }

    // Get startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found",
      };
    }

    // Prevent multiple founders
    if (payload.is_founder) {
      const { data: founder } = await supabase
        .from("startup_team")
        .select("id")
        .eq("startup_id", startup.id)
        .eq("is_founder", true)
        .maybeSingle();

      if (founder) {
        return {
          success: false,
          data: null,
          message: "A founder already exists for this startup.",
        };
      }
    }

    // Upload avatar
    let avatarURL: string | null = null;
    let avatarPath: string | null = null;

    if (payload.avatar) {
      const upload = await uploadSingleImage({
        bucket: "startup-team",
        folder: startup.id,
        file: payload.avatar,
      });

      if (!upload.success) {
        return {
          success: false,
          data: null,
          message: upload.message,
        };
      }

      avatarURL = upload.url ?? null;
      avatarPath = upload.path ?? null;
    }

    // Insert team member
    const { data, error } = await supabase
      .from("startup_team")
      .insert({
        startup_id: startup.id,

        member_name: payload.member_name,
        role: payload.role,

        bio: payload.bio,
        linkedin_url: payload.linkedin_url,

        avatar_url: avatarURL,
        avatar_path: avatarPath,

        is_founder: payload.is_founder ?? false,
      })
      .select()
      .single();

    // Rollback uploaded avatar if insert fails
    if (error) {
      if (payload.avatar && avatarPath) {
        const rollback = await deleteSingleImage({
          bucket: "startup-team",
          path: avatarPath,
        });

        if (!rollback.success) {
          console.error("Failed to rollback avatar:", rollback.message);
        }
      }

      return {
        success: false,
        data: null,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: "Team member added successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: "Something went wrong",
    };
  }
};

export const fetchTeamMembersFns = async () => {
  try {
    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: [],
        message: "User not authenticated",
      };
    }

    // Get startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: [],
        message: "Startup not found",
      };
    }

    // Fetch team
    const { data, error } = await supabase
      .from("startup_team")
      .select("*")
      .eq("startup_id", startup.id)
      .order("is_founder", {
        ascending: false,
      })
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      return {
        success: false,
        data: [],
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: "Team members fetched successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: "Something went wrong",
    };
  }
};

export const updateTeamMemberFns = async (payload: StartupTeamPayload) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not authenticated",
      };
    }

    const { data: startup } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (!startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found",
      };
    }

    const { data: teamMember } = await supabase
      .from("startup_team")
      .select("*")
      .eq("id", payload.id)
      .eq("startup_id", startup.id)
      .single();

    if (!teamMember) {
      return {
        success: false,
        data: null,
        message: "Team member not found",
      };
    }
    const oldAvatarPath = teamMember.avatar_path;

    let avatarURL = teamMember.avatar_url;
    let avatarPath = teamMember.avatar_path;

    // Prevent multiple founders
    if (payload.is_founder) {
      const { data: existingFounder, error: founderError } = await supabase
        .from("startup_team")
        .select("id")
        .eq("startup_id", startup.id)
        .eq("is_founder", true)
        .neq("id", teamMember.id)
        .maybeSingle();

      if (founderError) {
        return {
          success: false,
          data: null,
          message: founderError.message,
        };
      }

      if (existingFounder) {
        return {
          success: false,
          data: null,
          message: "A founder already exists for this startup.",
        };
      }
    }
    // Remove avatar
    if (payload.remove_avatar) {
      avatarURL = null;
      avatarPath = null;
    }
    // Upload new avatar
    if (payload.avatar instanceof File) {
      const upload = await uploadSingleImage({
        bucket: "startup-team",
        folder: startup.id,
        file: payload.avatar,
      });

      if (!upload.success) {
        return {
          success: false,
          data: null,
          message: upload.message,
        };
      }

      avatarURL = upload.url!;
      avatarPath = upload.path!;
    }

    // ✅ UPDATE the team member
    const { data: updatedMember, error: updateError } = await supabase
      .from("startup_team")
      .update({
        member_name: payload.member_name,
        role: payload.role,
        bio: payload.bio,
        linkedin_url: payload.linkedin_url,

        avatar_url: avatarURL,
        avatar_path: avatarPath,

        is_founder: payload.is_founder,
      })
      .eq("id", payload.id)
      .eq("startup_id", startup.id)
      .select()
      .single();

    if (updateError) {
      return {
        success: false,
        data: null,
        message: updateError.message,
      };
    }
    // Delete previous avatar after successful update
    if (
      (payload.remove_avatar || payload.avatar instanceof File) &&
      oldAvatarPath &&
      oldAvatarPath !== avatarPath
    ) {
      await deleteSingleImage({
        bucket: "startup-team",
        path: oldAvatarPath,
      });
    }

    return {
      success: true,
      data: updatedMember,
      message: "Team member updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
};

export const deleteTeamMemberFns = async (teamMemberId: string) => {
  try {
    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not authenticated",
      };
    }

    // Fetch team member
    const { data: member, error: memberError } = await supabase
      .from("startup_team")
      .select("*")
      .eq("id", teamMemberId)
      .single();

    if (memberError || !member) {
      return {
        success: false,
        data: null,
        message: "Team member not found",
      };
    }

    // Verify ownership
    const { data: startup } = await supabase
      .from("startups")
      .select("id")
      .eq("id", member.startup_id)
      .eq("founder_id", user.id)
      .maybeSingle();

    if (!startup) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
      };
    }

    // Delete avatar from storage
    if (member.avatar_path) {
      const avatarDelete = await deleteSingleImage({
        bucket: "startup-team",
        path: member.avatar_path,
      });

      if (!avatarDelete.success) {
        console.error("Failed to delete avatar:", avatarDelete.message);
      }
    }

    // Delete team member
    const { error } = await supabase
      .from("startup_team")
      .delete()
      .eq("id", member.id);

    if (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }

    return {
      success: true,
      data: null,
      message: "Team member deleted successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: "Something went wrong",
    };
  }
};
