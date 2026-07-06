"use client";

import { Download, FileText, Eye } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Button } from "@/components/ui/button";



import { PitchDeck } from "@/types/interface/pitchDeck.interface";
import { downloadPitchDeck } from "@/lib/global.helper";
import PdfViewerDialog from "@/components/common/pitchDeck/PdfViewerDialog";



interface Props {
  pitchDeck: PitchDeck | null;
}

const PreviewPitchDeck = ({
  pitchDeck,
}: Props) => {
  const handleDownload = async () => {
    if (!pitchDeck) return;

    try {
      await downloadPitchDeck(
        pitchDeck.file_path,
        pitchDeck.file_name
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            Pitch Deck
          </h2>

          <p className="text-muted-foreground">
            Investor presentation prepared by the
            startup.
          </p>
        </div>

        {!pitchDeck ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">
              No Pitch Deck
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              This startup hasn't uploaded a pitch
              deck yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 rounded-2xl border p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {pitchDeck.file_name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {(pitchDeck.file_size / 1024 / 1024).toFixed(2)}{" "}
                  MB
                </p>

                <p className="text-xs text-muted-foreground">
                  Uploaded{" "}
                  {new Date(
                    pitchDeck.created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <PdfViewerDialog pitchDeck={pitchDeck}>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </PdfViewerDialog>

              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default PreviewPitchDeck;