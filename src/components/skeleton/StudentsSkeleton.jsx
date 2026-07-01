import { Skeleton } from "@/components/ui/skeleton";

export default function StudentsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="rounded-xl border p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 border-b last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}