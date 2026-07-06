"use client";

import DashboardCard from "@/components/common/DashboardCard";
import SectionHeader from "@/components/common/SectionHeader";
import UploadArea from "@/components/common/UploadArea";
import { Button } from "@/components/ui/button";
import { useStartup } from "@/hooks/startup/useStartup";
import { useStartupStore } from "@/store/useStartupStore";
import {  Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const StartupShowcase = () => {
  const { data: startup } = useStartup();



  const showcasePreviews = useStartupStore((state) => state.showcasePreviews);

  const addShowcaseFiles = useStartupStore((state) => state.addShowcaseFiles);

  const removeNewShowcaseFile = useStartupStore(
    (state) => state.removeNewShowcaseFile,
  );

  const removeExistingShowcaseFile = useStartupStore(
    (state) => state.removeExistingShowcaseFile,
  );

  const removedShowcaseIds = useStartupStore(
    (state) => state.removedShowcaseIds,
  );
    const existingMedia =
    startup?.startup_media?.filter(
      (media:any) => !removedShowcaseIds.includes(media.id),
    ) ?? [];

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    addShowcaseFiles(files);

    // Allow selecting the same file again
    e.target.value = "";
  };

  return (
    <DashboardCard contentClassName="space-y-8">
      <SectionHeader
        title="Product Showcase"
        description="Showcase screenshots of your product."
        action={
          <Button
            type="button"
            size="sm"
            className="h-10 rounded-xl"
            onClick={() => inputRef.current?.click()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Media
          </Button>
        }
      />

      {/* Hidden Input */}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleUpload}
      />

      {/* Upload Area */}

      {existingMedia.length === 0 && showcasePreviews.length === 0 && (
        <div onClick={() => inputRef.current?.click()}>
          <UploadArea
            title="Drag & Drop Images"
            description="PNG, JPG or WEBP • Max 5MB"
            buttonText="Browse Files"
          />
        </div>
      )}

      {/* Preview Grid */}

      {(existingMedia.length > 0 || showcasePreviews.length > 0) && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {/* Existing Images */}
          {existingMedia.map((media:any) => (
            <div
              key={media.id}
              className="group relative aspect-video overflow-hidden rounded-2xl border"
            >
              <Image
                src={media.image_url}
                alt="Startup Showcase"
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => removeExistingShowcaseFile(media.id)}
                className="absolute right-3 top-3 flex h-8 w-8 scale-0 items-center justify-center rounded-full bg-background shadow transition-all duration-200 group-hover:scale-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Newly Uploaded Images */}
          {showcasePreviews.map((preview, index) => (
            <div
              key={`new-${index}`}
              className="group relative aspect-video overflow-hidden rounded-2xl border"
            >
              <Image
                src={preview}
                alt={`Showcase ${index + 1}`}
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => removeNewShowcaseFile(index)}
                className="absolute right-3 top-3 flex h-8 w-8 scale-0 items-center justify-center rounded-full bg-background shadow transition-all duration-200 group-hover:scale-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
};

export default StartupShowcase;
