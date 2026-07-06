import * as yup from "yup";

export const pitchDeckValidation = yup.object({
  file: yup
    .mixed<File>()
    .test(
      "is-required",
      "Please upload a pitch deck.",
      (value) => value instanceof File
    )
    .test("fileSize", "Maximum size is 10 MB", (value) => {
      if (!value) return false;
      return value.size <= 10 * 1024 * 1024;
    }),
});
