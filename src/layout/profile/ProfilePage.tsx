"use client";

import { useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";

import {
  profileValidation,
  ProfileFormValues,
} from "@/service/validation/profile.validation";

import { useProfile } from "@/hooks/profile/useProfile";
import { useUpdateProfile } from "@/hooks/profile/useProfile";

import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";

const ProfilePage = () => {
  const { data: profile, isPending } = useProfile();

  const { mutateAsync: updateProfile, isPending: updatingProfile } =
    useUpdateProfile();
  const methods = useForm<ProfileFormValues>({
    resolver: yupResolver(profileValidation),

    defaultValues: {
      full_name: "",
      email: "",
      role: "",

      avatar: null,
      avatar_path: "",

      remove_avatar: false,
    },
  });

  useEffect(() => {
    if (!profile) return;

    methods.reset({
      full_name: profile.full_name,
      email: profile.email,
      role: profile.role,

      avatar: null,
      avatar_path: profile.avatar_path ?? "",

      remove_avatar: false,
    });
  }, [profile, methods]);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("onSubmit fired with:", data);
    await updateProfile({
      full_name: data.full_name,
      avatar: data.avatar,
      remove_avatar: data.remove_avatar,
    });
  };

  if (isPending) {
    return <ProfileSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8"
        onSubmit={methods.handleSubmit(onSubmit, (errors) => {
          console.log("VALIDATION ERRORS:", errors);
        })}
      >
        <ProfileHeader />

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12 lg:items-start">
          {/* Avatar */}
          <div className="flex justify-center lg:col-span-4 lg:justify-start">
            <div className="w-full max-w-sm">
              <ProfileAvatar />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <ProfileForm isSubmitting={updatingProfile} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfilePage;
