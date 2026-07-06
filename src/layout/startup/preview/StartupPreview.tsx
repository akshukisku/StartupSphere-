"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useStartupStore } from "@/store/useStartupStore";

import PreviewHero from "./PreviewHero";
import PreviewAbout from "./PreviewAbout";
import PreviewShowcase from "./PreviewShowcase";
import PreviewTeam from "./PreviewTeam";
import PreviewSocial from "./PreviewSocial";
import StartupPreviewSkeleton from "@/components/skeleton/StartupPreviewSkeleton";
import { useStartup } from "@/hooks/startup/useStartup";
import PreviewPitchDeck from "./PreviewPitchDeck";
import { usePitchDeck } from "@/hooks/pitchDecks/usePitchDeck";

const StartupPreview = () => {
  const router = useRouter();

const { data: startup, isPending } = useStartup();
const { data: pitchDeck } = usePitchDeck();

if (isPending) {
  return <StartupPreviewSkeleton />;
}


  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      {/* Back Button */}
      <Button
        variant="outline"
        className="rounded-xl"
        onClick={() => router.push("/founder/startups")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <PreviewHero startup={startup} />

      <PreviewAbout startup={startup} />

      <PreviewShowcase startup={startup} />
      <PreviewPitchDeck pitchDeck={pitchDeck} />

      <PreviewTeam startup={startup} />

      <PreviewSocial startup={startup} />
    </div>
  );
};

export default StartupPreview;
