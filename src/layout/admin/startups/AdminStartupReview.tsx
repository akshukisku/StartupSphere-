"use client";

import { useEffect } from "react";

import DynamicTable from "@/components/common/DynamicTable";

import { startupColumns } from "./AdminStartupColumns";
import { useAdminStore } from "@/store/useAdminStore";
import AdminStartupDialog from "./AdminStartupDialog";
import AdminRejectDialog from "./AdminRejectDialog";

const AdminStartupReview = () => {
  const { pendingStartups, fetchPendingStartups, isLoading } = useAdminStore();

  useEffect(() => {
    fetchPendingStartups();
  }, [fetchPendingStartups]);

  return (
  <>
    <DynamicTable
      columns={startupColumns}
      data={pendingStartups}
      isLoading={isLoading}
      emptyMessage="No pending startups found."
    />
    <AdminStartupDialog/>
    <AdminRejectDialog/>
    </>
  );
};

export default AdminStartupReview;
