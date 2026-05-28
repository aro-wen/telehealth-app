"use client";

import { useState } from "react";
import { recordsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";

interface RecordFormProps {
  appointmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function RecordForm({
  appointmentId,
  onSuccess,
  onCancel,
}: RecordFormProps) {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptions, setPrescriptions] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await recordsApi.create(appointmentId, diagnosis, prescriptions, notes);
      onSuccess();
    } catch (err) {
      alert("Failed to save record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Diagnosis
        </label>
        <Input
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="e.g., Acute bronchitis"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Prescriptions
        </label>
        <textarea
          value={prescriptions}
          onChange={(e) => setPrescriptions(e.target.value)}
          className="w-full px-4 py-2 border border-surface-200 rounded-lg"
          rows={2}
          placeholder="e.g., Azithromycin 500mg daily x 5 days"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Doctor's Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border border-surface-200 rounded-lg"
          rows={3}
          placeholder="Additional notes, follow-up instructions..."
        />
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save Record"}
        </Button>
      </div>
    </form>
  );
}
