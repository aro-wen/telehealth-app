"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { DoctorFilters } from "@/components/doctors/DoctorFilters";
import { AISymptomSearch } from "@/components/doctors/AISymptomSearch";
import { BookingModal } from "@/components/appointments/BookingModal";

export default function DoctorsPage() {
  const [specialization, setSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const { doctors, loading } = useDoctors(specialization);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Find Doctors</h2>
      <AISymptomSearch onSpecializationSelect={setSpecialization} />
      <div className="flex items-center justify-between mb-6">
        <DoctorFilters
          specialization={specialization}
          onSpecChange={setSpecialization}
        />
      </div>

      {loading ? (
        <p className="text-center py-12 text-slate-400">Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onBook={(email) =>
                setSelectedDoctor({
                  email,
                  name: doc.fullName || doc.user?.email || "Doctor",
                })
              }
            />
          ))}
        </div>
      )}

      {selectedDoctor && (
        <BookingModal
          doctorEmail={selectedDoctor.email}
          doctorName={selectedDoctor.name}
          onClose={() => setSelectedDoctor(null)}
          onSuccess={() => alert("Booking successful!")}
        />
      )}
    </div>
  );
}
