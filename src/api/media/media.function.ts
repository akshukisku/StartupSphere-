import { supabase } from "@/lib/supabase.config";
import {
  DeleteImageProps,
  DeleteMultipleImagesProps,
  UploadImageProps,
  UploadMultipleImagesProps,
} from "@/types/interface/media.interface";

export const uploadSingleImage = async ({
  bucket,
  folder,
  file,
}: UploadImageProps) => {
  const fileName = `${crypto.randomUUID()}-${file.name}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) {
    return {
      success: false,
      url: null,
      path: null,
      message: error.message,
    };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    success: true,
    url: data.publicUrl,
    path: filePath,
    message: "Image uploaded successfully",
  };
};

export const deleteSingleImage = async ({ bucket, path }: DeleteImageProps) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Image deleted successfully",
  };
};




export const uploadMultipleImages = async ({
  bucket,
  folder,
  files,
}: UploadMultipleImagesProps) => {
  const urls: string[] = [];
  const paths: string[] = [];

  for (const file of files) {
    const result = await uploadSingleImage({
      bucket,
      folder,
      file,
    });

    if (!result.success) {
      return {
        success: false,
        urls: [],
        paths: [],
        message: result.message,
      };
    }

    urls.push(result.url!);
    paths.push(result.path!);
  }

  return {
    success: true,
    urls,
    paths,
    message: "Images uploaded successfully",
  };
};



export const deleteMultipleImages = async ({
  bucket,
  paths,
}: DeleteMultipleImagesProps) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove(paths);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Images deleted successfully",
  };
};