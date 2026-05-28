"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { AppointmentList } from "@/components/appointments/AppointmentList";

export default function AppointmentsPage() {
  const { appointments, loading, refetch } = useAppointments();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        My Appointments
      </h2>
      {loading ? (
        <p className="text-center py-12 text-slate-400">
          Loading appointments...
        </p>
      ) : (
        <AppointmentList appointments={appointments} onRefresh={refetch} />
      )}
    </div>
  );
}
