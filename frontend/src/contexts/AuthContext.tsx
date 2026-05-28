"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, User } from "@/lib/api";
import { useRouter } from "next/navigation";
import { initSocket, disconnectSocket } from "@/lib/socket";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    role: "PATIENT" | "DOCTOR",
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          credentials: "include",
        },
      );
      if (response.ok) {
        // We're authenticated, but we need to get user info
        // For now, we'll set a placeholder - improve this with a /me endpoint
        const userData = JSON.parse(localStorage.getItem("user") || "null");
        if (userData) {
          setUser(userData);
          initSocket(userData.id);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { user } = await authApi.login(email, password);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    initSocket(user.id);
    router.push("/");
  };

  const register = async (
    email: string,
    password: string,
    role: "PATIENT" | "DOCTOR",
  ) => {
    await authApi.register(email, password, role);
    router.push("/login");
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem("user");
    disconnectSocket();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
