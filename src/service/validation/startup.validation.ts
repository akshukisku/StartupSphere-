import * as yup from "yup";

export const startupValidation = yup.object({
  remove_logo: yup.boolean().default(false).required(),

  startup_name: yup
    .string()
    .trim()
    .required("Startup name is required")
    .min(2, "Startup name must be at least 2 characters"),

  tagline: yup
    .string()
    .trim()
    .required("Tagline is required")
    .min(5, "Tagline must be at least 5 characters"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),

  industry: yup.string().required("Industry is required"),

  funding_stage: yup.string().required("Funding stage is required"),

  website: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid website URL")
    .default(""),

  linkedin: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid LinkedIn URL")
    .default(""),

  github: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid GitHub URL")
    .default(""),

  twitter: yup
    .string()
    .trim()
    .transform((v) => v || "")
    .url("Invalid Twitter URL")
    .default(""),

  logo_url: yup
    .mixed<File>()
    .nullable()
    .default(null),

  showcase_images: yup
    .array()
    .of(yup.mixed<File>().required())
    .default([]),

  cover_url: yup
    .string()
    .nullable()
    .default(null),

  cover_path: yup
    .string()
    .nullable()
    .default(null),
});

export type StartupFormValues = yup.InferType<typeof startupValidation>;