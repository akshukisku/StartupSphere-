import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
}

const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
}: DashboardStatCardProps) => {
  return (
    <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex min-h-[180px] flex-col justify-between p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            {value}
          </h2>

          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;