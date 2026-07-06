
export interface UploadImageProps {
  bucket: string;
  folder: string;
  file: File;
}

export interface DeleteImageProps {
  bucket: string;
  path: string;
}

export interface UploadMultipleImagesProps {
  bucket: string;
  folder: string;
  files: File[];
}

export interface DeleteMultipleImagesProps {
  bucket: string;
  paths: string[];
}
