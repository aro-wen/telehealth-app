"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { appointmentApi } from "@/lib/api";

interface BookingModalProps {
  doctorEmail: string;
  doctorName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({
  doctorEmail,
  doctorName,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [startAt, setStartAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!startAt) return;
    setLoading(true);
    try {
      await appointmentApi.book(doctorEmail, new Date(startAt).toISOString());
      onSuccess();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Book Consultation
        </h3>
        <p className="text-slate-500 mb-4">
          Selected:{" "}
          <span className="font-medium text-brand-600">{doctorName}</span>
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Date & Time
          </label>
          <Input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleBook} disabled={loading} className="flex-1">
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}
