"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ProfileSettings from "@/components/dashboard/setting/ProfileSettings";
import PaymentSettings from "@/components/dashboard/setting/PaymentSettings";
import SeatingSettings from "@/components/dashboard/setting/SeatingSettings";
import SecuritySettings from "@/components/dashboard/setting/SecuritySettings";

export default function Settingsclient({ session }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

    // ====================== 
  // Fetch settings on mount
  // ======================

  useEffect(async ()=>{
      try {
        const res = await fetch("/api/setting/get");
        const data = await res.json();
        console.log("Fetched settings:", data);
        setData(data);
      } catch (error) {
        console.error("❌ Failed to fetch settings:", error);
      }
  }, []);

  // ✅ FIXED default values
  const defaultForm = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",

    upiId: "",
    enableUpi: false,
    qrImage: null,

    rows: data.rows || 5,
    cols: data.cols || 5,

    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [tempForm, setTempForm] = useState(defaultForm);

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
    setTempForm(form);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempForm(form);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/setting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempForm),
      });

      if (!res.ok) throw new Error("Failed to save");

      const result = await res.json();

      // ✅ update saved data
      setForm(tempForm);
      setIsEditing(false);

      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save settings");
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
          <SecuritySettings
            form={tempForm}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        {!isEditing ? (
          <Button onClick={handleEdit}>Edit Settings</Button>
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
  );
}