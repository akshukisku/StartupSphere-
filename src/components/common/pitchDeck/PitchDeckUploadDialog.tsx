"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { FormProvider, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PitchDeckUpload from "./PitchDeckUpload";

import { pitchDeckValidation } from "@/service/validation/pitchDeck.validation";

import {
  PitchDeck,
  PitchDeckForm,
  PitchDeckPayload,
} from "@/types/interface/pitchDeck.interface";

import {
  useCreatePitchDeck,
  useUpdatePitchDeck,
} from "@/hooks/pitchDecks/usePitchDeck";

interface Props {
  mode: "create" | "edit";
  pitchDeck?: PitchDeck;
  children: React.ReactNode;
}

const PitchDeckUploadDialog = ({ mode, pitchDeck, children }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createPitchDeck, isPending: creating } =
    useCreatePitchDeck();

  const { mutateAsync: updatePitchDeck, isPending: updating } =
    useUpdatePitchDeck();

  const isPending = creating || updating;

  const methods = useForm<PitchDeckForm>({
    resolver: yupResolver(pitchDeckValidation) as Resolver<PitchDeckForm>,

    defaultValues: {
      file: undefined,
    },
  });

  useEffect(() => {
    if (!open) return;

    methods.reset({
      file: undefined,
    });

    methods.clearErrors();
  }, [open, pitchDeck, methods]);

  const onSubmit = async (data: PitchDeckForm) => {
    const payload: PitchDeckPayload = {
      file: data.file,
    };

    if (mode === "create") {
      await createPitchDeck(payload);
    } else {
      await updatePitchDeck(payload);
    }

    methods.reset();

    methods.clearErrors();

    setOpen(false);
  };

  const file = methods.watch("file");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
        <DialogHeader className="space-y-2 border-b pb-5">
          <DialogTitle className="text-2xl font-bold">
            {mode === "create" ? "Upload Pitch Deck" : "Replace Pitch Deck"}
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Upload a professional PDF presentation for investors.
          </p>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            className="space-y-6 pt-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <PitchDeckUpload
              file={file ?? null}
              onUpload={(selectedFile) => {
                methods.setValue("file", selectedFile, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              onRemove={() => {
                methods.setValue("file", undefined, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            {methods.formState.errors.file && (
              <p className="text-sm text-destructive">
                {methods.formState.errors.file.message}
              </p>
            )}

            <DialogFooter className="border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending
                  ? mode === "create"
                    ? "Uploading..."
                    : "Replacing..."
                  : mode === "create"
                    ? "Upload Pitch Deck"
                    : "Replace Pitch Deck"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PitchDeckUploadDialog;
