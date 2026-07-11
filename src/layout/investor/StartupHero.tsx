"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Globe, Building2 } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { InvestorStartup } from "@/types/interface/investor.interface";
import InvestmentDialog from "@/components/investment/InvestmentDialog";
import { Button } from "@/components/ui/button";
import { useInvestmentStore } from "@/store/useInvestmentStore";

interface StartupHeroProps {
  startup: InvestorStartup;
}

const StartupHero = ({ startup }: StartupHeroProps) => {
  const website = startup.website
    ? startup.website.startsWith("http")
      ? startup.website
      : `https://${startup.website}`
    : null;

  const { openInvestmentDialog } = useInvestmentStore();
  return (
    <DashboardCard>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        {/* Logo */}
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border bg-muted">
          {startup.logo_url ? (
            <Image
              src={startup.logo_url}
              alt={startup.startup_name}
              fill
              className="object-cover"
            />
          ) : (
            <Building2 className="h-10 w-10 text-muted-foreground" />
          )}
        </div>

        {/* Details */}
        {/* Details */}
        <div className="flex-1">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {startup.startup_name}
                </h1>

                <p className="mt-2 text-lg text-muted-foreground">
                  {startup.tagline || "No tagline available."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">{startup.industry}</Badge>

                <Badge>{startup.funding_stage}</Badge>
              </div>

              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />

                  {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
            </div>

            {/* Right */}
            <Button size="lg" onClick={openInvestmentDialog}>
              Invest Now
            </Button>

            <InvestmentDialog startup={startup} />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default StartupHero;
