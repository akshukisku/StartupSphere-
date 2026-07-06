"use client";

import Image from "next/image";

import { StartupPreviewProps } from "@/types/interface/preview.interface";
import PreviewSection from "../PreviewSection";
import { useState } from "react";
import PreviewImageDialog from "@/components/startup/preview/PreviewImageDialog";

const PreviewShowcase = ({ startup }: StartupPreviewProps) => {
  const images = startup.startup_media ?? [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <>
      <PreviewSection
        title="Product Showcase"
        description="Explore screenshots of the product."
      >
        {images.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed">
            <p className="text-muted-foreground">
              No showcase images uploaded.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border bg-muted"
              >
                <Image
                  src={image.image_url}
                  alt="Startup Showcase"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </PreviewSection>
      <PreviewImageDialog
        open={selectedIndex !== null}
        images={images}
        selectedIndex={selectedIndex ?? 0}
        onPrevious={() => {
          if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
        }}
        onNext={() => {
          if (selectedIndex !== null && selectedIndex < images.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
        }}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedIndex(null);
          }
        }}
      />
    </>
  );
};

export default PreviewShowcase;
