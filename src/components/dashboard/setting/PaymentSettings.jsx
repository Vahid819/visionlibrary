import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { paymentSchema } from "@/zodSchema/paymentSchema";

export default function PaymentSettings({ form, setForm, disabled }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span>Enable UPI</span>
          <Switch
            checked={form.enableUpi}
            onCheckedChange={(v) => setForm({ ...form, enableUpi: v })}
          />
        </div>

        {form.enableUpi && (
          <div>
          <Input
            placeholder="UPI ID"
            {...register("upiId")}
            value={form.upiId}
            disabled={disabled}
            onChange={(e) => setForm({ ...form, upiId: e.target.value })}
          />
          {errors.upiId && (
            <p className="text-sm text-red-500 mt-1">{errors.upiId.message}</p>
          )}
          </div>
          
        )}
      </CardContent>
      <CardContent>
        <div className="space-y-2">
          <Label>QR Code</Label>

          {/* Upload */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setForm((prev) => ({
                  ...prev,
                  qrImage: file,
                }));
              }
            }}
          />

          {/* Preview with remove button */}
          {form.qrImage && (
            <div className="relative mt-3 inline-block">
              <img
                src={URL.createObjectURL(form.qrImage)}
                alt="QR Preview"
                className="h-32 w-32 object-contain rounded-lg border"
              />

              {/* ❌ Remove Button */}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    qrImage: null,
                  }))
                }
                disabled={disabled}
                className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full p-1 shadow hover:bg-gray-400 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
