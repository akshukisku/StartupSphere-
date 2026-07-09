"use client";

import { useMemo } from "react";

import DynamicTable from "@/components/common/DynamicTable";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import AdminToolbar from "@/components/dashboard/AdminToolbar";
import AdminFilters from "@/components/dashboard/AdminFilters";

import { useAdminStore } from "@/store/useAdminStore";
import { useMentorManagement } from "@/hooks/admin/useMentorManagement";

import MentorStats from "./MentorStats";
import { mentorColumns } from "./MentorColumns";

const MentorManagement = () => {
  const {
    data: mentors,
    isPending,
    isError,
    error,
  } = useMentorManagement();

  const {
    search,
    setSearch,
    filters,
    setFilter,
  } = useAdminStore();

  const filteredMentors = useMemo(() => {
    const query = search.mentors.trim().toLowerCase();

    return (mentors ?? []).filter((mentor) => {
      const matchesSearch =
        !query ||
        mentor.full_name
          .toLowerCase()
          .includes(query) ||
        mentor.email
          .toLowerCase()
          .includes(query);

      const matchesApproval =
        filters.mentors.approval === "all" ||
        mentor.approval_status ===
          filters.mentors.approval;

      const matchesAccount =
        filters.mentors.account === "all" ||
        (filters.mentors.account === "active"
          ? mentor.is_verified
          : !mentor.is_verified);

      return (
        matchesSearch &&
        matchesApproval &&
        matchesAccount
      );
    });
  }, [
    mentors,
    search.mentors,
    filters.mentors.approval,
    filters.mentors.account,
  ]);

  if (isError) {
    return (
      <DashboardContainer>
        <div className="rounded-xl border border-destructive bg-destructive/5 p-8">
          <h2 className="font-semibold text-destructive">
            Failed to load mentors.
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
        title="Mentor Management"
        description="Manage all mentors registered on the platform."
      />

      <MentorStats mentors={mentors ?? []} />

      <AdminToolbar
        search={search.mentors}
        onSearchChange={(value) =>
          setSearch("mentors", value)
        }
        placeholder="Search mentors..."
        onReset={() => {
          setSearch("mentors", "");
          setFilter("mentors", "approval", "all");
          setFilter("mentors", "account", "all");
        }}
      >
        <AdminFilters
          approval={filters.mentors.approval}
          account={filters.mentors.account}
          onApprovalChange={(value) =>
            setFilter("mentors", "approval", value)
          }
          onAccountChange={(value) =>
            setFilter("mentors", "account", value)
          }
        />
      </AdminToolbar>

      <DynamicTable
        columns={mentorColumns}
        data={filteredMentors}
        isLoading={isPending}
        emptyMessage="No mentors found."
      />
    </DashboardContainer>
  );
};

export default MentorManagement;