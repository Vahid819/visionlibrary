import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SeatingPreview from "./SeatingPreview";

export default function SeatingSettings({ form, onChange, onNumber, disabled }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Seating Layout</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Input name="rows" type="number" value={form.rows} onChange={onNumber} disabled={disabled} />
          <Input name="cols" type="number" value={form.cols} onChange={onNumber} disabled={disabled} />
        </CardContent>
      </Card>

      <SeatingPreview rows={form.rows} cols={form.cols} />
    </div>
  );
}
