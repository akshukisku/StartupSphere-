"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  images: {
    id: string;
    image_url: string;
  }[];

  selectedIndex: number;

  onPrevious: () => void;
  onNext: () => void;

  onOpenChange: (open: boolean) => void;
}

const PreviewImageDialog = ({
  open,
  images,
  selectedIndex,
  onPrevious,
  onNext,
  onOpenChange,
}: Props) => {
  const currentImage = images[selectedIndex];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          if (selectedIndex > 0) {
            onPrevious();
          }
          break;

        case "ArrowRight":
          if (selectedIndex < images.length - 1) {
            onNext();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    open,
    selectedIndex,
    images.length,
    onPrevious,
    onNext,
  ]);

  if (!currentImage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl border-0 bg-black/95 p-0 shadow-none">
        <div className="relative flex h-[80vh] items-center justify-center">
          {/* Previous */}
          <button
            type="button"
            onClick={onPrevious}
            disabled={selectedIndex === 0}
            className="absolute left-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Image */}
          <div className="relative h-full w-full">
            <Image
              src={currentImage.image_url}
              alt={`Showcase ${selectedIndex + 1}`}
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={onNext}
            disabled={selectedIndex === images.length - 1}
            className="absolute right-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-sm font-medium text-white backdrop-blur">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImageDialog;