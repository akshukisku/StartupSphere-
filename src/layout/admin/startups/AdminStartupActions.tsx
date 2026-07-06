"use client";

import UserActionDialog from "@/app/admin/UserActionDialog";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/useAdminStore";
import { AdminStartup } from "@/types/interface/admin.interface";

interface Props {
  startup: AdminStartup;
}

const AdminStartupActions = ({ startup }: Props) => {
  const fetchStartupById = useAdminStore((state) => state.fetchStartupById);
  const approveStartup = useAdminStore((state) => state.approveStartup);
  const openRejectDialog = useAdminStore((state) => state.openRejectDialog);
  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => fetchStartupById(startup.id)}
      >
        View
      </Button>

      <UserActionDialog
        title="Approve Startup"
        description="Are you sure you want to approve this startup?"
        onConfirm={() => approveStartup(startup.id)}
        trigger={<Button size="sm">Approve</Button>}
      />
      <Button
        size="sm"
        variant="destructive"
        onClick={() => openRejectDialog(startup)}
      >
        Reject
      </Button>
    </div>
  );
};

export default AdminStartupActions;
