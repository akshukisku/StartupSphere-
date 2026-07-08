"use client";

import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFinishMentorshipStore } from "@/store/useFinishMentorshipStore";

interface FinishMentorshipButtonProps {
  assignmentId: string;
  startupName: string;
}

const FinishMentorshipButton = ({
  assignmentId,
  startupName,
}: FinishMentorshipButtonProps) => {
  const openDialog = useFinishMentorshipStore(
    (state) => state.openDialog
  );
  const handleClick = () => {
  console.log("Finish button clicked");

  openDialog(assignmentId, startupName);
};

  return (
    <Button
      variant="destructive"
      onClick={() =>handleClick()
      }
    >
      <Flag className="mr-2 h-4 w-4" />

      Finish Mentorship
    </Button>
  );
};

export default FinishMentorshipButton;