"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { InvestorStartup } from "@/types/interface/investor.interface";


interface InvestmentDialogProps {
  startup: InvestorStartup;
}

const InvestmentSummary = ({
  startup,
}: InvestmentDialogProps) => {
  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center gap-4">
        <Image
          src={
            startup.logo_url ||
            "/images/startup-placeholder.png"
          }
          alt={startup.startup_name}
          width={64}
          height={64}
          className="rounded-xl object-cover"
        />

        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            {startup.startup_name}
          </h2>

          <div className="flex gap-2">
            <Badge variant="secondary">
              {startup.industry}
            </Badge>

            <Badge>
              {startup.funding_stage}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;