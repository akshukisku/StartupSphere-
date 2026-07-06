"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import DynamicTable from "@/components/common/DynamicTable";
import { useAdminStore } from "@/store/useAdminStore";
import { PendingUser } from "@/types/interface/admin.interface";
import { TableColumn } from "@/types/type/table.type";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import UserActionDialog from "../UserActionDialog";
const AdminUsersPage = () => {
  const { users, fetchPendingUsers, approveUser, rejectUser, isLoading } =
    useAdminStore();
  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    const success = await approveUser(userId);

    if (success) {
      toast.success("User approved successfully");
    } else {
      toast.error("Failed to approve user");
    }
  };

  const handleReject = async (userId: string) => {
    const success = await rejectUser(userId);

    if (success) {
      toast.success("User rejected successfully");
    } else {
      toast.error("Failed to reject user");
    }
  };

const columns: TableColumn<PendingUser>[] = [
  {
    header: "Name",
    key: "full_name",
  },
  {
    header: "Email",
    key: "email",
  },
  {
    header: "Role",
    key: "role",
    render: (row) =>
      row.role.charAt(0).toUpperCase() +
      row.role.slice(1),
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
          trigger={
            <Button size="sm">
              Approve
            </Button>
          }
        />

        <UserActionDialog
          title="Reject User"
          description="Are you sure you want to reject this user?"
          onConfirm={() => handleReject(row.id)}
          trigger={
            <Button
              size="sm"
              variant="destructive"
            >
              Reject
            </Button>
          }
        />
      </div>
    ),
  },
];

  if (isLoading) {
    return (
      <div className="flex h-75 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
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
            <p className="text-3xl font-bold">{users.length}</p>
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
            data={users}
            emptyMessage="No pending users"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
