import * as yup from "yup";

export const profileValidation = yup.object({
  full_name: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  email: yup
    .string()
    .required(),

  role: yup
    .string()
    .required(),

  avatar: yup
    .mixed<File>()
    .nullable()
    .default(null),

  avatar_path: yup
    .string()
    .nullable()
    .default(null),

  remove_avatar: yup
    .boolean()
    .default(false),
});

export type ProfileFormValues = yup.InferType<
  typeof profileValidation
>;