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
  const [seats, setSeats] = useState({});

  // ✅ default form (STATIC only)
  const defaultForm = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",

    upiId: "",
    enableUpi: false,
    qrImage: null,

    rows: 0,
    cols: 0,

    password: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [tempForm, setTempForm] = useState(defaultForm);

  // ======================
  // Fetch seating data
  // ======================
  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/setting/get", {
          cache: "no-store",
        });

        const result = await res.json();

        if (result?.data) {
          setSeats(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [session]);

  // ======================
  // Sync seats → form (IMPORTANT FIX)
  // ======================
  useEffect(() => {
    if (seats && Object.keys(seats).length > 0) {
      setForm((prev) => ({
        ...prev,
        rows: seats.row || 0,
        cols: seats.column || 0,
      }));

      setTempForm((prev) => ({
        ...prev,
        rows: seats.row || 0,
        cols: seats.column || 0,
      }));
    }
  }, [seats]);

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
    console.log("hello world")
    if(tempForm.rows <= 0 || tempForm.cols <= 0){
    try {
      console.log("data fet")
      const res = await fetch("/api/setting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempForm),
      });

      if (!res.ok) throw new Error("Failed to save");

      await res.json();

      setForm(tempForm);
      setIsEditing(false);

      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
    } else if(tempForm.password){
      try {
        const res = await fetch("/api/signup",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempForm),
        })
      } catch (error) {
        toast.error(error.message || "Failed to save settings");
      }
      await res.json();
      setForm(tempForm);
      setIsEditing(false);

      toast.success("Settings saved successfully!");
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