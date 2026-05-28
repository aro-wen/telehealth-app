"use client";

import { useState, useEffect } from "react";
import { appointmentApi } from "@/lib/api";
import { Appointment } from "@/types/appointment";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentApi.list();
      setAppointments(data as Appointment[]);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadAppointments = async () => {
      try {
        setLoading(true);
        const data = await appointmentApi.list();
        if (isMounted) {
          setAppointments(data as Appointment[]);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch appointments",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  return { appointments, loading, error, refetch: fetchAppointments };
}
