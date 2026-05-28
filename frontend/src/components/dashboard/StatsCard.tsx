import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/formatters";

interface StatsCardProps {
  title: string;
  value: string | number;
  gradient: string;
}

export function StatsCard({ title, value, gradient }: StatsCardProps) {
  return (
    <Card className={cn("text-white bg-gradient-to-br", gradient)}>
      <div className="p-6">
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </Card>
  );
}
