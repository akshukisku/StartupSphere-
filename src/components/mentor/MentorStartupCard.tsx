"use client";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MentorStartupCardProps {
  startup: any;
}

const MentorStartupCard = ({
  startup,
}: MentorStartupCardProps) => {
  return (
    <DashboardCard className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            {startup.startup.startup_name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {startup.startup.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {startup.startup.industry}
          </Badge>

          <Badge variant="outline">
            {startup.startup.stage}
          </Badge>
        </div>

        <div>
          <p className="font-medium">
            {startup.founder.full_name}
          </p>

          <p className="text-sm text-muted-foreground">
            {startup.founder.email}
          </p>
        </div>

        <Button className="w-full">
          View Startup
        </Button>
      </div>
    </DashboardCard>
  );
};

export default MentorStartupCard;