"use client";

import MentorProfileForm from "./MentorProfileForm";

import { useCreateMentorProfile } from "@/hooks/mentor/useMentor";
import { MentorProfileFormValues } from "@/service/validation/mentor.validation";

const CreateMentorProfile = () => {
  const {
    mutateAsync: createProfile,
    isPending,
  } = useCreateMentorProfile();

  const onSubmit = async (
    data: MentorProfileFormValues
  ) => {
    await createProfile({
      ...data,

      expertise: data.expertise
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      industries: data.industries
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <MentorProfileForm
      hasProfile={false}
      isSubmitting={isPending}
      onSubmit={onSubmit}
    />
  );
};

export default CreateMentorProfile;