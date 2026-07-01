import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-8 w-48" />

      <div className="grid md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-5 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 mb-3" />
        ))}
      </div>
    </div>
  );
}