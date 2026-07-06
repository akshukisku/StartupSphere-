import { UserRole } from "@/types/enum/enum";
import * as yup from "yup";

export const registerSchema = yup.object({
  full_name: yup.string().trim().required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .required(),

  terms: yup
    .boolean()
    .required()
    .oneOf([true], "You must accept the Terms & Conditions"),
});
