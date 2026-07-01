import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
  return (
    <div className="max-w-2xl space-y-6 p-6">
      <Skeleton className="h-8 w-48" />

      <div className="rounded-xl border p-6 space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}

        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  );
}