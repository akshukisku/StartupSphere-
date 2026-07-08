"use client";

import Link from "next/link";

import { ArrowRight, CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { InvestorStartup } from "@/types/interface/investor.interface";

interface MentorActionsProps {
  startup: InvestorStartup;

  onSchedule?: (startup: InvestorStartup) => void;
}

const MentorActions = ({
  startup,
  onSchedule,
}: MentorActionsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        asChild
        className="flex-1"
      >
        <Link href={`/mentor/startups/${startup.id}`}>
          View Startup
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      <Button
        variant="outline"
        className="flex-1"
        onClick={() => onSchedule?.(startup)}
      >
        <CalendarPlus className="mr-2 h-4 w-4" />
        Schedule
      </Button>
    </div>
  );
};

export default MentorActions;