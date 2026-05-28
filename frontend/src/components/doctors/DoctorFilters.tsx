"use client";

interface DoctorFiltersProps {
  specialization: string;
  onSpecChange: (val: string) => void;
}

export function DoctorFilters({
  specialization,
  onSpecChange,
}: DoctorFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <select
        value={specialization}
        onChange={(e) => onSpecChange(e.target.value)}
        className="px-4 py-2 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500"
      >
        <option value="">All Specializations</option>
        <option value="Cardiology">Cardiology</option>
        <option value="General Practice">General Practice</option>
        <option value="Neurology">Neurology</option>
        <option value="Dermatology">Dermatology</option>
        <option value="Orthopedics">Orthopedics</option>
        <option value="Psychiatry">Psychiatry</option>
      </select>
    </div>
  );
}
