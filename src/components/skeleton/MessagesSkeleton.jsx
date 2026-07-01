import { Skeleton } from "@/components/ui/skeleton";

export default function MessagesSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-4">
          <Skeleton className="h-5 w-44 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}