import { supabase } from "@/lib/supabase.config";
import { StartupPayload } from "@/types/interface/startup.interface";
import {
  uploadSingleImage,
  deleteSingleImage,
  deleteMultipleImages,
} from "../media/media.function";
import {
  deleteShowcaseImageFns,
  uploadShowcaseImagesFns,
} from "./startupMedia.function";
import { StartupStatus } from "@/types/enum/enum";

export const createStartupFns = async (payload: StartupPayload) => {
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

    // Check if startup already exists
    const { data: existingStartup } = await supabase
      .from("startups")
      .select("id")
      .eq("founder_id", user.id)
      .maybeSingle();

    if (existingStartup) {
      return {
        success: false,
        data: null,
        message: "You already have a startup profile.",
      };
    }

    let logoURL: string | null = null;
    let logoPath: string | null = null;

    // Upload Logo
    if (payload.logo_url) {
      const upload = await uploadSingleImage({
        bucket: "startup-logo",
        folder: `${user.id}/logo`,
        file: payload.logo_url,
      });

      if (!upload.success) {
        return {
          success: false,
          data: null,
          message: upload.message,
        };
      }

      logoURL = upload.url!;
      logoPath = upload.path!;
    }

    // Insert Startup
    const { data, error } = await supabase
      .from("startups")
      .insert({
        founder_id: user.id,

        startup_name: payload.startup_name,
        tagline: payload.tagline,
        description: payload.description,

        industry: payload.industry,
        funding_stage: payload.funding_stage,

        website: payload.website,
        linkedin: payload.linkedin,
        github: payload.github,
        twitter: payload.twitter,

        logo_url: logoURL,
        logo_path: logoPath,
      })
      .select()
      .single();
    // Upload showcase images
    if (payload.showcase_images?.length) {
      const showcase = await uploadShowcaseImagesFns({
        startupId: data.id,
        images: payload.showcase_images,
      });

      if (!showcase.success) {
        // Rollback startup
        await supabase.from("startups").delete().eq("id", data.id);

        // Rollback logo
        if (logoPath) {
          await deleteSingleImage({
            bucket: "startup-logo",
            path: logoPath,
          });
        }

        return {
          success: false,
          data: null,
          message: showcase.message,
        };
      }
    }
    // Rollback uploaded logo if insert fails
    if (error) {
      if (logoPath) {
        const rollback = await deleteSingleImage({
          bucket: "startup-logo",
          path: logoPath,
        });

        if (!rollback.success) {
          console.error("Failed to rollback logo:", rollback.message);
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
      message: "Startup created successfully",
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

export const fetchMyStartupFns = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // console.log("Current user:", user);

    if (!user) {
      return {
        success: false,
        data: null,
        message: "User not authenticated",
      };
    }

    const { data, error } = await supabase
      .from("startups")
      .select(
        `
  *,
  startup_media(
    id,
    image_url,
    image_path,
    created_at
  ),
  startup_team(
    id,
    member_name,
    role,
    bio,
    linkedin_url,
    avatar_url,
    avatar_path,
    is_founder,
    created_at
  )
`,
      )
      .eq("founder_id", user.id)
      .maybeSingle();

    // console.log("Startup data:", data);
    console.log("Startup error:", error);

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
      message: "Startup fetched successfully",
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

export const updateStartupFns = async (
  payload: StartupPayload,
  removedShowcaseIds: string[],
) => {
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

    // Fetch existing startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("*")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found",
      };
    }

    const oldLogoPath = startup.logo_path;

    let logoURL = startup.logo_url;
    let logoPath = startup.logo_path;

    // User removed the existing logo
    if (payload.remove_logo && startup.logo_path) {
      const remove = await deleteSingleImage({
        bucket: "startup-logo",
        path: startup.logo_path,
      });

      if (!remove.success) {
        return {
          success: false,
          data: null,
          message: remove.message,
        };
      }

      logoURL = null;
      logoPath = null;
    }
    // Upload new logo if changed
    if (payload.logo_url instanceof File) {
      const upload = await uploadSingleImage({
        bucket: "startup-logo",
        folder: `${user.id}/logo`,
        file: payload.logo_url,
      });

      if (!upload.success) {
        return {
          success: false,
          data: null,
          message: upload.message,
        };
      }

      logoURL = upload.url!;
      logoPath = upload.path!;
    }

    // Update startup
    const { data, error } = await supabase
      .from("startups")
      .update({
        startup_name: payload.startup_name,
        tagline: payload.tagline,
        description: payload.description,

        industry: payload.industry,
        funding_stage: payload.funding_stage,

        website: payload.website,
        linkedin: payload.linkedin,
        github: payload.github,
        twitter: payload.twitter,

        logo_url: logoURL,
        logo_path: logoPath,

        updated_at: new Date().toISOString(),
      })
      .eq("id", startup.id)
      .select()
      .single();

    // Rollback uploaded logo if update fails
    if (error) {
      if (
        payload.logo_url instanceof File &&
        logoPath &&
        logoPath !== oldLogoPath
      ) {
        await deleteSingleImage({
          bucket: "startup-logo",
          path: logoPath,
        });
      }

      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
    for (const id of removedShowcaseIds) {
      await deleteShowcaseImageFns({ id });
    }

    // Upload new showcase images
    if (payload.showcase_images?.length) {
      const showcase = await uploadShowcaseImagesFns({
        startupId: startup.id,
        images: payload.showcase_images,
      });

      if (!showcase.success) {
        return {
          success: false,
          data: null,
          message: showcase.message,
        };
      }
    }

    // Delete old logo after successful update
    if (
      payload.logo_url instanceof File &&
      oldLogoPath &&
      oldLogoPath !== logoPath
    ) {
      await deleteSingleImage({
        bucket: "startup-logo",
        path: oldLogoPath,
      });
    }

    // Fetch updated startup with relations
    const refreshed = await fetchMyStartupFns();

    return {
      success: true,
      data: refreshed.success ? refreshed.data : data,
      message: "Startup updated successfully",
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

export const deleteStartupFns = async () => {
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

    // Fetch startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("*")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found",
      };
    }

    // Fetch showcase images
    const { data: media, error: mediaError } = await supabase
      .from("startup_media")
      .select("image_path")
      .eq("startup_id", startup.id);

    if (mediaError) {
      return {
        success: false,
        data: null,
        message: mediaError.message,
      };
    }

    // Delete logo
    if (startup.logo_path) {
      const logoDelete = await deleteSingleImage({
        bucket: "startup-logo",
        path: startup.logo_path,
      });

      if (!logoDelete.success) {
        console.error("Logo delete failed:", logoDelete.message);
      }
    }

    // Delete showcase images
    if (media.length > 0) {
      const imagePaths = media.map((item) => item.image_path);

      const showcaseDelete = await deleteMultipleImages({
        bucket: "startup-showcase",
        paths: imagePaths,
      });

      if (!showcaseDelete.success) {
        console.error("Showcase delete failed:", showcaseDelete.message);
      }
    }

    // Delete startup
    const { error } = await supabase
      .from("startups")
      .delete()
      .eq("id", startup.id);

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
      message: "Startup deleted successfully",
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

export const submitStartupForReviewFns = async () => {
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

    // Get founder's startup
    const { data: startup, error: startupError } = await supabase
      .from("startups")
      .select("id, status")
      .eq("founder_id", user.id)
      .single();

    if (startupError || !startup) {
      return {
        success: false,
        data: null,
        message: "Startup not found",
      };
    }

    // Prevent duplicate submission
    if (startup.status === StartupStatus.PENDING) {
      return {
        success: false,
        data: null,
        message: "Startup is already submitted for review.",
      };
    }

    if (startup.status === StartupStatus.APPROVED) {
      return {
        success: false,
        data: null,
        message: "Startup is already approved.",
      };
    }

    // Submit for review
    const { data, error } = await supabase
      .from("startups")
      .update({
        status: StartupStatus.PENDING,
        submitted_at: new Date().toISOString(),
      })
      .eq("id", startup.id)
      .select()
      .single();

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
      message: "Startup submitted for review successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message: "Something went wrong.",
    };
  }
};
