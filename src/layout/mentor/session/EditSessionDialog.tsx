"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { useEditSessionStore } from "@/store/useEditSessionStore";
import MentorSessionForm from "../startups/MentorSessionForm";

const EditSessionDialog = () => {
  const {
    isOpen,
    sessionId,
    sessionData,
    closeDialog,
  } = useEditSessionStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-w-4xl p-2 overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Edit Session
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Update your mentorship session details.
          </p>
        </DialogHeader>

        {sessionId && sessionData && (
          <MentorSessionForm
            mode="edit"
            sessionId={sessionId}
            defaultValues={sessionData}
            onSuccess={closeDialog}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSessionDialog;