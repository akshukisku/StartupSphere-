"use client";

import { CalendarDays, Globe, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { InvestorStartup } from "@/types/interface/investor.interface";

interface StartupCardBodyProps {
  startup: InvestorStartup;
}

const StartupCardBody = ({
  startup,
}: StartupCardBodyProps) => {
  const website = startup.website
    ? startup.website.startsWith("http")
      ? startup.website
      : `https://${startup.website}`
    : null;

  const websiteLabel = website
    ?.replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

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

  return (
    <>
      <Badge className={`rounded-full ${fundingBadgeClass}`}>
        {startup.funding_stage ?? "Not Specified"}
      </Badge>

      <p className="line-clamp-2 text-sm text-muted-foreground">
        {startup.tagline || "No tagline available."}
      </p>

      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4 text-primary" />
        <span>{startup.founder_name ?? "Unknown Founder"}</span>
      </div>

      {website && (
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-primary" />

          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-primary hover:underline"
          >
            {websiteLabel}
          </a>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarDays className="h-4 w-4" />

        <span>
          Joined {new Date(startup.created_at).toLocaleDateString()}
        </span>
      </div>
    </>
  );
};

export default StartupCardBody;