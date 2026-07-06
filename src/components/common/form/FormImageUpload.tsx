"use client";

import Image from "next/image";
import { Camera, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FormImageUploadProps {
  preview: string | null;

  onUpload: (file: File) => void;

  onRemove: () => void;

  size?: number;

  title?: string;

  description?: string;

  disabled?: boolean;

  className?: string;

  placeholder?: React.ReactNode;
}

const FormImageUpload = ({
  preview,
  onUpload,
  onRemove,
  size = 120,
  title,
  description,
  disabled = false,
  className,
  placeholder,
}: FormImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onUpload(file);

    // Allow selecting the same file again
    e.target.value = "";
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {(title || description) && (
        <div className="text-center">
          {title && (
            <h4 className="text-sm font-semibold">
              {title}
            </h4>
          )}

          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative overflow-hidden rounded-full border bg-muted",
          className
        )}
        style={{
          width: size,
          height: size,
        }}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {placeholder ?? (
              <User className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {!disabled && (
        <Button
          type="button"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full"
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
      )}

      {preview && !disabled && (
        <Button
          type="button"
          size="icon"
          variant="destructive"
          className="absolute -top-2 -right-2 rounded-full"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormImageUpload;