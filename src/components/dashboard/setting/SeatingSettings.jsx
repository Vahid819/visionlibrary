import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import SeatingPreview from "./SeatingPreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SeatSchema } from "@/zodSchema/seatSchema";

export default function SeatingSettings({
  form,
  onChange,
  onNumber,
  disabled,
}) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SeatSchema),
  });
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="grid grid-cols-2 gap-4 pt-6">
          <div className="flex flex-col gap-2">
            <Label>Rows</Label>
            <Input
              type="number"
              name="rows"
              {...register("rows")}
              value={form.rows}
              onChange={onNumber}
              disabled={disabled}
            />
            <p className="text-sm text-red-500 mt-1">
              {errors.rows && errors.rows.message}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Columns</Label>
            <Input
              type="number"
              name="cols"
              {...register("cols")}
              value={form.cols}
              onChange={onNumber}
              disabled={disabled}
            />
            <p className="text-sm text-red-500 mt-1">
              {errors.cols && errors.cols.message}
            </p>
          </div>
        </CardContent>
      </Card>
      <SeatingPreview rows={form.rows} cols={form.cols} />
    </div>
  );
}
