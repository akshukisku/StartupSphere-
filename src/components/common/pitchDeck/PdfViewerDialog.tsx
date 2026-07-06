"use client";

import { useEffect, useState } from "react";

import { getPitchDeckSignedUrlFns } from "@/api/function/pitchDeck.function";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PitchDeck } from "@/types/interface/pitchDeck.interface";

interface Props {
  pitchDeck: PitchDeck;
  children: React.ReactNode;
}

const PdfViewerDialog = ({
  pitchDeck,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [signedUrl, setSignedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchSignedUrl = async () => {
      setLoading(true);

      const res = await getPitchDeckSignedUrlFns(
        pitchDeck.file_path
      );

      if (res.success && res.data) {
        setSignedUrl(res.data);
      }

      setLoading(false);
    };

    fetchSignedUrl();
  }, [open, pitchDeck.file_path]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="h-[90vh] max-w-6xl overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>Pitch Deck Preview</DialogTitle>
        </DialogHeader>

        <div className="h-full">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              Loading PDF...
            </div>
          ) : signedUrl ? (
            <iframe
              src={signedUrl}
              className="h-full w-full"
              title="Pitch Deck"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              Failed to load pitch deck.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerDialog;