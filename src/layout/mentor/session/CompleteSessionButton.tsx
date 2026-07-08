"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCompleteSessionStore } from "@/hooks/mentor/useCompleteSessionStore";


interface CompleteSessionButtonProps {
  sessionId: string;
  sessionTitle: string;
}

const CompleteSessionButton = ({
  sessionId,
  sessionTitle,
}: CompleteSessionButtonProps) => {
  const openDialog =
    useCompleteSessionStore(
      (state) => state.openDialog
    );

  return (
    <Button
      onClick={() =>
        openDialog(sessionId, sessionTitle)
      }
    >
      <CheckCircle2 className="mr-2 h-4 w-4" />

      Complete Session
    </Button>
  );
};

export default CompleteSessionButton;