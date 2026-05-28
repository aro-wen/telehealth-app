"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const patientNav = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/doctors", label: "Find Doctors", icon: "🔍" },
  { href: "/appointments", label: "My Appointments", icon: "📅" },
  { href: "/records", label: "Medical Records", icon: "📋" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

const doctorNav = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/appointments", label: "Appointments", icon: "📅" },
  { href: "/records", label: "Medical Records", icon: "📋" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = user?.role === "DOCTOR" ? doctorNav : patientNav;

  return (
    <aside className="w-64 bg-surface-800 text-white flex flex-col">
      <div className="p-6 border-b border-surface-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-xl">🏥</span>
          </div>
          <h1 className="text-xl font-bold">TeleHealth</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-brand-500/20 text-brand-100"
                : "hover:bg-surface-700 text-slate-300"
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
