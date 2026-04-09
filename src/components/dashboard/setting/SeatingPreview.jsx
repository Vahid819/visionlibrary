export default function SeatingPreview({ rows, cols }) {
  let counter = 1;

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <div key={counter} className="h-10 w-10 border rounded flex items-center justify-center">
            {counter++}
          </div>
        ))
      )}
    </div>
  );
}