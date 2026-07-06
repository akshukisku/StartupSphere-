import { supabase } from "@/lib/supabase.config";
import {
  uploadMultipleImages,
  deleteMultipleImages,
  deleteSingleImage,
} from "../media/media.function";

interface UploadShowcaseImagesPayload {
  startupId: string;
  images: File[];
}
interface DeleteShowcaseImagePayload {
  id: string;
}

export const uploadShowcaseImagesFns = async ({
  startupId,
  images,
}: UploadShowcaseImagesPayload) => {
  try {
    const upload = await uploadMultipleImages({
      bucket: "startup-showcase",
      folder: startupId,
      files: images,
    });

    if (!upload.success) {
      return {
        success: false,
        message: upload.message,
      };
    }

    const media = upload.urls.map((url, index) => ({
      startup_id: startupId,
      image_url: url,
      image_path: upload.paths[index],
    }));

    const { error } = await supabase.from("startup_media").insert(media);

    if (error) {
      await deleteMultipleImages({
        bucket: "startup-showcase",
        paths: upload.paths,
      });

      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Showcase uploaded successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};


export const fetchShowcaseImagesFns = async (
  startupId: string
) => {
  try {
    const { data, error } = await supabase
      .from("startup_media")
      .select("*")
      .eq("startup_id", startupId)
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
      message: "Images fetched successfully",
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

export const deleteShowcaseImageFns = async ({
  id,
}: DeleteShowcaseImagePayload) => {
  try {
    const { data, error } = await supabase
      .from("startup_media")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: "Image not found",
      };
    }

    const remove = await deleteSingleImage({
      bucket: "startup-showcase",
      path: data.image_path,
    });

    if (!remove.success) {
      return remove;
    }

    const { error: deleteError } = await supabase
      .from("startup_media")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return {
        success: false,
        message: deleteError.message,
      };
    }

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};