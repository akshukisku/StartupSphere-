"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { HeartIcon } from "@animateicons/react/huge";

import { Button } from "@/components/ui/button";

import { InvestorStartup } from "@/types/interface/investor.interface";

import {
  useSaveStartup,
  useUnsaveStartup,
} from "@/hooks/investor/useSavedStartup";

interface InvestorActionsProps {
  startup: InvestorStartup;

  isSaved?: boolean;
}

const InvestorActions = ({
  startup,
  isSaved = false,
}: InvestorActionsProps) => {
  const saveMutation = useSaveStartup();
  const unsaveMutation = useUnsaveStartup();

  const isMutating =
    saveMutation.isPending ||
    unsaveMutation.isPending;

  const handleSaveToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      unsaveMutation.mutate(startup.id);
    } else {
      saveMutation.mutate(startup.id);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        aria-label={
          isSaved
            ? "Remove from saved startups"
            : "Save startup"
        }
        disabled={isMutating}
        onClick={handleSaveToggle}
      >
        <HeartIcon
          className={`h-5 w-5 transition-all duration-300 ${
            isSaved
              ? "scale-110 fill-red-500 text-red-500"
              : "text-muted-foreground hover:scale-110"
          }`}
        />
      </Button>

      <Button asChild>
        <Link href={`/investor/startups/${startup.id}`}>
          View Details

          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default InvestorActions;