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
import { useRejectStartup, useStartupPreview } from "@/hooks/admin/useAdmin";
import { useAuthStore } from "@/store/useAuthStore";

const AdminRejectDialog = () => {
const {
  rejectDialogOpen,
  selectedStartupForRejectId,
  closeRejectDialog,
} = useAdminStore();
const {
  data: startup,
  isPending,
} = useStartupPreview(
  selectedStartupForRejectId ?? undefined
);

const {
  mutateAsync: rejectStartup,
  isPending: isRejecting,
} = useRejectStartup();

const admin = useAuthStore(
  (state) => state.profile
);

  const [reason, setReason] = useState("");

const handleReject = async () => {
  if (!startup || !admin) return;

  await rejectStartup({
    startupId: startup.id,
    adminId: admin.id,
    reason,
  });

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
   disabled={!reason.trim() || isRejecting}
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