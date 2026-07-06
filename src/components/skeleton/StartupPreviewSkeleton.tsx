"use client";

import { Skeleton } from "@/components/ui/skeleton";

const StartupPreviewSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      {/* Back Button */}
      <Skeleton className="h-10 w-28 rounded-xl" />

      {/* Hero */}
      <div className="rounded-3xl border p-10">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="h-32 w-32 rounded-3xl" />

          <Skeleton className="h-10 w-80" />

          <Skeleton className="h-5 w-[500px]" />

          <div className="flex gap-3">
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-3xl border p-8 space-y-5">
        <Skeleton className="h-8 w-56" />

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Showcase */}
      <div className="rounded-3xl border p-8">
        <Skeleton className="mb-6 h-8 w-60" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-video rounded-2xl"
            />
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="rounded-3xl border p-8">
        <Skeleton className="mb-6 h-8 w-48" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-3xl border p-6"
            >
              <div className="flex justify-center">
                <Skeleton className="h-24 w-24 rounded-full" />
              </div>

              <Skeleton className="mx-auto h-6 w-40" />

              <Skeleton className="mx-auto h-4 w-28" />

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="rounded-3xl border p-8">
        <Skeleton className="mb-6 h-8 w-48" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-16 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupPreviewSkeleton;