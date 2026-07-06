"use client";

import { BellRing } from "lucide-react";

const EmptyNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BellRing className="mb-4 h-12 w-12 text-muted-foreground" />

      <h4 className="text-lg font-semibold">
        No Notifications
      </h4>

      <p className="mt-2 text-sm text-muted-foreground">
        You're all caught up.
      </p>
    </div>
  );
};

export default EmptyNotification;