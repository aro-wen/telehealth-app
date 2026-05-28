"use client";

import { AppointmentCard } from "./AppointmentCard";
import { Appointment } from "@/types/appointment";

interface AppointmentListProps {
  appointments: Appointment[];
  onRefresh: () => void;
}

export function AppointmentList({
  appointments,
  onRefresh,
}: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <p className="text-slate-400 text-center py-12">
        No appointments yet. Book a consultation to get started.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
          onCancel={onRefresh}
        />
      ))}
    </div>
  );
}
