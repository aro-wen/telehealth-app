"use client";

import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Describe your symptoms or health concern..."
            className="w-full pl-12 pr-4 py-3 bg-brand-50 border border-brand-100 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
          />
          <svg
            className="w-5 h-5 text-slate-400 absolute left-4 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <div className="text-sm text-slate-500">UTC+8</div>
        <button className="relative p-2 text-slate-400 hover:text-slate-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="hidden absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full pulse-ring"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-semibold">
            {user?.email[0].toUpperCase()}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-900">
              {user?.email.split("@")[0]}
            </p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
