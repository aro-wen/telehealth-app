const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  id: string;
  email: string;
  role: "PATIENT" | "DOCTOR";
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function api<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { requiresAuth = true, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      requiresAuth: false,
    }),

  register: (email: string, password: string, role: "PATIENT" | "DOCTOR") =>
    api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
      requiresAuth: false,
    }),

  logout: () => api("/auth/logout", { method: "POST" }),
};

export const doctorApi = {
  list: (specialization?: string) =>
    api<any[]>(
      `/doctors${specialization ? `?specialization=${specialization}` : ""}`,
    ),

  aiRecommend: (symptoms: string) =>
    api<{ recommendedSpecializations: string[] }>("/doctors/ai-recommend", {
      method: "POST",
      body: JSON.stringify({ symptoms }),
    }),

  createSchedule: (startAt: string, endAt: string) =>
    api("/doctor/schedule", {
      method: "POST",
      body: JSON.stringify({ startAt, endAt, isBlocked: false }),
    }),

  getSchedule: () => api("/doctor/schedule"),
};

export const appointmentApi = {
  book: (doctorEmail: string, startAt: string) =>
    api("/appointments", {
      method: "POST",
      body: JSON.stringify({ doctorEmail, startAt }),
    }),

  list: () => api("/appointments"),

  cancel: (id: string) => api(`/appointments/cancel/${id}`, { method: "PUT" }),
};

export const recordsApi = {
  getPatientRecords: () => api("/medical-records/patient"),

  create: (
    appointmentId: string,
    diagnosis: string,
    prescriptions: string,
    doctorNotes: string,
  ) =>
    api("/medical-records", {
      method: "POST",
      body: JSON.stringify({
        appointmentId,
        diagnosis,
        prescriptions,
        doctorNotes,
      }),
    }),
};

export const profileApi = {
  get: () => api("/patient/profile"),

  update: (data: any) =>
    api("/patient/profile", { method: "PUT", body: JSON.stringify(data) }),
};

export { api };
