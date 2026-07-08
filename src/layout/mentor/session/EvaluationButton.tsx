"use client";

import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useMentorEvaluationStore } from "@/store/useMentorEvaluationStore";

interface EvaluationButtonProps {
  sessionId: string;
  assignmentId: string;
  startupName: string;
}

const EvaluationButton = ({
  sessionId,
  assignmentId,
  startupName,
}: EvaluationButtonProps) => {
  const openDialog =
    useMentorEvaluationStore(
      (state) => state.openDialog
    );

  return (
    <Button
      onClick={() =>
        openDialog(
          sessionId,
          assignmentId,
          startupName
        )
      }
    >
      <ClipboardCheck className="mr-2 h-4 w-4" />

      Submit Evaluation
    </Button>
  );
};

export default EvaluationButton;