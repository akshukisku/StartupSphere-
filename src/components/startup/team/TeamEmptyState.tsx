"use client";

import { Users } from "lucide-react";

const TeamEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        No Team Members Yet
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Showcase the people behind your startup by adding your first team
        member using the <strong>+</strong> button above.
      </p>
    </div>
  );
};

export default TeamEmptyState;