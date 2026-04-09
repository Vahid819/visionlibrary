import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import SeatingPreview from "./SeatingPreview";
import { div } from "framer-motion/client";

export default function SeatingSettings({
  form,
  onChange,
  onNumber,
  disabled,
}) {
  return (
    <div className="gap-3">
      <Card>
        <CardContent className="grid grid-cols-2 gap-4 pt-6">
          <div>
            <Label>Rows</Label>
            <Input
              type="number"
              name="rows"
              value={form.rows}
              onChange={onNumber}
              disabled={disabled}
            />
          </div>

          <div>
            <Label>Columns</Label>
            <Input
              type="number"
              name="cols"
              value={form.cols}
              onChange={onNumber}
              disabled={disabled}
            />
          </div>
        </CardContent>
      </Card>
      <SeatingPreview rows={form.rows} cols={form.cols} />
    </div>
  );
}
