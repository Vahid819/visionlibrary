"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ProfileSettings from "@/components/dashboard/setting/ProfileSettings";
import PaymentSettings from "@/components/dashboard/setting/PaymentSettings";
import SeatingSettings from "@/components/dashboard/setting/SeatingSettings";
import SecuritySettings from "@/components/dashboard/setting/SecuritySettings";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Saved data
  const [form, setForm] = useState({
    name: "Vahid",
    email: "vahid@email.com",
    phone: "9876543210",

    upiId: "vahid@upi",
    bankName: "HDFC Bank",
    accountNumber: "1234567890",
    ifsc: "HDFC0001234",

    enableUpi: true,
    enableBank: true,

    layoutName: "Main Hall",
    rows: 5,
    cols: 8,
  });

  // ✅ Editable copy
  const [tempForm, setTempForm] = useState(form);

  // ======================
  // Handlers
  // ======================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    setTempForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // ======================
  // Edit Flow
  // ======================

  const handleEdit = () => {
    setTempForm(form); // copy latest data
    setIsEditing(true);
  };
  

  const handleCancel = () => {
    setTempForm(form); // reset changes
    setIsEditing(false);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // simulate API
      await new Promise((r) => setTimeout(r, 1000));

      setForm(tempForm); // save changes
      setIsEditing(false);

      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // UI
  // ======================

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-4 bg-muted p-1 rounded-xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="seating">Seating</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings
            form={tempForm}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentSettings
            form={tempForm}
            setForm={setTempForm}
            disabled={!isEditing}
          />
        </TabsContent>

        <TabsContent value="seating">
          <SeatingSettings
            form={tempForm}
            onChange={handleChange}
            onNumber={handleNumber}
            disabled={!isEditing}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings disabled={!isEditing} />
        </TabsContent>
      </Tabs>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {!isEditing ? (
          <Button onClick={handleEdit}>
            Edit Settings
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </>
        )}
      </div>
    </div>
  )};
