import { supabase } from "@/lib/supabase.config";
import { UpdateProfilePayload } from "@/types/interface/profile.interface";
import { setCookie } from "cookies-next";

export const fetchProfileFns = async () => {
  try {
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

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Profile fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const updateProfileFns = async (payload: UpdateProfilePayload) => {
  try {
    const { full_name, avatar, remove_avatar } = payload;

    // Logged in user
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

    // Current profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    let avatarPath = profile.avatar_path;

    /**
     * Remove avatar
     */
    if (remove_avatar && avatarPath) {
      await supabase.storage.from("avatars").remove([avatarPath]);

      avatarPath = null;
    }

    /**
     * Replace / Upload avatar
     */
    if (avatar) {
      // Delete previous avatar
      if (avatarPath) {
        await supabase.storage.from("avatars").remove([avatarPath]);
      }

      const extension = avatar.name.split(".").pop()?.toLowerCase();

      const filePath = `profiles/${user.id}/avatar.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatar, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      avatarPath = filePath;
    }

    /**
     * Update profile
     */
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name,
        avatar_path: avatarPath,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const getProfileAvatarSignedUrlFns = async (filePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(filePath, 60);

    if (error) throw error;

    return {
      success: true,
      data: data.signedUrl,
      message: "Avatar URL generated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
