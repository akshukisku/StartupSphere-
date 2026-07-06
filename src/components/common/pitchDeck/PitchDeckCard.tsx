"use client";

import { FileUp, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/common/DashboardCard";
import SectionHeader from "@/components/common/SectionHeader";
import { usePitchDeck } from "@/hooks/pitchDecks/usePitchDeck";
import PitchDeckEmptyState from "./PitchDeckEmpty";
import PitchDeckUploadDialog from "./PitchDeckUploadDialog";
import PitchDeckItem from "./PitchDeckItem";
import PitchDeckSkeleton from "./PitchDeckSkeleton";



const PitchDeckCard = () => {
  const { data: pitchDeck, isPending } = usePitchDeck();

if (isPending) {
    return <PitchDeckSkeleton />;
}

  return (
    <DashboardCard contentClassName="space-y-8">
      <SectionHeader
        title="Pitch Deck"
        description="Upload your startup pitch deck for investors."
        action={
          <PitchDeckUploadDialog
            mode={pitchDeck ? "edit" : "create"}
            pitchDeck={pitchDeck}
          >
            <Button
              size="sm"
              className="rounded-xl"
            >
              {pitchDeck ? (
                <>
                  <FileUp className="mr-2 h-4 w-4" />
                  Replace PDF
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload PDF
                </>
              )}
            </Button>
          </PitchDeckUploadDialog>
        }
      />

      {pitchDeck ? (
        <PitchDeckItem pitchDeck={pitchDeck} />
      ) : (
        <PitchDeckEmptyState />
      )}
    </DashboardCard>
  );
};

export default PitchDeckCard;