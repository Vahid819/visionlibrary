import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecuritySettings({ form, onChange, disabled }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>New Password</Label>
          <Input type="password" name="password" placeholder="New Password" value={form.password} onChange={onChange} disabled={disabled} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" disabled={disabled} />
        </div>
      </CardContent>
    </Card>
  );
}