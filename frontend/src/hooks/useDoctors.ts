"use client";

import { useState, useEffect } from "react";
import { doctorApi } from "@/lib/api";
import { DoctorProfile } from "@/types/doctor";

export function useDoctors(specialization?: string) {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await doctorApi.list(specialization);
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch doctors",
        );
      } finally {
        setLoading(false);
      }
    };

    void (async () => {
      await fetchDoctors();
    })();
  }, [specialization]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorApi.list(specialization);
      setDoctors(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  return { doctors, loading, error, refetch: fetchDoctors };
}
