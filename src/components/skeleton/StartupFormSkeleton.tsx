import { Skeleton } from "@/components/ui/skeleton";

const StartupFormSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>

        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 xl:gap-10">
        {/* Left */}
        <div className="space-y-8 lg:col-span-8">
          <Skeleton className="h-[420px] w-full rounded-2xl" />

          <Skeleton className="h-[260px] w-full rounded-2xl" />
        </div>

        {/* Right */}
        <div className="space-y-8 lg:col-span-4">
          <Skeleton className="h-[220px] w-full rounded-2xl" />

          <Skeleton className="h-[260px] w-full rounded-2xl" />

          <Skeleton className="h-[180px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default StartupFormSkeleton;