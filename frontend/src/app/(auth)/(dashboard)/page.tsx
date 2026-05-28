"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/hooks/useAppointments";
import { useDoctors } from "@/hooks/useDoctors";
import { useSocket } from "@/hooks/useSocket";

export default function HomePage() {
  const { user } = useAuth();
  const { appointments, loading } = useAppointments();
  const { doctors } = useDoctors();
  useSocket();

  if (!user) return <p className="text-center py-12">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Welcome back, {user.email.split("@")[0]} 👋
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
          <p className="text-blue-100 text-sm">Upcoming Appointments</p>
          <p className="text-3xl font-bold mt-2">
            {appointments.filter((a) => a.status === "BOOKED").length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white">
          <p className="text-emerald-100 text-sm">Medical Records</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl p-6 text-white">
          <p className="text-violet-100 text-sm">Available Doctors</p>
          <p className="text-3xl font-bold mt-2">{doctors.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Activity
        </h3>
        <p className="text-slate-400 text-center py-4">No recent activity</p>
      </div>
    </div>
  );
}
