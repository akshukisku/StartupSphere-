import { Skeleton } from "@/components/ui/skeleton";

const PitchDeckSkeleton = () => {
  return (
    <div className="rounded-2xl border p-6 space-y-6">
      <Skeleton className="h-6 w-48" />

      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-xl" />

        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-60" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};

export default PitchDeckSkeleton;