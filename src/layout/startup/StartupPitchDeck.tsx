"use client";

import PitchDeckEmpty from "@/components/common/pitchDeck/PitchDeckEmpty";
import PitchDeckCard from "@/components/common/pitchDeck/PitchDeckCard";
import { usePitchDeck } from "@/hooks/pitchDecks/usePitchDeck";
import { useStartup } from "@/hooks/startup/useStartup";

const StartupPitchDeck = () => {
  const { data: startupResponse, isPending: startupLoading } = useStartup();

  const startup = startupResponse?.data;

  const startupId = startup?.id ?? "";

  const { data: pitchDeckResponse, isPending: pitchDeckLoading } =
    usePitchDeck();

  if (startupLoading || pitchDeckLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {pitchDeckResponse?.data ? (
        <PitchDeckCard  />
      ) : (
        <PitchDeckEmpty  />
      )}
    </>
  );
};

export default StartupPitchDeck;
