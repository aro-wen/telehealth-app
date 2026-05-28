"use client";

import { useState } from "react";
import { doctorApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface AISymptomSearchProps {
  onSpecializationSelect: (spec: string) => void;
}

export function AISymptomSearch({
  onSpecializationSelect,
}: AISymptomSearchProps) {
  const [symptoms, setSymptoms] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const res = await doctorApi.aiRecommend(symptoms);
      setSuggestions(res.recommendedSpecializations);
    } catch (err) {
      console.error("AI recommendation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms (e.g., headache, fever)..."
          className="flex-1 px-4 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-brand-500"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Analyzing..." : "Find Specialists"}
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((spec) => (
            <button
              key={spec}
              onClick={() => onSpecializationSelect(spec)}
              className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-medium hover:bg-brand-200"
            >
              {spec}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
