"use client";

import { Button } from "@/components/ui/button";
import DynamicTable from "@/components/common/DynamicTable";
import { PendingUser } from "@/types/interface/admin.interface";
import { TableColumn } from "@/types/type/table.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import UserActionDialog from "../UserActionDialog";
import {
  useApproveUser,
  usePendingUsers,
  useRejectUser,
} from "@/hooks/admin/useAdmin";
const AdminUsersPage = () => {
  const { data: users, isPending, isError } = usePendingUsers();

  const { mutateAsync: approveUser } = useApproveUser();

  const { mutateAsync: rejectUser } = useRejectUser();

  const handleApprove = async (userId: string) => {
    await approveUser(userId);
  };
  
  const handleReject = async (userId: string) => {
    await rejectUser(userId);
  };

  const columns: TableColumn<PendingUser>[] = [
    {
      header: "Name",
      key: "full_name",
      render: (row) =>
        row.full_name ?? (
          <span className="text-muted-foreground">Loading...</span>
        ),
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Role",
      key: "role",
      render: (row) =>
        row.role ? (
          row.role.charAt(0).toUpperCase() + row.role.slice(1)
        ) : (
          <Badge variant="outline">Loading...</Badge>
        ),
    },
    {
      header: "Status",
      key: "approval_status",
      render: (row) => (
        <Badge
          variant={
            row.approval_status === "approved"
              ? "default"
              : row.approval_status === "rejected"
                ? "destructive"
                : "secondary"
          }
        >
          {row.approval_status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      key: "id",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <UserActionDialog
            title="Approve User"
            description="Are you sure you want to approve this user?"
            onConfirm={() => handleApprove(row.id)}
            trigger={<Button size="sm">Approve</Button>}
          />

          <UserActionDialog
            title="Reject User"
            description="Are you sure you want to reject this user?"
            onConfirm={() => handleReject(row.id)}
            trigger={
              <Button size="sm" variant="destructive">
                Reject
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  if (isPending) {
    return (
      <div className="flex h-75 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive p-8 text-center">
        Failed to load pending users.
      </div>
    );
  }
  return (
    <div className="space-y-6 p-6">
      {/* Stats Card */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Pending Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{users?.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pending User Approvals</CardTitle>
        </CardHeader>

        <CardContent>
          <DynamicTable
            columns={columns}
            data={users ?? []}
            emptyMessage="No pending users"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
