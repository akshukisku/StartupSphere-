"use client";

import { useMentorSession } from "@/hooks/mentor/useMentor";



import StartupCardSkeleton from "@/components/skeleton/StartupCardSkeleton";
import SessionInfoCard from "./SessionInfoCard";
import StartupInfoCard from "./StartupInfoCard";
import SessionActions from "./SessionActions";
import CompleteSessionDialog from "./CompleteSessionDialog";
import EditSessionDialog from "./EditSessionDialog";
import FinishMentorshipDialog from "./FinishMentorshipDialog";
import EvaluationDialog from "./EvaluationDialog";

interface MentorSessionDetailsProps {
  sessionId: string;
}

const MentorSessionDetails = ({
  sessionId,
}: MentorSessionDetailsProps) => {
  const {
    data: session,
    isPending,
    isError,
  } = useMentorSession(sessionId);
  console.log("MentorSessionDetails sessionId:", sessionId);

  if (isPending) {
    return <StartupCardSkeleton />;
  }

  if (isError || !session) {
    return (
      <div className="rounded-xl border border-destructive p-10 text-center">
        Failed to load session details.
      </div>
    );
  }

return (
  <>
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <SessionInfoCard session={session} />

        <StartupInfoCard session={session} />
      </div>

      <SessionActions session={session} />
    </div>

    <CompleteSessionDialog />
    <EditSessionDialog/>
    <FinishMentorshipDialog/>
    <EvaluationDialog/> 
  </>
);
};

export default MentorSessionDetails;