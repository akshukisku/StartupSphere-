"use client";

import { FileText } from "lucide-react";

const PitchDeckEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">
        No Pitch Deck Uploaded
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Upload a professional pitch deck in PDF format to showcase your startup
        to investors. Your presentation should explain your product, market,
        business model, traction, and future vision.
      </p>
    </div>
  );
};

export default PitchDeckEmptyState;