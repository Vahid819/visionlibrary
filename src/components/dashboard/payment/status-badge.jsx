import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }) {
  const variant = {
    paid: "default",
    pending: "secondary",
    failed: "destructive",
  };

  return (
    <Badge variant={variant[status]} className="capitalize text-xs px-2 py-0.5">
      {status}
    </Badge>
  );
}
