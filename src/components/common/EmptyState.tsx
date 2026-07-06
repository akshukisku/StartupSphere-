"use client";

import DashboardCard from "@/components/common/DashboardCard";
import SectionHeader from "@/components/common/SectionHeader";
import UploadArea from "@/components/common/UploadArea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, X } from "lucide-react";

const StartupShowcase = () => {
  return (
    <DashboardCard contentClassName="space-y-8">
      <SectionHeader
        title="Product Showcase"
        description="Showcase screenshots of your product."
        action={
          <Button
            size="sm"
            className="h-10 rounded-xl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Media
          </Button>
        }
      />

      {/* Upload Area */}

      <UploadArea
        title="Drag & Drop Images"
        description="PNG, JPG or WEBP • Max 5MB"
        buttonText="Browse Files"
      />

      {/* Preview Grid */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="group relative aspect-video overflow-hidden rounded-2xl border bg-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-full items-center justify-center">
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
            </div>

            <button
              type="button"
              className="absolute right-3 top-3 flex h-8 w-8 scale-0 items-center justify-center rounded-full bg-background shadow transition-all duration-200 group-hover:scale-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default StartupShowcase;