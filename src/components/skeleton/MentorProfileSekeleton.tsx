import { Skeleton } from "@/components/ui/skeleton";

const MentorProfileSkeleton = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-64" />

      <Skeleton className="h-72 w-full rounded-xl" />

      <Skeleton className="h-60 w-full rounded-xl" />

      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
};

export default MentorProfileSkeleton;