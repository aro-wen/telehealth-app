"use client";

import { Card } from "@/components/ui/Card";
import { formatDateTime } from "@/utils/formatters";
import { Appointment } from "@/types/appointment";

interface RecentActivityProps {
  appointments: Appointment[];
  loading: boolean;
}

export function RecentActivity({ appointments, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <Card className="p-6 text-center text-slate-400">
        Loading activity...
      </Card>
    );
  }

  const recent = appointments.slice(0, 5);

  return (
    <Card>
      <div className="p-6 border-b border-surface-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h3>
      </div>
      <div className="p-6">
        {recent.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {recent.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center justify-between p-3 bg-surface-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                    📅
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Appointment {appt.status.toLowerCase()}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDateTime(appt.startAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appt.status === "BOOKED"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
