"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MentorEvaluationFormValues,
  mentorEvaluationValidation,
} from "@/service/validation/mentor.validation";

import { MentorEvaluationPayload } from "@/types/interface/mentor.interface";

import { useCreateMentorEvaluation } from "@/hooks/mentor/useMentor";

import { Button } from "@/components/ui/button";
import FormTextarea from "@/components/common/form/FormTextArea";
import FormStarRating from "@/components/common/form/FormStarRating";
import FormInput from "@/components/common/form/FormInput";

interface EvaluationFormProps {
  sessionId: string;
  assignmentId: string;
  onSuccess: () => void;
}

const EvaluationForm = ({
  sessionId,
  assignmentId,
  onSuccess,
}: EvaluationFormProps) => {
  const {
    mutateAsync,
    isPending,
  } = useCreateMentorEvaluation();

  const methods =
    useForm<MentorEvaluationFormValues>({
      resolver: yupResolver(
        mentorEvaluationValidation
      ),

      defaultValues: {
        technical_rating: 0,
        business_rating: 0,
        communication_rating: 0,
        overall_rating: 5,
        strengths: "",
        recommendations: "",
      },
    });

  const onSubmit = async (
    values: MentorEvaluationFormValues
  ) => {
    const payload: MentorEvaluationPayload = {
      mentor_session_id: sessionId,

      mentor_assignment_id:
        assignmentId,

      technical_rating:
        values.technical_rating,

      business_rating:
        values.business_rating,

      communication_rating:
        values.communication_rating,

      overall_rating:
        values.overall_rating,

      strengths:
        values.strengths.trim(),

      recommendations:
        values.recommendations.trim(),
    };

    await mutateAsync(payload);

    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8"
        onSubmit={methods.handleSubmit(
          onSubmit
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormStarRating
            name="technical_rating"
            label="Technical Guidance"
          />

          <FormStarRating
            name="business_rating"
            label="Business Strategy"
          />

          <FormStarRating
            name="communication_rating"
            label="Communication"
          />

          <FormInput
            name="overall_rating"
            type="number"
            label="Overall Rating (1–10)"
          />
        </div>

        <FormTextarea
          name="strengths"
          label="Strengths"
          placeholder="What did the startup do well?"
        />

        <FormTextarea
          name="recommendations"
          label="Recommendations"
          placeholder="What should they improve?"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Submitting..."
              : "Submit Evaluation"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EvaluationForm;