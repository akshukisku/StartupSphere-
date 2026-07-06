"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, ImagePlus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import DashboardCard from "@/components/common/DashboardCard";
import { getProfileAvatarSignedUrlFns } from "@/api/function/profile.function";
import { ProfileFormValues } from "@/service/validation/profile.validation";
import { useProfileStore } from "@/store/useProfileStore";

const ProfileAvatar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, setValue, watch } =
    useFormContext<ProfileFormValues>();

  const avatarPath = watch("avatar_path");

  const {
    avatarPreview,
    setAvatar,
    removeAvatar,
    resetAvatar,
    setSignedAvatar,
  } = useProfileStore();

useEffect(() => {
  register("avatar");
  register("remove_avatar");
  register("avatar_path");
}, [register]);

  useEffect(() => {
    if (!avatarPath) {
      resetAvatar();
      return;
    }

    const loadAvatar = async () => {
      const res = await getProfileAvatarSignedUrlFns(avatarPath);

      if (res.success && res.data) {
        setSignedAvatar(res.data);
      }
    };

    loadAvatar();
  }, [avatarPath, resetAvatar, setSignedAvatar]);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setValue("avatar", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("remove_avatar", false);
  };

  const handleRemove = () => {
    removeAvatar();

    setValue("avatar", null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("remove_avatar", true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <DashboardCard>
      <div className="flex flex-col items-center gap-5">
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleUpload}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative h-36 w-36 overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted transition hover:border-primary"
        >
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImagePlus className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Profile Photo
          </h3>

          <p className="text-xs text-muted-foreground">
            PNG, JPG or WEBP
            <br />
            Maximum 2MB
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground"
          >
            <Camera className="h-4 w-4" />
            {avatarPreview ? "Replace Photo" : "Upload Photo"}
          </button>

          {avatarPreview && (
            <button
              type="button"
              onClick={handleRemove}
              className="h-11 rounded-xl border transition hover:bg-destructive hover:text-destructive-foreground"
            >
              Remove Photo
            </button>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};

export default ProfileAvatar;