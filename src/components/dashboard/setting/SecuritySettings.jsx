import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SecuritySettings({ disabled }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <Input type="password" placeholder="New Password" disabled={disabled} />
        <Input type="password" placeholder="Confirm Password" disabled={disabled} />
      </CardContent>
    </Card>
  );
}