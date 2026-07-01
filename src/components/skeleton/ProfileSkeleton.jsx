import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="max-w-3xl p-6">
      <div className="rounded-xl border p-6 flex gap-6 items-center">
        <Skeleton className="size-24 rounded-full" />

        <div className="space-y-3 flex-1">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}