"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Globe,
  User,
  CalendarDays,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { InvestorStartup } from "@/types/interface/investor.interface";

interface Props {
  startup: InvestorStartup;
}

const StartupCard = ({ startup }: Props) => {
  const website = startup.website
    ? startup.website.startsWith("http")
      ? startup.website
      : `https://${startup.website}`
    : null;

  const websiteLabel = website
    ?.replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const fundingBadgeClass = (() => {
    switch (
      startup.funding_stage?.toLowerCase()
    ) {
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
    <DashboardCard className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border bg-muted">
            {startup.logo_url ? (
              <Image
                src={startup.logo_url}
                alt={startup.startup_name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="h-7 w-7 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold">
              {startup.startup_name}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              {startup.industry ??
                "Unknown Industry"}
            </p>
          </div>
        </div>

        {/* Funding */}
        <Badge
          className={`rounded-full ${fundingBadgeClass}`}
        >
          {startup.funding_stage ??
            "Not Specified"}
        </Badge>

        {/* Tagline */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {startup.tagline ||
            "No tagline available."}
        </p>

        {/* Founder */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-primary" />

          <span>
            {startup.founder_name ??
              "Unknown Founder"}
          </span>
        </div>

        {/* Website */}
        {website && (
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-primary" />

            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-primary hover:underline"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {websiteLabel}
            </a>
          </div>
        )}

        {/* Joined */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-4 w-4" />

          <span>
            Joined{" "}
            {new Date(
              startup.created_at
            ).toLocaleDateString()}
          </span>
        </div>

        {/* Footer */}
        <Button
          asChild
          className="w-full"
        >
          <Link
            href={`/investor/startups/${startup.id}`}
          >
            View Details

            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </DashboardCard>
  );
};

export default StartupCard;