"use client";

import { useEffect } from "react";

import DynamicTable from "@/components/common/DynamicTable";

import { startupColumns } from "./AdminStartupColumns";
import AdminRejectDialog from "./AdminRejectDialog";
import { usePendingStartups } from "@/hooks/admin/useAdmin";
import StartupPreviewDialog from "@/layout/startup/preview/StartupPreviewDialog";

const AdminStartupReview = () => {
  const { data: pendingStartups, isPending, isError } = usePendingStartups();

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive p-10 text-center">
        Failed to load pending startups.
      </div>
    );
  }

  return (
    <>
      <DynamicTable
        columns={startupColumns}
        data={pendingStartups ?? []}
        isLoading={isPending}
        emptyMessage="No pending startups found."
      />
      <StartupPreviewDialog />
      <AdminRejectDialog />
    </>
  );
};

export default AdminStartupReview;
