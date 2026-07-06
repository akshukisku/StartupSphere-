"use client";

import DashboardCard from "@/components/common/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Avatar Card */}
        <div className="lg:col-span-4">
          <DashboardCard>
            <div className="flex flex-col items-center gap-6">
              <Skeleton className="h-36 w-36 rounded-full" />

              <div className="space-y-2 text-center">
                <Skeleton className="mx-auto h-5 w-32" />
                <Skeleton className="mx-auto h-4 w-44" />
                <Skeleton className="mx-auto h-4 w-32" />
              </div>

              <div className="w-full space-y-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-8">
          <DashboardCard>
            <div className="space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-80" />
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>

              <div className="flex justify-end border-t pt-6">
                <Skeleton className="h-11 w-40 rounded-xl" />
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;