"use client";

import { useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  file: File | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

const PitchDeckUpload = ({
  file,
  onUpload,
  onRemove,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    onUpload(selected);

    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="application/pdf"
        onChange={handleChange}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-12 transition hover:border-primary hover:bg-muted"
        >
          <UploadCloud className="mb-4 h-12 w-12 text-primary" />

          <h3 className="font-semibold">
            Upload Pitch Deck
          </h3>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Drag & drop or click to browse
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            PDF only • Max 10 MB
          </p>
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h4 className="font-medium">
                {file.name}
              </h4>

              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PitchDeckUpload;