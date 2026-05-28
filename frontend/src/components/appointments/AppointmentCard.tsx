"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/formatters";
import { Appointment } from "@/types/appointment";
import { appointmentApi } from "@/lib/api";
import { JitsiMeeting } from "@/components/video/JitsiMeeting";
import { useState } from "react";

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
}

export function AppointmentCard({
  appointment,
  onCancel,
}: AppointmentCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await appointmentApi.cancel(appointment.id);
      onCancel();
    } catch (err) {
      alert("Failed to cancel appointment");
    }
  };

  return (
    <>
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 font-bold">
              📅
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Dr. {appointment.doctor?.doctorProfile?.fullName || "Doctor"}
              </p>
              <p className="text-sm text-slate-500">
                {formatDateTime(appointment.startAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={appointment.status === "BOOKED" ? "success" : "default"}
            >
              {appointment.status}
            </Badge>
            {appointment.status === "BOOKED" && (
              <>
                <Button size="sm" onClick={() => setShowVideo(true)}>
                  Join Video
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Video Consultation</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 hover:bg-surface-100 rounded-lg"
              ></button>
            </div>
            <JitsiMeeting
              roomName={appointment.meetingLink.replace(
                "https://meet.jit.si/",
                "",
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}
