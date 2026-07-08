"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import MentorSessionForm from "./MentorSessionForm";

import { useMentorSessionStore } from "@/store/useMentorSessionStore";

const ScheduleSessionDialog = () => {
  const {
    isScheduleDialogOpen,
    selectedAssignmentId,
    selectedStartupName,
    closeScheduleDialog,
  } = useMentorSessionStore();

  return (
    <Dialog
      open={isScheduleDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeScheduleDialog();
        }
      }}
    >
     <DialogContent className="max-w-4xl p-2 overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Schedule Session
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Schedule a mentorship session with{" "}
            <span className="font-medium">
              {selectedStartupName}
            </span>
            .
          </p>
        </DialogHeader>

        {selectedAssignmentId && (
       <MentorSessionForm
  mode="create"
  mentorAssignmentId={selectedAssignmentId}
  onSuccess={closeScheduleDialog}
/>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleSessionDialog;