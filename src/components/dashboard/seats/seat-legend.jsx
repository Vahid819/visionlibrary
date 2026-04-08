export function SeatLegend() {
  return (
    <div className="flex gap-4 text-xs justify-center">
      <Legend color="bg-background border" label="Available" />
      <Legend color="bg-primary" label="Selected" />
      <Legend color="bg-muted" label="Occupied" />
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-4 h-4 rounded ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}