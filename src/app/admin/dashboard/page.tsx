"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AdminDashboardPage = () => {
  const { stats, isLoading, fetchDashboardStats } = useAdminStore();

  useEffect(() => {
   fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-5xl font-bold">{stats?.pendingUsers ?? 0}</p>

            <p className="mt-2 text-sm text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stats?.approvedUsers ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejected Users</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stats?.rejectedUsers ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Founders</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stats?.founders ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investors</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stats?.investors ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentors</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stats?.mentors ?? 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
