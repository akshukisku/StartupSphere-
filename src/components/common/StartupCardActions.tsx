"use client";

import { InvestorStartup } from "@/types/interface/investor.interface";
import MentorActions from "./startup/MentorActions";
import InvestorActions from "./startup/InvestorActions";

interface StartupCardActionsProps {
  startup: InvestorStartup;
  variant: "investor" | "mentor";
  isSaved?: boolean;
  onSchedule?: (startup: InvestorStartup) => void;
}

const StartupCardActions = ({
  startup,
  variant,
  isSaved = false,
  onSchedule,
}: StartupCardActionsProps) => {
  switch (variant) {
    case "mentor":
      return (
        <MentorActions
          startup={startup}
          onSchedule={onSchedule}
        />
      );

    case "investor":
    default:
      return (
        <InvestorActions
          startup={startup}
          isSaved={isSaved}
        />
      );
  }
};

export default StartupCardActions;