"use client";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  ArrowRight,
  Building2,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MentorSession } from "@/types/interface/mentor.interface";

interface MentorSessionCardProps {
  session: MentorSession;
}

const MentorSessionCard = ({
  session,
}: MentorSessionCardProps) => {
  const startup = session.mentor_assignments?.startups;

  const statusClass = (() => {
    switch (session.status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

      default:
        return "";
    }
  })();

  return (
    <DashboardCard className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border bg-muted">
            {startup?.logo_url ? (
              <Image
                src={startup.logo_url}
                alt={startup.startup_name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">
              {session.title}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              {startup?.startup_name}
            </p>
          </div>

          <Badge className={statusClass}>
            {session.status}
          </Badge>
        </div>

        {/* Schedule */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />

            <span>
              {new Date(
                session.session_date
              ).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />

            <span>
              {session.duration} Minutes
            </span>
          </div>
        </div>

        {/* Footer */}
        <Button
          asChild
          className="w-full"
        >
          <Link
            href={`/mentor/sessions/${session.id}`}
          >
            View Details

            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </DashboardCard>
  );
};

export default MentorSessionCard;