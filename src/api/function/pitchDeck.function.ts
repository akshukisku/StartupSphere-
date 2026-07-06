import { supabase } from "@/lib/supabase.config";

import {
  PitchDeck,
  PitchDeckPayload,
} from "@/types/interface/pitchDeck.interface";

export const uploadPitchDeckFns = async (payload: PitchDeckPayload) => {
  try {
    const { file } = payload;
  if (!file) {
      return {
        success: false,
        data: null,
        message: "No file provided.",
      };
    }
    // Get logged in user
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

    // Get founder startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found.",
      };
    }

    // Validate extension
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension !== "pdf") {
      return {
        success: false,
        data: null,
        message: "Only PDF files are allowed.",
      };
    }

    // Validate mime
    if (file.type !== "application/pdf") {
      return {
        success: false,
        data: null,
        message: "Only PDF files are allowed.",
      };
    }

    // Validate size (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        data: null,
        message: "Maximum file size is 10 MB.",
      };
    }

    const filePath = `startups/${startup.id}/pitch-deck/pitch.${extension}`;

    // Upload
    const { error: uploadError } = await supabase.storage
      .from("pitch-decks")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("pitch-decks").getPublicUrl(filePath);

    // Save metadata
    const { data, error } = await supabase
      .from("startup_pitch_decks")
      .upsert(
        {
          startup_id: startup.id,

          file_name: file.name,
          file_path: filePath,

          file_size: file.size,
          mime_type: file.type,
        },
        {
          onConflict: "startup_id",
        },
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Pitch deck uploaded successfully.",
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

export const fetchPitchDeckFns = async () => {
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

    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found.",
      };
    }

    const { data, error } = await supabase
      .from("startup_pitch_decks")
      .select("*")
      .eq("startup_id", startup.id)
      .maybeSingle();

    if (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
      message: data
        ? "Pitch deck fetched successfully."
        : "No pitch deck found.",
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

export const getPitchDeckSignedUrlFns = async (filePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("pitch-decks")
      .createSignedUrl(filePath, 300);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: data.signedUrl,
      message: "Signed URL generated successfully.",
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

export const deletePitchDeckFns = async (pitchDeck: PitchDeck) => {
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

    // Verify startup ownership
    const { data: startup } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .eq("id", pitchDeck.startup_id)
      .maybeSingle();

    if (!startup) {
      return {
        success: false,
        data: null,
        message: "Unauthorized.",
      };
    }

    // Delete storage
    const { error: storageError } = await supabase.storage
      .from("pitch-decks")
      .remove([pitchDeck.file_path]);

    if (storageError) {
      throw storageError;
    }

    // Delete DB
    const { error } = await supabase
      .from("startup_pitch_decks")
      .delete()
      .eq("id", pitchDeck.id)
      .eq("startup_id", startup.id);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: null,
      message: "Pitch deck deleted successfully.",
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
export const updatePitchDeckFns = async (payload: PitchDeckPayload) => {
  try {
    const { file } = payload;
      if (!file) {
      return {
        success: false,
        data: null,
        message: "No file provided.",
      };
    }

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

    // Startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found.",
      };
    }

    // Existing pitch deck
    const { data: existing, error: existingError } = await supabase
      .from("startup_pitch_decks")
      .select("*")
      .eq("startup_id", startup.id)
      .single();

    if (existingError || !existing) {
      return {
        success: false,
        data: null,
        message: "Pitch deck not found.",
      };
    }

    // Delete previous file
    if (existing.file_path) {
      await supabase.storage.from("pitch-decks").remove([existing.file_path]);
    }

    // Validate extension
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension !== "pdf") {
      return {
        success: false,
        data: null,
        message: "Only PDF files are allowed.",
      };
    }

    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        data: null,
        message: "Maximum file size is 10 MB.",
      };
    }

    const filePath = `startups/${startup.id}/pitch-deck/pitch.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("pitch-decks")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("pitch-decks").getPublicUrl(filePath);

    const { data, error } = await supabase
      .from("startup_pitch_decks")
      .update({
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Pitch deck updated successfully.",
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
