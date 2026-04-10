import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  userSchema  from "@/zodSchema/userSchema";

export default function SecuritySettings({ form, onChange, disabled }) {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>New Password</Label>
          <Input type="password" name="password" placeholder="New Password" {...register("password")} value={form.password} onChange={onChange} disabled={disabled} />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" {...register("confirmPassword")} value={form.confirmPassword} onChange={onChange} disabled={disabled} />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}