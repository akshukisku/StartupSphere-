"use client";

import { useMemo } from "react";

import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import AdminToolbar from "@/components/dashboard/AdminToolbar";
import AdminFilters from "@/components/dashboard/AdminFilters";

import { useInvestorManagement } from "@/hooks/admin/useInvestorManagement";
import { useAdminStore } from "@/store/useAdminStore";

import InvestorStats from "./InvestorStats";
import { investorColumns } from "./InvestorColumns";


const InvestorManagement = () => {
  const {
    data: investors,
    isPending,
    isError,
    error,
  } = useInvestorManagement();

  const {
    search,
    setSearch,
    filters,
    setFilter,
  } = useAdminStore();

  const filteredInvestors = useMemo(() => {
    const query = search.investors.trim().toLowerCase();

    return (investors ?? []).filter((investor) => {
      const matchesSearch =
        !query ||
        investor.full_name
          .toLowerCase()
          .includes(query) ||
        investor.email
          .toLowerCase()
          .includes(query);

      const matchesApproval =
        filters.investors.approval === "all" ||
        investor.approval_status ===
          filters.investors.approval;

      const matchesAccount =
        filters.investors.account === "all" ||
        (filters.investors.account ===
        "active"
          ? investor.is_verified
          : !investor.is_verified);

      return (
        matchesSearch &&
        matchesApproval &&
        matchesAccount
      );
    });
  }, [
    investors,
    search.investors,
    filters.investors.approval,
    filters.investors.account,
  ]);

  if (isError) {
    return (
      <DashboardContainer>
        <div className="rounded-xl border border-destructive bg-destructive/5 p-8">
          <h2 className="font-semibold text-destructive">
            Failed to load investors.
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error.message}
          </p>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Investor Management"
        description="Manage all investors registered on the platform."
      />

      <InvestorStats
        investors={investors ?? []}
      />

      <AdminToolbar
        search={search.investors}
        onSearchChange={(value) =>
          setSearch("investors", value)
        }
        placeholder="Search investors..."
        onReset={() => {
          setSearch("investors", "");

          setFilter(
            "investors",
            "approval",
            "all"
          );

          setFilter(
            "investors",
            "account",
            "all"
          );
        }}
      >
        <AdminFilters
          approval={
            filters.investors.approval
          }
          account={
            filters.investors.account
          }
          onApprovalChange={(value) =>
            setFilter(
              "investors",
              "approval",
              value
            )
          }
          onAccountChange={(value) =>
            setFilter(
              "investors",
              "account",
              value
            )
          }
        />
      </AdminToolbar>

      <DynamicTable
        columns={investorColumns}
        data={filteredInvestors}
        isLoading={isPending}
        emptyMessage="No investors found."
      />
    </DashboardContainer>
  );
};

export default InvestorManagement;