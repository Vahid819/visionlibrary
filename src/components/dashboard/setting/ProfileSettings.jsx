import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettings({ form, onChange, disabled }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name"
  value={form.name || ""}
  onChange={onChange}
  disabled={!form.name}
  />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" value={form.email} onChange={onChange} disabled={disabled} />
        </div>
      </CardContent>
    </Card>
  );
}

