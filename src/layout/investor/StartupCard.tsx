"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Building2, Globe, User, CalendarDays } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { InvestorStartup } from "@/types/interface/investor.interface";
import {
  useSaveStartup,
  useUnsaveStartup,
} from "@/hooks/investor/useSavedStartup";
import { HeartIcon } from "@animateicons/react/huge";
import { StartupCardVariant } from "@/types/type/startup";
import StartupCardBody from "@/components/common/startup/StartupCardBody";
import StartupCardActions from "@/components/common/startup/StartupCardActions";
import StartupCardHeader from "@/components/common/startup/StartupCardHeader";

interface StartupCardProps {
  startup: InvestorStartup;

  variant?: "investor" | "mentor";

  isSaved?: boolean;

  onSchedule?: (startup: InvestorStartup) => void;
}

const StartupCard = ({
  startup,
  variant = "investor",
  isSaved = false,
  onSchedule,
}: StartupCardProps) => {
  const saveMutation = useSaveStartup();
  const unsaveMutation = useUnsaveStartup();

  const website = startup.website
    ? startup.website.startsWith("http")
      ? startup.website
      : `https://${startup.website}`
    : null;

  const websiteLabel = website?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const fundingBadgeClass = (() => {
    switch (startup.funding_stage?.toLowerCase()) {
      case "pre seed":
      case "pre-seed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "seed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "series a":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";

      case "series b":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";

      default:
        return "";
    }
  })();

  const isMutating = saveMutation.isPending || unsaveMutation.isPending;

  const handleSaveToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      unsaveMutation.mutate(startup.id);
    } else {
      saveMutation.mutate(startup.id);
    }
  };

  return (
    <DashboardCard className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        <StartupCardHeader startup={startup} />

        <StartupCardBody startup={startup} />

        <StartupCardActions
          startup={startup}
          variant={variant}
          isSaved={isSaved}
          onSchedule={onSchedule}
        />
      </div>
    </DashboardCard>
  );
};

export default StartupCard;
