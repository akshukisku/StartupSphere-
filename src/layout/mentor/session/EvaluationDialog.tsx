"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMentorEvaluationStore } from "@/store/useMentorEvaluationStore";

import EvaluationForm from "./EvaluationForm";

const EvaluationDialog = () => {
  const {
    isOpen,
    sessionId,
    assignmentId,
    closeDialog,
    startupName,
  } = useMentorEvaluationStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Session Evaluation
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Submit your evaluation for{" "}
            <span className="font-medium">
              {startupName}
            </span>
            .
          </p>
        </DialogHeader>

        {sessionId &&
          assignmentId && (
            <EvaluationForm
              sessionId={sessionId}
              assignmentId={
                assignmentId
              }
              onSuccess={closeDialog}
            />
          )}
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationDialog;