import { Skeleton } from "@/components/ui/skeleton";

const StartupCardSkeleton = () => {
  return (
    <div className="rounded-2xl border p-5 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

      <div className="flex gap-2">
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      <div className="flex justify-between pt-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export default StartupCardSkeleton;