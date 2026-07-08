"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useEditSessionStore } from "@/store/useEditSessionStore";
import { MentorSessionFormValues } from "@/service/validation/mentor.validation";

interface EditSessionButtonProps {
  session: {
    id: string;
    title: string;
    description: string;
    meeting_link: string;
    session_date: string;
    duration: number;
  };
}

const EditSessionButton = ({
  session,
}: EditSessionButtonProps) => {
  const openDialog = useEditSessionStore(
    (state) => state.openDialog
  );

  const handleClick = () => {
    const formValues: Partial<MentorSessionFormValues> = {
      title: session.title,
      description: session.description,
      meeting_link: session.meeting_link,
      session_date: session.session_date,
      duration: session.duration,
    };

    openDialog(session.id, formValues);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
    >
      <Pencil className="mr-2 h-4 w-4" />
      Edit Session
    </Button>
  );
};

export default EditSessionButton;