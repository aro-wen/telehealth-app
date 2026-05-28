"use client";

import { useState, useEffect } from "react";
import { profileApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    contactDetails: "",
    basicMedicalHistory: "",
  });

  useEffect(() => {
    if (user?.role === "PATIENT") {
      profileApi
        .get()
        .then((data: any) =>
          setForm({
            fullName: data.fullName || "",
            dateOfBirth: data.dateOfBirth
              ? new Date(data.dateOfBirth).toISOString().slice(0, 10)
              : "",
            weight: data.weight?.toString() || "",
            height: data.height?.toString() || "",
            contactDetails: data.contactDetails || "",
            basicMedicalHistory: data.basicMedicalHistory || "",
          }),
        )
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileApi.update({
        ...form,
        weight: form.weight ? parseFloat(form.weight) : undefined,
        height: form.height ? parseFloat(form.height) : undefined,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (user?.role !== "PATIENT") {
    return (
      <p className="text-center py-12 text-slate-400">Patient profiles only</p>
    );
  }

  if (loading)
    return (
      <p className="text-center py-12 text-slate-400">Loading profile...</p>
    );

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Profile Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date of Birth
            </label>
            <Input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Weight (kg)
            </label>
            <Input
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Height (cm)
            </label>
            <Input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Contact Details
          </label>
          <Input
            value={form.contactDetails}
            onChange={(e) =>
              setForm({ ...form, contactDetails: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Medical History
          </label>
          <textarea
            value={form.basicMedicalHistory}
            onChange={(e) =>
              setForm({ ...form, basicMedicalHistory: e.target.value })
            }
            className="w-full px-4 py-2 border border-surface-200 rounded-lg"
            rows={3}
          />
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
