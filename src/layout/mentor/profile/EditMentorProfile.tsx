"use client";

import MentorProfileForm from "./MentorProfileForm";

import {
  MentorProfile,
  MentorProfilePayload,
} from "@/types/interface/mentor.interface";

import {
  MentorProfileFormValues,
} from "@/service/validation/mentor.validation";

import { useUpdateMentorProfile } from "@/hooks/mentor/useMentor";

interface Props {
  mentor: MentorProfile;
}

const EditMentorProfile = ({ mentor }: Props) => {
  const {
    mutateAsync: updateProfile,
    isPending,
  } = useUpdateMentorProfile();

  const onSubmit = async (
    data: MentorProfileFormValues
  ) => {
    const payload: MentorProfilePayload = {
      headline: data.headline.trim(),
      bio: data.bio.trim(),
      experience_years: data.experience_years,

      linkedin_url: data.linkedin_url.trim(),
      portfolio_url: data.portfolio_url.trim(),

      expertise: data.expertise
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      industries: data.industries
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    await updateProfile(payload);
  };

  return (
    <MentorProfileForm
      hasProfile
      isSubmitting={isPending}
      defaultValues={{
        headline: mentor.headline ?? "",
        bio: mentor.bio ?? "",
        experience_years:
          mentor.experience_years,

        linkedin_url:
          mentor.linkedin_url ?? "",

        portfolio_url:
          mentor.portfolio_url ?? "",

        expertise:
          mentor.expertise.join(", "),

        industries:
          mentor.industries.join(", "),
      }}
      onSubmit={onSubmit}
    />
  );
};

export default EditMentorProfile;