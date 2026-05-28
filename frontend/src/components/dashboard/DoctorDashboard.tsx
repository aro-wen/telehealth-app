"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doctorApi, appointmentApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { StatsCard } from "./StatsCard";
import { RecordForm } from "@/components/records/RecordForm";

export function DoctorDashboard() {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState<string | null>(null);
  const [showRecordForm, setShowRecordForm] = useState(false);

  const fetchData = async () => {
    try {
      const [scheduleData, apptData] = await Promise.all([
        doctorApi.getSchedule(),
        appointmentApi.list(),
      ]);
      setSchedule(scheduleData as any[]);
      setAppointments(apptData as any[]);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center py-12">Loading dashboard...</div>;

  const todayAppts = appointments.filter(
    (a) => new Date(a.startAt).toDateString() === new Date().toDateString(),
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Doctor Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Today's Appointments"
          value={todayAppts.length}
          gradient="from-brand-500 to-brand-700"
        />
        <StatsCard
          title="Total Patients"
          value={new Set(appointments.map((a) => a.patientId)).size}
          gradient="from-emerald-500 to-emerald-700"
        />
        <StatsCard
          title="Available Slots"
          value={schedule.filter((s) => s.isAvailable).length}
          gradient="from-violet-500 to-violet-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            📅 Today's Appointments
          </h3>
          <div className="space-y-3">
            {todayAppts.length === 0 ? (
              <p className="text-slate-400 text-center py-4">
                No appointments today
              </p>
            ) : (
              todayAppts.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center justify-between p-3 bg-surface-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {appt.patient?.email || "Patient"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(appt.startAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {appt.status === "BOOKED" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedAppt(appt.id);
                          setShowRecordForm(true);
                        }}
                      >
                        Add Record
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            📋 Quick Schedule
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const start = formData.get("start") as string;
              const end = formData.get("end") as string;
              try {
                await doctorApi.createSchedule(start, end);
                fetchData();
                e.currentTarget.reset();
              } catch (err) {
                alert("Failed to create slot");
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start
              </label>
              <Input name="start" type="datetime-local" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End
              </label>
              <Input name="end" type="datetime-local" required />
            </div>
            <Button type="submit" className="w-full">
              Create Available Slot
            </Button>
          </form>
        </div>
      </div>

      {showRecordForm && selectedAppt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Medical Record</h3>
            <RecordForm
              appointmentId={selectedAppt}
              onSuccess={() => {
                setShowRecordForm(false);
                fetchData();
              }}
              onCancel={() => setShowRecordForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
