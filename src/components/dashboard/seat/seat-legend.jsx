export function SeatLegend() {
  return (
    <div className="flex items-center gap-4 text-xs">
      <LegendItem color="bg-background border" label="Available" />
      <LegendItem color="bg-primary" label="Selected" />
      <LegendItem color="bg-muted" label="Occupied" />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-4 h-4 rounded ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}