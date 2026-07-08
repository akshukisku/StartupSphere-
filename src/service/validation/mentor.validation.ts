import * as yup from "yup";

export const mentorProfileValidation = yup.object({
  headline: yup
    .string()
    .trim()
    .required("Headline is required")
    .min(5, "Headline must be at least 5 characters"),

  bio: yup
    .string()
    .trim()
    .required("Bio is required")
    .min(50, "Bio must be at least 50 characters"),

  experience_years: yup
    .number()
    .required("Experience is required")
    .min(0)
    .max(60),

  linkedin_url: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid LinkedIn URL")
    .default(""),

  portfolio_url: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid Portfolio URL")
    .default(""),

  expertise: yup.string().required("Expertise is required"),

  industries: yup.string().required("Industry is required"),
});

export type MentorProfileFormValues = yup.InferType<
  typeof mentorProfileValidation
>;

export const mentorSessionValidation = yup.object({
  mentor_assignment_id: yup.string().required("Please select a startup."),

  title: yup.string().trim().required("Session title is required."),

  description: yup.string().trim().default(""),

  meeting_link: yup.string().trim().url("Invalid meeting link").default(""),

  session_date: yup.string().required("Session date is required."),

  duration: yup.number().required().min(15).max(240),
});

export type MentorSessionFormValues = yup.InferType<
  typeof mentorSessionValidation
>;
export interface MentorEvaluationFormValues {
  technical_rating: number;

  business_rating: number;

  communication_rating: number;

  overall_rating: number;

  strengths: string;

  recommendations: string;
}

export const mentorEvaluationValidation = yup.object({
  technical_rating: yup
    .number()
    .min(1)
    .max(5)
    .required(),

  business_rating: yup
    .number()
    .min(1)
    .max(5)
    .required(),

  communication_rating: yup
    .number()
    .min(1)
    .max(5)
    .required(),

  overall_rating: yup
    .number()
    .min(1)
    .max(10)
    .required(),

  strengths: yup
    .string()
    .trim()
    .required("Strengths are required."),

  recommendations: yup
    .string()
    .trim()
    .required("Recommendations are required."),
});