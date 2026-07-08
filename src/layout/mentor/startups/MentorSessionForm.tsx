"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MentorSessionFormValues,
  mentorSessionValidation,
} from "@/service/validation/mentor.validation";

import {
  useCreateMentorSession,
  useUpdateMentorSession,
} from "@/hooks/mentor/useMentor";
import { MentorSessionPayload } from "@/types/interface/mentor.interface";

import { Button } from "@/components/ui/button";
import SessionBasicInfo from "./SessionBasicInfo";
import SessionSchedule from "./SessionSchedule";

interface MentorSessionFormProps {
  mode: "create" | "edit";

  mentorAssignmentId?: string;

  sessionId?: string;

  defaultValues?: Partial<MentorSessionFormValues>;

  onSuccess: () => void;
}

const MentorSessionForm = ({
  mode,
  mentorAssignmentId,
  sessionId,
  defaultValues,
  onSuccess,
}: MentorSessionFormProps) => {
  const { mutateAsync: createSession, isPending: isCreating } =
    useCreateMentorSession();

  const { mutateAsync: updateSession, isPending: isUpdating } =
    useUpdateMentorSession();

  const isPending = isCreating || isUpdating;

  const methods = useForm<MentorSessionFormValues>({
    resolver: yupResolver(mentorSessionValidation),

    defaultValues: {
      mentor_assignment_id: mentorAssignmentId ?? "",

      title: defaultValues?.title ?? "",

      description: defaultValues?.description ?? "",

      meeting_link: defaultValues?.meeting_link ?? "",

      session_date: defaultValues?.session_date ?? "",

      duration: defaultValues?.duration ?? 60,
    },
  });

  const onSubmit = async (data: MentorSessionFormValues) => {
    const payload: MentorSessionPayload = {
      mentor_assignment_id: mentorAssignmentId ?? "",

      title: data.title.trim(),

      description: data.description.trim(),

      meeting_link: data.meeting_link.trim(),

      session_date: data.session_date,

      duration: data.duration,
    };

    if (mode === "create") {
      await createSession(payload);
    } else {
      if (!sessionId) return;

      await updateSession({
        sessionId,
        payload,
      });
    }

    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-2">
          <SessionBasicInfo />
          <SessionSchedule />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? mode === "create"
                ? "Scheduling..."
                : "Updating..."
              : mode === "create"
                ? "Schedule Session"
                : "Update Session"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MentorSessionForm;
