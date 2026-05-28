"use client";

import { Card } from "@/components/ui/Card";
import { MedicalRecord } from "@/types/medical-record";
import { formatDate } from "@/utils/formatters";

export function MedicalRecordCard({ record }: { record: MedicalRecord }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-900">
            {record.diagnosis || "Consultation"}
          </p>
          <p className="text-sm text-slate-500">
            Dr.{" "}
            {record.appointment?.doctor?.doctorProfile?.fullName || "Doctor"} •{" "}
            {formatDate(record.createdAt)}
          </p>
        </div>
      </div>
      {record.prescriptions && (
        <div className="mb-2">
          <p className="text-sm font-medium text-slate-700">💊 Prescriptions</p>
          <p className="text-sm text-slate-600">{record.prescriptions}</p>
        </div>
      )}
      {record.doctorNotes && (
        <div>
          <p className="text-sm font-medium text-slate-700">📝 Notes</p>
          <p className="text-sm text-slate-600">{record.doctorNotes}</p>
        </div>
      )}
    </Card>
  );
}
