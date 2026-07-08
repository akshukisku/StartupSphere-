"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import MentorHeader from "./MentorHeader";
import MentorBasicInfo from "./MentorBasicInfo";
import MentorExpertise from "./MentorExpertise";
import MentorSocialLinks from "./MentorSocialLinks";

import {
  MentorProfileFormValues,
  mentorProfileValidation,
} from "@/service/validation/mentor.validation";

interface MentorProfileFormProps {
  hasProfile: boolean;
  isSubmitting: boolean;
  defaultValues?: Partial<MentorProfileFormValues>;
  onSubmit: (
    data: MentorProfileFormValues
  ) => Promise<void>;
}

const MentorProfileForm = ({
  hasProfile,
  isSubmitting,
  defaultValues,
  onSubmit,
}: MentorProfileFormProps) => {
  const methods = useForm<MentorProfileFormValues>({
    resolver: yupResolver(mentorProfileValidation),

    defaultValues: {
      headline: "",
      bio: "",
      experience_years: 0,

      linkedin_url: "",
      portfolio_url: "",

      expertise: "",
      industries: "",

      ...defaultValues,
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <MentorHeader
          hasProfile={hasProfile}
          isSubmitting={isSubmitting}
        />

        <MentorBasicInfo />

        <MentorExpertise />

        <MentorSocialLinks />
      </form>
    </FormProvider>
  );
};

export default MentorProfileForm;