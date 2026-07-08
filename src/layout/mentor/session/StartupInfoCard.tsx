"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Building2,
  Globe,
  BriefcaseBusiness,
  BadgeDollarSign,
} from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { MentorSession } from "@/types/interface/mentor.interface";

interface StartupInfoCardProps {
  session: MentorSession;
}

const StartupInfoCard = ({
  session,
}: StartupInfoCardProps) => {
  const startup = session.mentor_assignments?.startups;

  return (
    <DashboardCard>
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-lg font-semibold">
          Startup Information
        </h2>

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border bg-muted">
            {startup?.logo_url ? (
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

          <div>
            <h3 className="text-lg font-semibold">
              {startup?.startup_name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {startup?.industry}
            </p>
          </div>
        </div>

        {/* Funding */}
        <div className="flex items-center gap-3">
          <BadgeDollarSign className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Funding Stage
            </p>

            <Badge>
              {startup?.funding_stage}
            </Badge>
          </div>
        </div>

        {/* Tagline */}
        <div className="flex gap-3">
          <BriefcaseBusiness className="mt-1 h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">
              Tagline
            </p>

            <p>
              {startup?.tagline ||
                "No tagline available."}
            </p>
          </div>
        </div>

        {/* Website */}
        {startup?.website && (
          <div className="flex gap-3">
            <Globe className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Website
              </p>

              <Link
                href={startup.website}
                target="_blank"
                className="break-all text-primary hover:underline"
              >
                {startup.website}
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default StartupInfoCard;