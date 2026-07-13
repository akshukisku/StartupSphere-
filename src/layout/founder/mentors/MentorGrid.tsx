"use client";

import { useAvailableMentors } from "@/hooks/mentor/useMentor";

import MentorCard from "./MentorCard";

import MentorRequestDialog from "@/components/mentor/MentorRequestDialog";
import { useMentorStore } from "@/store/useMentorStore";

const MentorGrid = () => {
  const { data, isPending, isError } = useAvailableMentors();

const {
  isRequestDialogOpen,
  selectedMentor,
  closeRequestDialog,
} = useMentorStore();

  if (isPending) {
    return (
      <div className="py-20 text-center">
        Loading mentors...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-destructive">
        Failed to load mentors.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No mentors available.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
          />
        ))}
      </div>

  <MentorRequestDialog
  open={isRequestDialogOpen}
  mentor={selectedMentor}
  onOpenChange={(open) => {
    if (!open) {
      closeRequestDialog();
    }
  }}
/>
    </>
  );
};

export default MentorGrid;