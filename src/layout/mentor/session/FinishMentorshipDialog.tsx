"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useFinishMentorshipStore } from "@/store/useFinishMentorshipStore";

import { useFinishMentorship } from "@/hooks/mentor/useMentor";

const FinishMentorshipDialog = () => {
  const {
    isOpen,
    assignmentId,
    startupName,
    closeDialog,
  } = useFinishMentorshipStore();

  const {
    mutateAsync,
    isPending,
  } = useFinishMentorship();

  const handleFinish = async () => {
    if (!assignmentId) return;

    await mutateAsync(assignmentId);

    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Finish Mentorship
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to finish
            the mentorship with{" "}
            <span className="font-semibold">
              {startupName}
            </span>
            ?
          </p>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={closeDialog}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleFinish}
          >
            {isPending
              ? "Finishing..."
              : "Finish Mentorship"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinishMentorshipDialog;