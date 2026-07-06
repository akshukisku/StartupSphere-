"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const DashboardCard = ({
  children,
  className,
  contentClassName,
}: DashboardCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-3xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <CardContent
        className={cn("p-8", contentClassName)}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;