"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMentorRequestStore } from "@/hooks/mentor/useMentorRequestStore";
import { useUpdateMentorRequestStatus } from "@/hooks/mentor/useMentor";


const MentorDetailsDialog = () => {
  const {
    isDetailsDialogOpen,
    selectedRequest,
    closeDetailsDialog,
  } = useMentorRequestStore();
  const { mutate, isPending } =
  useUpdateMentorRequestStatus();

  if (!selectedRequest) return null;

  const status = selectedRequest.status.toLowerCase();

  const badgeClass =
    status === "accepted"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/30"
      : status === "rejected"
        ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30"
        : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30";

  return (
    <Dialog
      open={isDetailsDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDetailsDialog();
        }
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Mentor Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Startup */}

          <div>
            <h3 className="text-sm text-muted-foreground">
              Startup
            </h3>

            <p className="font-semibold">
              {selectedRequest.startup.startup_name}
            </p>

            <p className="text-sm text-muted-foreground">
              {selectedRequest.startup.industry}
            </p>
          </div>

          {/* Founder */}

          <div>
            <h3 className="text-sm text-muted-foreground">
              Founder
            </h3>

            <p className="font-semibold">
              {selectedRequest.founder.full_name}
            </p>

            <p className="text-sm text-muted-foreground">
              {selectedRequest.founder.email}
            </p>
          </div>

          {/* Status */}

          <div>
            <h3 className="text-sm text-muted-foreground">
              Status
            </h3>

            <Badge
              variant="outline"
              className={badgeClass}
            >
              {selectedRequest.status}
            </Badge>
          </div>

          {/* Message */}

          <div>
            <h3 className="text-sm text-muted-foreground">
              Message
            </h3>

            <div className="mt-2 rounded-lg border p-4">
              <p className="leading-7">
                {selectedRequest.message}
              </p>
            </div>
          </div>

          {/* Footer */}
<div className="flex justify-end gap-3 border-t pt-4">
  <Button
    variant="outline"
    onClick={closeDetailsDialog}
  >
    Close
  </Button>

  {selectedRequest.status === "pending" && (
    <>
      <Button
        variant="destructive"
        disabled={isPending}
        onClick={() =>
          mutate(
            {
              requestId: selectedRequest.id,
              status: "rejected",
            },
            {
              onSuccess: () => {
                closeDetailsDialog();
              },
            }
          )
        }
      >
        Reject
      </Button>

      <Button
        disabled={isPending}
        onClick={() =>
          mutate(
            {
              requestId: selectedRequest.id,
              status: "accepted",
            },
            {
              onSuccess: () => {
                closeDetailsDialog();
              },
            }
          )
        }
      >
        Accept
      </Button>
    </>
  )}
</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorDetailsDialog;