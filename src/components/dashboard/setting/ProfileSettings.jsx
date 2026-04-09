import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import userSchema from "@/zodSchema/userSchema";

export default function ProfileSettings({ form, onChange, disabled }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            {...register("name")}
            value={form.name}
            onChange={onChange}
            disabled={disabled}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            {...register("email")}
            value={form.email}
            onChange={onChange}
            disabled={disabled}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            name="phone"
            {...register("phone")}
            value={form.phone}
            onChange={onChange}
            disabled={disabled}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
