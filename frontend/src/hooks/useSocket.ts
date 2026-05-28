"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAuth } from "@/contexts/AuthContext";

export function useSocket() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    if (!socket) return;

    const handleBooking = (data: any) => {
      console.log("🔔 New booking:", data);
      window.dispatchEvent(
        new CustomEvent("appointment:booked", { detail: data }),
      );
    };

    const handleCancel = (data: any) => {
      console.log("❌ Appointment cancelled:", data);
      window.dispatchEvent(
        new CustomEvent("appointment:cancelled", { detail: data }),
      );
    };

    socket.on("appointment:booked", handleBooking);
    socket.on("appointment:cancelled", handleCancel);

    return () => {
      socket.off("appointment:booked", handleBooking);
      socket.off("appointment:cancelled", handleCancel);
    };
  }, [user]);
}
