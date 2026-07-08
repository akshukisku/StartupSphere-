"use client";

import { InvestorStartup } from "@/types/interface/investor.interface";
import MentorActions from "./MentorActions";
import InvestorActions from "./InvestorActions";

export type StartupCardVariant =
  | "investor"
  | "mentor";

interface StartupCardActionsProps {
  startup: InvestorStartup;

  variant?: StartupCardVariant;

  isSaved?: boolean;

  onSchedule?: (
    startup: InvestorStartup
  ) => void;
}

const StartupCardActions = ({
  startup,
  variant = "investor",
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