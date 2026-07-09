"use client";

import { useEffect, useMemo } from "react";

import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";

import { useFounders } from "@/hooks/admin/useFounder";
import { useAdminStore } from "@/store/useAdminStore";

import { founderColumns } from "./FounderColumns";
import FounderStats from "./FounderStats";

import AdminToolbar from "@/components/dashboard/AdminToolbar";
import AdminFilters from "@/components/dashboard/AdminFilters";

import StartupPreviewDialog from "@/layout/startup/preview/StartupPreviewDialog";

const FounderManagement = () => {
  const { data: founders, isPending, isError } = useFounders();

  const { search, setSearch, filters, setFilter, closeStartupPreview } =
    useAdminStore();

  useEffect(() => {
    return () => {
      closeStartupPreview();
    };
  }, [closeStartupPreview]);

  const filteredFounders = useMemo(() => {
    const query = search.founders.trim().toLowerCase();

    return (founders ?? []).filter((founder) => {
      const matchesSearch =
        !query ||
        founder.full_name.toLowerCase().includes(query) ||
        founder.email.toLowerCase().includes(query) ||
        founder.startup?.startup_name?.toLowerCase().includes(query);

      const matchesApproval =
        filters.founders.approval === "all" ||
        founder.approval_status === filters.founders.approval;

      const matchesAccount =
        filters.founders.account === "all" ||
        (filters.founders.account === "active"
          ? founder.is_verified
          : !founder.is_verified);

      return matchesSearch && matchesApproval && matchesAccount;
    });
  }, [
    founders,
    search.founders,
    filters.founders.approval,
    filters.founders.account,
  ]);

  if (isError) {
    return (
      <DashboardContainer>
        <div className="rounded-xl border border-destructive p-8 text-center">
          Failed to load founders.
        </div>
      </DashboardContainer>
    );
  }

  return (
    <>
      <DashboardContainer>
        <DashboardPageHeader
          title="Founder Management"
          description="Manage all founders registered on the platform."
        />

        <FounderStats founders={founders ?? []} />

        <AdminToolbar
          search={search.founders}
          onSearchChange={(value) => setSearch("founders", value)}
          placeholder="Search founders..."
          onReset={() => {
            setSearch("founders", "");

            setFilter("founders", "approval", "all");

            setFilter("founders", "account", "all");
          }}
        >
          <AdminFilters
            approval={filters.founders.approval}
            account={filters.founders.account}
            onApprovalChange={(value) =>
              setFilter("founders", "approval", value)
            }
            onAccountChange={(value) => setFilter("founders", "account", value)}
          />
        </AdminToolbar>

        <DynamicTable
          columns={founderColumns}
          data={filteredFounders}
          isLoading={isPending}
          emptyMessage="No founders found."
        />
      </DashboardContainer>

      <StartupPreviewDialog />
    </>
  );
};

export default FounderManagement;
