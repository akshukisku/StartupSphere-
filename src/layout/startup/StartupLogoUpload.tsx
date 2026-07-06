"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, ImagePlus } from "lucide-react";
import { useStartupStore } from "@/store/useStartupStore";

const StartupLogoUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
const logoPreview = useStartupStore(
  (state) => state.logoPreview
);

const setLogo = useStartupStore(
  (state) => state.setLogo
);

const removeLogo = useStartupStore(
  (state) => state.removeLogo
);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(file);
  };

  return (
    <div className="relative w-fit">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted transition-all hover:border-primary"
      >
        {logoPreview ? (
          <Image
            src={logoPreview}
            alt="Startup Logo"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImagePlus className="h-10 w-10 text-muted-foreground transition-transform group-hover:scale-110" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20" />
      </button>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border bg-primary text-primary-foreground shadow-md transition hover:scale-110"
      >
        <Camera className="h-4 w-4" />
      </button>
      {logoPreview && (
        <button
          type="button"
          onClick={() => {
            removeLogo();

            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-white shadow transition hover:scale-110"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default StartupLogoUpload;
