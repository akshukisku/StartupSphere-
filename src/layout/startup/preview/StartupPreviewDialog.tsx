"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import PreviewHero from "@/layout/startup/preview/PreviewHero";
import PreviewAbout from "@/layout/startup/preview/PreviewAbout";
import PreviewShowcase from "@/layout/startup/preview/PreviewShowcase";
import PreviewTeam from "@/layout/startup/preview/PreviewTeam";
import PreviewSocial from "@/layout/startup/preview/PreviewSocial";

import { useAdminStore } from "@/store/useAdminStore";
import { useStartupPreview } from "@/hooks/admin/useAdmin";

const StartupPreviewDialog = () => {
  const { previewOpen, selectedStartupId, closeStartupPreview } =
    useAdminStore();

  const {
    data: startup,
    isPending,
    isError,
  } = useStartupPreview(selectedStartupId ?? undefined);
  console.log({
  previewOpen,
  selectedStartupId,
});

  return (
    <Dialog
      open={previewOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeStartupPreview();
        }
      }}
    >
      <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto">
        {isPending ? (
          <div className="flex h-96 items-center justify-center">
            Loading startup...
          </div>
        ) : isError || !startup ? (
          <div className="py-20 text-center">Failed to load startup.</div>
        ) : (
          <div className="space-y-8">
            <PreviewHero startup={startup} />
            <PreviewAbout startup={startup} />
            <PreviewShowcase startup={startup} />
            <PreviewTeam startup={startup} />
            <PreviewSocial startup={startup} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StartupPreviewDialog;
