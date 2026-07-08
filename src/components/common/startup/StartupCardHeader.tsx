"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";

import { InvestorStartup } from "@/types/interface/investor.interface";

interface StartupCardHeaderProps {
  startup: InvestorStartup;
  children?: React.ReactNode;
}

const StartupCardHeader = ({
  startup,
  children,
}: StartupCardHeaderProps) => {
  return (
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
          {startup.industry ?? "Unknown Industry"}
        </p>
      </div>

      {children}
    </div>
  );
};

export default StartupCardHeader;