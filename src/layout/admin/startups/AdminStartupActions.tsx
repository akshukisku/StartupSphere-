"use client";

import UserActionDialog from "@/app/admin/UserActionDialog";

import { Button } from "@/components/ui/button";

import { useApproveStartup } from "@/hooks/admin/useAdmin";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";

import { AdminStartup } from "@/types/interface/admin.interface";

interface Props {
  startup: AdminStartup;
}

const AdminStartupActions = ({ startup }: Props) => {
  const admin = useAuthStore((state) => state.profile);

  const openStartupPreview = useAdminStore(
    (state) => state.openStartupPreview
  );

  const openRejectDialog = useAdminStore(
    (state) => state.openRejectDialog
  );

  const {
    mutateAsync: approveStartup,
    isPending: isApproving,
  } = useApproveStartup();

  const handleApprove = async () => {
    if (!admin) return;

    await approveStartup({
      startupId: startup.id,
      adminId: admin.id,
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => openStartupPreview(startup.id)}
      >
        View
      </Button>

      <UserActionDialog
        title="Approve Startup"
        description="Are you sure you want to approve this startup?"
        onConfirm={handleApprove}
        trigger={
          <Button
            size="sm"
            disabled={isApproving}
          >
            Approve
          </Button>
        }
      />

      <Button
        size="sm"
        variant="destructive"
        onClick={() =>
          openRejectDialog(startup.id)
        }
      >
        Reject
      </Button>
    </div>
  );
};

export default AdminStartupActions;