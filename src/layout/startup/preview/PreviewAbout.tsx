"use client";

import { FileText } from "lucide-react";

import { StartupPreviewProps } from "@/types/interface/preview.interface";
import PreviewSection from "../PreviewSection";

const PreviewAbout = ({ startup }: StartupPreviewProps) => {
  return (
    <PreviewSection
      title="About Startup"
      description="Learn more about the startup and its mission."
    >
      {startup.description ? (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="leading-8 text-muted-foreground whitespace-pre-line">
            {startup.description}
          </p>
        </div>
      ) : (
        <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed">
          <FileText className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">
            No description available
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            The founder hasn't added a startup description yet.
          </p>
        </div>
      )}
    </PreviewSection>
  );
};

export default PreviewAbout;