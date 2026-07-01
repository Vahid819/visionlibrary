import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({
  rows = 8,
  columns = 5,
}) {
  return (
    <div className="rounded-xl border p-4">
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid gap-4 py-4 border-b last:border-b-0"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, col) => (
            <Skeleton key={col} className="h-6" />
          ))}
        </div>
      ))}
    </div>
  );
}