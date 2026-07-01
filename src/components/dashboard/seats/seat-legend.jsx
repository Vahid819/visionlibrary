export function SeatLegend() {
  return (
    <div className="flex gap-4 text-xs justify-center">
      <Legend color="bg-green-500 border" label="Available" />
      <Legend color="bg-red-500 border" label="Selected" />
      <Legend color="bg-gray-500 border" label="Booked" />
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