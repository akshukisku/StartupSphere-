"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useStartupDetails } from "@/hooks/investor/useInvestor";
import StartupHero from "./StartupHero";
import InvestmentDialog from "@/components/investment/InvestmentDialog";

interface StartupDetailsProps {
  startupId: string;
}

const StartupDetails = ({
  startupId,
}: StartupDetailsProps) => {
  const router = useRouter();

  const {
    data,
    isPending,
    isError,
  } = useStartupDetails(startupId);
  

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="rounded-xl border border-destructive p-10 text-center">
          Startup not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="w-fit"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {data.startup_name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {data.tagline}
        </p>
      </div>
      <StartupHero startup={data} />
      
    </div>
  );
};

export default StartupDetails;