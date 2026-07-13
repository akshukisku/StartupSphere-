"use client";

import { Button } from "@/components/ui/button";

import { useMentorRequestStore } from "@/hooks/mentor/useMentorRequestStore";
import { MentorRequestRow } from "@/types/interface/mentor.interface";

interface MentorActionsProps {
  request: MentorRequestRow;
}

const MentorActions = ({
  request,
}: MentorActionsProps) => {
  const { openDetailsDialog } =
    useMentorRequestStore();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        openDetailsDialog(request)
      }
    >
      View Details
    </Button>
  );
};

export default MentorActions;