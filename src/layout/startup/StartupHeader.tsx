"use client";

import { Button } from "@/components/ui/button";

import { Eye, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface StartupHeaderProps {
  hasStartup: boolean;
  isSubmitting: boolean;
}

const StartupHeader = ({ hasStartup, isSubmitting }: StartupHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Startup Profile Management
        </h2>

        <p className="mt-1 text-muted-foreground">
          Define your venture's digital presence for investors and partners.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/founder/startups/preview")}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>

        <Button type="submit" disabled={isSubmitting} onClick={() => console.log("Button Clicked")}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting
            ? hasStartup
              ? "Updating..."
              : "Creating..."
            : hasStartup
              ? "Update Startup"
              : "Create Startup"}
        </Button>
      </div>
    </div>
  );
};

export default StartupHeader;
