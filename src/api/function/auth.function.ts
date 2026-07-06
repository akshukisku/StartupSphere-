import { supabase } from "@/lib/supabase.config";
import { RegisterPayload } from "@/types/interface/auth.interface";
import { setCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";

export const registerUserFns = async (payload: RegisterPayload) => {
  try {
    // console.log("REGISTER PAYLOAD:", payload);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    // console.log("AUTH DATA:", authData);
    // console.log("AUTH ERROR:", authError);

    if (authError) throw authError;

    if (!authData.user) {
      throw new Error("User not created");
    }

    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: payload.full_name,
        role: payload.role,
        approval_status: "pending",
      })
      .eq("id", authData.user.id)
      .select();

    // console.log("UPDATED PROFILE:", updatedProfile);
    // console.log("PROFILE ERROR:", profileError);

    if (profileError) throw profileError;

    return {
      success: true,
      data: authData,
      message: "Registration successfully",
    };
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    const err = error as Error;

    return {
      success: false,
      data: null,
      message: err.message || "Registration failed",
    };
  }
};

export const loginUserFns = async (email: string, password: string) => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw authError;

    if (!authData.user) {
      throw new Error("Login failed");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) throw profileError;

    if (profile) {
      setCookie("user", JSON.stringify(profile), {
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("role", profile.role, {
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("approval_status", profile.approval_status, {
        maxAge: 60 * 60 * 24 * 7,
      });

      setCookie("token", authData.session?.access_token || "", {
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return {
      success: true,
      data: {
        user: authData.user,
        profile,
      },
      message: "Login successful",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      data: null,
      message: err.message || "Login failed",
    };
  }
};

export const logoutUserFns = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    deleteCookie("user");
    deleteCookie("role");
    deleteCookie("approval_status");
    deleteCookie("token");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message || "Logout failed",
    };
  }
};

export const getProfileFns = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: "Profile fetched",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      data: null,
      message: err.message || "Profile fetch failed",
    };
  }
};
