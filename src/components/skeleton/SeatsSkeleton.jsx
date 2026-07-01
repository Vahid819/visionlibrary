import { Skeleton } from "@/components/ui/skeleton";

export default function SeatsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-8 w-52" />

      <div className="rounded-xl border p-6">
        <Skeleton className="h-6 w-36 mb-6" />

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {Array.from({ length: 50 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}