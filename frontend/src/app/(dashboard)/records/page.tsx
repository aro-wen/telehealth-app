"use client";

import { useState, useEffect } from "react";
import { recordsApi } from "@/lib/api";
import { MedicalRecordCard } from "@/components/records/MedicalRecordCard";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recordsApi
      .getPatientRecords()
      .then((data: any) => setRecords(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Medical Records
      </h2>
      {loading ? (
        <p className="text-center py-12 text-slate-400">Loading records...</p>
      ) : records.length === 0 ? (
        <p className="text-center py-12 text-slate-400">
          No medical records yet. Visit a doctor to get your first record.
        </p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
