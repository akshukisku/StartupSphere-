"use client";

import Link from "next/link";

import { ExternalLink, Pencil } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Button } from "@/components/ui/button";

import CompleteSessionButton from "./CompleteSessionButton";
import EditSessionButton from "./EditSessionButton";
import { MentorSession } from "@/types/interface/mentor.interface";
import FinishMentorshipButton from "@/layout/mentor/session/FinishMentorshipButton";
import EvaluationButton from "./EvaluationButton";
import { useMentorEvaluation } from "@/hooks/mentor/useMentor";

interface SessionActionsProps {
  session: MentorSession;
}

const SessionActions = ({ session }: SessionActionsProps) => {
  const { data: evaluation } = useMentorEvaluation(session.id);

  const hasEvaluation = !!evaluation;
  return (
    <DashboardCard>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold">Session Actions</h3>

          <p className="text-sm text-muted-foreground">
            Manage your mentorship session.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {session.meeting_link && (
            <Button asChild>
              <Link href={session.meeting_link} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Join Meeting
              </Link>
            </Button>
          )}
          {session.status === "scheduled" && (
            <>
              <EditSessionButton session={session} />

              <CompleteSessionButton
                sessionId={session.id}
                sessionTitle={session.title}
              />
            </>
          )}
          {session.status === "completed" && (
            <>
              {!hasEvaluation ? (
                <EvaluationButton
                  sessionId={session.id}
                  assignmentId={session.mentor_assignments.id}
                  startupName={session.mentor_assignments.startups.startup_name}
                />
              ) : (
                <FinishMentorshipButton
                  assignmentId={session.mentor_assignments.id}
                  startupName={session.mentor_assignments.startups.startup_name}
                />
              )}
            </>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};

export default SessionActions;
