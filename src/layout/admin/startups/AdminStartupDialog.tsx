"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useAdminStore } from "@/store/useAdminStore";

import PreviewHero from "@/layout/startup/preview/PreviewHero";
import PreviewAbout from "@/layout/startup/preview/PreviewAbout";
import PreviewShowcase from "@/layout/startup/preview/PreviewShowcase";
import PreviewTeam from "@/layout/startup/preview/PreviewTeam";
import PreviewSocial from "@/layout/startup/preview/PreviewSocial";

const AdminStartupDialog = () => {
  const {
    startupPreviewOpen,
    selectedStartup,
    closeStartupPreview,
  } = useAdminStore();

  console.log({
  startupPreviewOpen,
  selectedStartup,
});
  if (!selectedStartup) return null;

  return (
    <Dialog
      open={startupPreviewOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeStartupPreview();
        }
      }}
    >
      <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto">
        <div className="space-y-8">
          <PreviewHero startup={selectedStartup} />
          <PreviewAbout startup={selectedStartup} />
          <PreviewShowcase startup={selectedStartup} />
          <PreviewTeam startup={selectedStartup} />
          <PreviewSocial startup={selectedStartup} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminStartupDialog;