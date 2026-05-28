"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { DoctorProfile } from "@/types/doctor";

interface DoctorCardProps {
  doctor: DoctorProfile;
  onBook: (email: string) => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center text-2xl">
          👨‍️
        </div>
        <div>
          <h3 className="font-bold text-slate-900">
            Dr. {doctor.fullName || doctor.user?.email.split("@")[0]}
          </h3>
          <p className="text-brand-600 text-sm font-medium">
            {doctor.specialization}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">
            ★
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="success">Available Today</Badge>
      </div>

      <Button
        onClick={() => onBook(doctor.user?.email || "")}
        className="w-full"
      >
        Book Consultation
      </Button>
    </Card>
  );
}
