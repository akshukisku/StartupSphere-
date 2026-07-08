"use client";

import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  FileText,
  Link2,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { MentorSession } from "@/types/interface/mentor.interface";

interface SessionInfoCardProps {
  session: MentorSession;
}

const SessionInfoCard = ({
  session,
}: SessionInfoCardProps) => {
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
    <DashboardCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Session Information
          </h2>

          <Badge className={statusClass}>
            {session.status}
          </Badge>
        </div>

        {/* Title */}
        <div>
          <p className="text-sm text-muted-foreground">
            Title
          </p>

          <p className="font-medium">
            {session.title}
          </p>
        </div>

        {/* Description */}
        <div className="flex gap-3">
          <FileText className="mt-1 h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p>
              {session.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Date & Time
            </p>

            <p>
              {new Date(
                session.session_date
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Duration
            </p>

            <p>
              {session.duration} Minutes
            </p>
          </div>
        </div>

        {/* Meeting Link */}
        {session.meeting_link && (
          <div className="flex gap-3">
            <Link2 className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Meeting Link
              </p>

              <Link
                href={session.meeting_link}
                target="_blank"
                className="break-all text-primary hover:underline"
              >
                {session.meeting_link}
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default SessionInfoCard;