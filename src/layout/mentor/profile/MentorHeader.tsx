"use client";

import { Button } from "@/components/ui/button";

interface MentorHeaderProps {
  hasProfile: boolean;
  isSubmitting: boolean;
}

const MentorHeader = ({
  hasProfile,
  isSubmitting,
}: MentorHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Mentor Profile
        </h1>

        <p className="text-muted-foreground">
          Complete your mentor profile to help startups connect with you.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Saving..."
          : hasProfile
          ? "Update Profile"
          : "Create Profile"}
      </Button>
    </div>
  );
};

export default MentorHeader;