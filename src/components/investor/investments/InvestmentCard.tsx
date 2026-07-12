"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/common/DashboardCard";

import {
  IndianRupee,
  Percent,
  CalendarDays,
  Building2,
} from "lucide-react";

import { InvestorInvestmentRow } from "@/layout/investor/InvestmentColumns";
import { useInvestmentStore } from "@/store/useInvestmentStore";

interface InvestmentCardProps {
  investment: InvestorInvestmentRow;
}

const InvestmentCard = ({
  investment,
}: InvestmentCardProps) => {
  const { openInvestmentDetailsDialog } =
    useInvestmentStore();

  return (
    <DashboardCard className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        {/* Startup */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border bg-muted">
            {investment.startup.logo_url ? (
              <Image
                src={investment.startup.logo_url}
                alt={investment.startup.startup_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">
              {investment.startup.startup_name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {investment.startup.industry}
            </p>
          </div>
        </div>

        {/* Investment Info */}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <IndianRupee className="h-4 w-4" />
              Amount
            </p>

            <p className="mt-1 font-semibold">
              ₹{investment.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Percent className="h-4 w-4" />
              Equity
            </p>

            <p className="mt-1 font-semibold">
              {investment.equity_offer}%
            </p>
          </div>
        </div>

        {/* Status */}

        <div className="flex items-center justify-between">
          <Badge className="capitalize">
            {investment.status}
          </Badge>

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {new Date(
              investment.created_at
            ).toLocaleDateString()}
          </span>
        </div>

        {/* Action */}

        <Button
          className="w-full"
          onClick={() =>
            openInvestmentDetailsDialog(investment)
          }
        >
          View Details
        </Button>
      </div>
    </DashboardCard>
  );
};

export default InvestmentCard;