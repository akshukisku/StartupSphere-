"use client";


import {
  Download,
  Eye,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import PdfViewerDialog from "./PdfViewerDialog";
import PitchDeckUploadDialog from "./PitchDeckUploadDialog";

import { PitchDeck } from "@/types/interface/pitchDeck.interface";
import { useDeletePitchDeck } from "@/hooks/pitchDecks/usePitchDeck";
import { downloadPitchDeck } from "@/lib/global.helper";

interface Props {
  pitchDeck: PitchDeck;
}

const PitchDeckItem = ({ pitchDeck }: Props) => {
  const { mutateAsync: deletePitchDeck, isPending } = useDeletePitchDeck();

  const handleDelete = async () => {
    await deletePitchDeck(pitchDeck);
  };
  const handleDownload = async () => {
    try {
      await downloadPitchDeck(pitchDeck.file_path, pitchDeck.file_name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}
        <div className="flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold">{pitchDeck.file_name}</h3>

            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>{(pitchDeck.file_size / 1024 / 1024).toFixed(2)} MB</span>

              <span>
                Uploaded {new Date(pitchDeck.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-2">
          <PdfViewerDialog pitchDeck={pitchDeck}>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </PdfViewerDialog>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <PitchDeckUploadDialog mode="edit">
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Replace
            </Button>
          </PitchDeckUploadDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Pitch Deck?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. Your uploaded pitch deck will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                  {isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckItem;
