import * as yup from "yup";

export const teamValidation = yup.object({
  member_name: yup.string().trim().required("Member name is required"),

  role: yup.string().trim().required("Role is required"),

  bio: yup.string().default(""),

  linkedin_url: yup.string().trim().url("Invalid LinkedIn URL").default(""),

  avatar: yup.mixed<File>().nullable().default(null),

  is_founder: yup.boolean().default(false),
  remove_avatar: yup.boolean().default(false),
});

export type TeamForm = yup.InferType<typeof teamValidation>;
