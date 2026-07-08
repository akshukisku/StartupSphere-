"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCompleteMentorSession } from "@/hooks/mentor/useMentor";
import { useCompleteSessionStore } from "@/hooks/mentor/useCompleteSessionStore";

const CompleteSessionDialog = () => {
  const [notes, setNotes] = useState("");

  const {
    isOpen,
    sessionId,
    sessionTitle,
    closeDialog,
  } = useCompleteSessionStore();

  const { mutate, isPending } =
    useCompleteMentorSession();

  const handleComplete = () => {
    if (!sessionId) return;

    mutate(
      {
        sessionId,
        notes,
      },
      {
        onSuccess: () => {
          setNotes("");
          closeDialog();
        },
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setNotes("");
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Complete Session
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to mark{" "}
            <span className="font-medium">
              {sessionTitle}
            </span>{" "}
            as completed?
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Add completion notes for this session..."
            rows={5}
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setNotes("");
                closeDialog();
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleComplete}
              disabled={isPending}
            >
              {isPending
                ? "Completing..."
                : "Complete Session"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteSessionDialog;