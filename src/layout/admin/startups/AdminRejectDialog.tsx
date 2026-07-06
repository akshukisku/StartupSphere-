"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAdminStore } from "@/store/useAdminStore";

const AdminRejectDialog = () => {
  const {
    rejectDialogOpen,
    selectedStartup,
    closeRejectDialog,
    rejectStartup,
    isLoading,
  } = useAdminStore();

  const [reason, setReason] = useState("");

  const handleReject = async () => {
    if (!selectedStartup || !reason.trim()) return;

    const success = await rejectStartup(selectedStartup.id, reason);

    if (!success) return;

    setReason("");
    closeRejectDialog();
  };

  return (
    <AlertDialog
      open={rejectDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setReason("");
          closeRejectDialog();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Reject Startup
          </AlertDialogTitle>

          <AlertDialogDescription>
            Please provide a reason for rejecting this startup.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Textarea
          rows={5}
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={!reason.trim() || isLoading}
              onClick={handleReject}
            >
              Reject Startup
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminRejectDialog;